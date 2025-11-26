
import CategoriesShowcase from "@/components/Home/CategoriesShowcase";
import FeaturesSection from "@/components/Home/Feature";
import HeroSection from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import PopularEvents from "@/components/Home/PopularEvents";
import Testimonials from "@/components/Home/Testimonials";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <HeroSection />
      </section>

      {/* category */}

      <section>
        <CategoriesShowcase/>
      </section>

      {/* how to works */}

      <section>
        <HowItWorks />
      </section>

      {/* popular section */}

      <section>
        <PopularEvents />
      </section>

      {/* testimonials */}

      <section>
        <Testimonials />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <FeaturesSection />
      </section>

      {/* More sections can be added here */}
    </div>
  );
}
