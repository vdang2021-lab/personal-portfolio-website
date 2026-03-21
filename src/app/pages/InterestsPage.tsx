import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import books1 from '../../assets/interests/books-1.jpeg';
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

function MomentTile({
  caption,
  images,
  eyebrow,
  frameClassName,
}: {
  caption: string;
  images: MomentImage[];
  eyebrow?: string;
  frameClassName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    for (const image of images) {
      if (!image.src) continue;
      const preloadImage = new Image();
      preloadImage.src = image.src;
    }
  }, [images]);

  useEffect(() => {
    if (!hasMultipleImages || isPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleImages, images.length, isPaused]);

  return (
    <div
      className="space-y-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>
      ) : null}

      <div
        className={`${frameClassName} relative overflow-hidden rounded-3xl shadow-[0_18px_44px_rgba(0,0,0,0.16)] transition duration-500 hover:scale-[1.01] hover:brightness-[1.03]`}
      >
        {images.map((image, index) => (
          <div
            key={`${caption}-${index}-${image.alt}`}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index === activeIndex ? undefined : true}
          >
            {image.src ? (
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-end bg-[linear-gradient(180deg,rgba(30,37,53,0.35),rgba(18,24,36,0.92))] p-5">
                <span className="text-sm text-foreground/82">{image.caption ?? caption}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>
    </div>
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

          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.04 }}
              >
                <MomentTile
                  caption="Family time"
                  images={[
                    { alt: 'Family moment', src: family1, caption: 'Family time' },
                    { alt: 'Family photo together', src: family2, caption: 'Family time' },
                  ]}
                  eyebrow="Core part of life"
                  frameClassName="aspect-[4/5]"
                />
              </motion.figure>

              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.08 }}
              >
                <MomentTile
                  caption="Time with friends"
                  images={[
                    { alt: 'Time with friends outdoors', src: friends1, caption: 'Time with friends' },
                    { alt: 'Friends hanging out', src: friends2, caption: 'Time with friends' },
                    { alt: 'Friends candid moment', src: friends3, caption: 'Time with friends' },
                  ]}
                  frameClassName="aspect-[5/6]"
                />
              </motion.figure>
            </div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <MomentTile
                caption="Vietnam, Spain, Lisbon"
                images={[
                  { alt: 'Travel in Spain', src: travelSpain, caption: 'Vietnam, Spain, Lisbon' },
                  { alt: 'Travel in Lisbon', src: travelLisbon, caption: 'Vietnam, Spain, Lisbon' },
                  { alt: 'Travel in Vietnam', src: travelVietnam1, caption: 'Vietnam, Spain, Lisbon' },
                  { alt: 'Travel in Vietnam city scene', src: travelVietnam2, caption: 'Vietnam, Spain, Lisbon' },
                ]}
                eyebrow="Trips that stick"
                frameClassName="aspect-[16/8]"
              />
            </motion.figure>

            <div className="grid gap-5 md:grid-cols-12">
              <motion.figure
                className="md:col-span-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.12 }}
              >
                <MomentTile
                  caption="Gym / health"
                  images={[
                    { alt: 'Gym routine photo', src: gym1, caption: 'Gym / health' },
                    { alt: 'Health and activity moment', src: gym2, caption: 'Gym / health' },
                  ]}
                  frameClassName="aspect-[4/5]"
                />
              </motion.figure>

              <motion.figure
                className="md:col-span-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.16 }}
              >
                <MomentTile
                  caption="Trying new spots"
                  images={[
                    { alt: 'Food spot photo', src: food1, caption: 'Trying new spots' },
                    { alt: 'Trying a new food spot', src: food2, caption: 'Trying new spots' },
                  ]}
                  frameClassName="aspect-[7/5]"
                />
              </motion.figure>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <motion.figure
                className="md:w-[42%]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.18 }}
              >
                <MomentTile
                  caption="Books + deep dives"
                  images={[
                    { alt: 'Books and reading setup', src: books1, caption: 'Books + deep dives' },
                  ]}
                  frameClassName="aspect-[4/5]"
                />
              </motion.figure>

              <motion.figure
                className="md:w-[58%] md:pt-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.22 }}
              >
                <MomentTile
                  caption="Animes I'm watching"
                  images={[
                    { alt: 'Anime or gaming photo placeholder', caption: "Animes I'm watching" },
                    { alt: 'Screen setup placeholder', caption: "Animes I'm watching" },
                  ]}
                  frameClassName="aspect-[7/5]"
                />
              </motion.figure>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
