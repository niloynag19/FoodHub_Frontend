import { Global_Image } from "@/lib/defaultImage";
import { HeroSection } from "../homepage/HeroSection";
import { StatsSection } from "../homepage/StatsSection";
import { HowItWorks } from "../homepage/HowItWorks";
import { CategoriesSection } from "../homepage/CategoriesSection";
import { FeaturesSection } from "../homepage/FeaturesSection";
import { TestimonialsSection } from "../homepage/TestimonialsSection";
import { MobileAppCTA } from "../homepage/MobileAppCTA";
import { FinalCTA } from "../homepage/FinalCTA";
import { TopRatedSection } from "../homepage/TopRatedSection";
import { getAllReviewsAction } from "@/actions/review.action";
import { ScrollToTop } from "./ScrollToTop";

export default async function HomePage() {
  const displayImage = Global_Image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop";
  const { data: reviews } = await getAllReviewsAction();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950 transition-colors duration-300">
      <HeroSection displayImage={displayImage} />
      <StatsSection />
      <CategoriesSection />
      <TopRatedSection />
      <HowItWorks />
      <FeaturesSection />
      <TestimonialsSection initialReviews={reviews} />
      <MobileAppCTA displayImage={displayImage} />
      <FinalCTA />
      <ScrollToTop />
    </div>
  );
}