import HeroSection from '@/components/home/HeroSection';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import CategoryRow from '@/components/home/CategoryRow';
import TrendingProducts from '@/components/home/TrendingProducts';
import DealsBanner from '@/components/home/DealsBanner';
import ReviewCarousel from '@/components/home/ReviewCarousel';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSpotlight />
      <CategoryRow />
      <TrendingProducts />
      <DealsBanner />
      <ReviewCarousel />
      <NewsletterSignup />
    </>
  );
}
