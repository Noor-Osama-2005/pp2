import { Hero } from '../components/Hero';
import { LatestIssue } from '../components/LatestIssue';
import { FeaturedStories } from '../components/FeaturedStories';

export function Home() {
  return (
    <div>
      <Hero />
      <LatestIssue />
      <FeaturedStories />
    </div>
  );
}
