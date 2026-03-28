import HeroSection from '@/components/home/HeroSection';
import BrandsStrip from '@/components/home/BrandsStrip';
import FeaturedSpotlight from '@/components/home/FeaturedSpotlight';
import CategoryRow from '@/components/home/CategoryRow';
import TrendingProducts from '@/components/home/TrendingProducts';
import NewArrivalsGrid from '@/components/home/NewArrivalsGrid';
import DealsBanner from '@/components/home/DealsBanner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ReviewCarousel from '@/components/home/ReviewCarousel';
import HowItWorks from '@/components/home/HowItWorks';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsStrip />
      <FeaturedSpotlight />
      <CategoryRow />
      <TrendingProducts />
      <NewArrivalsGrid />
      <DealsBanner />
      <WhyChooseUs />
      <ReviewCarousel />
      <HowItWorks />
      <NewsletterSignup />
    </>
  );
}
