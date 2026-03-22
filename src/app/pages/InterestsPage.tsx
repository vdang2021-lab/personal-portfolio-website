import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import books1Upright from '../../assets/interests/books-1-upright.jpeg';
import family1 from '../../assets/interests/family-1.jpeg';
import family2 from '../../assets/interests/family-2.jpeg';
import food1 from '../../assets/interests/food-1.jpeg';
import food2 from '../../assets/interests/food-2.jpeg';
import friends1 from '../../assets/interests/friends-1.JPG';
import friends2 from '../../assets/interests/friends-2.jpeg';
import friends3 from '../../assets/interests/friends-3.jpeg';
import gym1 from '../../assets/interests/gym-1.JPG';
import gym2 from '../../assets/interests/gym-2.jpeg';
import travelLisbon from '../../assets/interests/travel-lisbon.jpeg';
import travelSpain from '../../assets/interests/travel-spain.jpeg';
import travelVietnam1 from '../../assets/interests/travel-vietnam-1.JPG';
import travelVietnam2 from '../../assets/interests/travel-vietnam-2.JPG';

type MomentImage = {
  alt: string;
  src?: string;
  caption?: string;
};

type PhotoCardProps = {
  caption: string;
  images: MomentImage[];
  label?: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
};

const watchingNow = [
  'Naruto',
  'Hunter x Hunter',
  'Attack on Titan',
  'Death Note',
  'Orb: On the Movements of Earth',
];

function PhotoCard({
  caption,
  images,
  label,
  className = '',
  frameClassName = 'aspect-[16/10]',
  imageClassName = 'object-cover',
  contentClassName = 'space-y-3',
}: PhotoCardProps) {
  const normalizedImages = useMemo(
    () => images.filter((image) => Boolean(image.src) || Boolean(image.caption)),
    [images],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [loadedIndexes, setLoadedIndexes] = useState<Record<number, boolean>>({});
  const [failedIndexes, setFailedIndexes] = useState<Record<number, boolean>>({});
  const availableIndexes = normalizedImages
    .map((_, index) => index)
    .filter((index) => !failedIndexes[index]);
  const fallbackIndex = availableIndexes[0] ?? 0;
  const safeActiveIndex = availableIndexes.includes(activeIndex) ? activeIndex : fallbackIndex;
  const visibleImage = normalizedImages[safeActiveIndex];
  const hasMultipleImages = availableIndexes.length > 1;

  useEffect(() => {
    setActiveIndex(0);
    setLoadedIndexes({});
    setFailedIndexes({});
  }, [normalizedImages]);

  useEffect(() => {
    for (const image of normalizedImages) {
      if (!image.src) continue;
      const preloadImage = new Image();
      preloadImage.src = image.src;
      if ('decoding' in preloadImage) {
        preloadImage.decoding = 'async';
      }
    }
  }, [normalizedImages]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const currentPosition = availableIndexes.indexOf(currentIndex);
        const nextPosition =
          currentPosition >= 0 ? (currentPosition + 1) % availableIndexes.length : 0;
        return availableIndexes[nextPosition] ?? fallbackIndex;
      });
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [availableIndexes, fallbackIndex, hasMultipleImages, isPaused]);

  useEffect(() => {
    if (!availableIndexes.includes(activeIndex)) {
      setActiveIndex(fallbackIndex);
    }
  }, [activeIndex, availableIndexes, fallbackIndex]);

  return (
    <motion.article
      className={`group rounded-3xl border border-border/60 bg-card/35 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className={contentClassName}>
        {label ? (
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        ) : null}

        <div
          className={`${frameClassName} relative overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(30,37,53,0.34),rgba(18,24,36,0.86))]`}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              loadedIndexes[safeActiveIndex] ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          >
            <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.03),rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" />
          </div>

          {normalizedImages.map((image, index) => (
            <div
              key={`${caption}-${index}-${image.alt}`}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === safeActiveIndex ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={index === safeActiveIndex ? undefined : true}
            >
              {image.src && !failedIndexes[index] ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  onLoad={() =>
                    setLoadedIndexes((current) => ({
                      ...current,
                      [index]: true,
                    }))
                  }
                  onError={() =>
                    setFailedIndexes((current) => ({
                      ...current,
                      [index]: true,
                    }))
                  }
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-[1.03] ${imageClassName}`}
                />
              ) : (
                <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(30,37,53,0.45),rgba(18,24,36,0.96))] p-5">
                  <span className="text-sm text-foreground/82">{image.caption ?? caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">{caption}</p>
      </div>
    </motion.article>
  );
}

function WatchingCard() {
  return (
    <motion.article
      className="rounded-3xl border border-border/60 bg-card/35 p-4 shadow-[0_18px_44px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex h-full min-h-[248px] flex-col justify-between gap-5 rounded-[24px] bg-[linear-gradient(180deg,rgba(22,28,40,0.92),rgba(14,19,29,0.98))] px-5 py-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">My Favorite Anime</p>
        </div>

        <ul className="space-y-3 text-sm text-foreground/86">
          {watchingNow.map((item) => (
            <li key={item} className="border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function PodcastCard() {
  return (
    <motion.article
      className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,17,26,0.98),rgba(24,31,45,0.92),rgba(10,62,82,0.82))] p-4 shadow-[0_22px_58px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex h-full flex-col gap-4 rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))] px-5 py-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/56">Current Favorite Podcast</p>
          <h2 className="text-2xl font-semibold tracking-tight">Huberman Lab Podcast</h2>
        </div>
      </div>
    </motion.article>
  );
}

export default function InterestsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-10 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          <motion.div
            className="max-w-3xl space-y-5 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Interests</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              A quieter page for the things that matter outside of work.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A quick snapshot of the moments, people, and places that stick with me.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
            <PhotoCard
              className="xl:col-span-2"
              caption="Being with family"
              images={[
                { alt: 'Family moment', src: family1 },
                { alt: 'Family photo together', src: family2 },
              ]}
            />

            <PhotoCard
              className="xl:col-span-2"
              caption="Hanging with friends"
              images={[
                { alt: 'Time with friends outdoors', src: friends1 },
                { alt: 'Friends hanging out', src: friends2 },
                { alt: 'Friends candid moment', src: friends3 },
              ]}
            />

            <PhotoCard
              className="xl:col-span-2"
              caption="Working out"
              images={[
                { alt: 'Gym routine photo', src: gym1 },
                { alt: 'Health and activity moment', src: gym2 },
              ]}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-6">
            <PhotoCard
              caption="Memorable trips"
              className="xl:col-span-4"
              frameClassName="aspect-[16/7.3]"
              images={[
                { alt: 'Travel in Lisbon', src: travelLisbon },
                { alt: 'Travel in Spain', src: travelSpain },
                { alt: 'Travel in Vietnam', src: travelVietnam1 },
                { alt: 'Travel in Vietnam city scene', src: travelVietnam2 },
              ]}
            />

            <div className="flex flex-col gap-5 xl:col-span-2 xl:self-start">
              <PhotoCard
                caption="Trying new places"
                images={[
                  { alt: 'Food spot photo', src: food1 },
                  { alt: 'Trying a new food spot', src: food2 },
                ]}
                frameClassName="aspect-[16/9]"
                imageClassName="object-cover object-center"
              />

              <PodcastCard />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
            <PhotoCard
              className="xl:col-span-2"
              caption="Books I’ve read"
              images={[
                { alt: 'Books and reading setup upright', src: books1Upright },
              ]}
              frameClassName="aspect-[5/6]"
              imageClassName="object-cover object-center"
            />

            <div className="xl:col-span-4">
              <WatchingCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
