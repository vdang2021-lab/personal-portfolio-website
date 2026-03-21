import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { WorkedWith } from '../components/WorkedWith';
import { ExploreSections } from '../components/ExploreSections';
import { GetInTouch } from '../components/GetInTouch';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <WorkedWith />
        <ExploreSections />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
}
