import Image from "next/image";
import bgImg from "../../assets/event1.avif";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative text-white py-20 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImg}
          alt="Event background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover & Create
            <span className="block text-yellow-300">Unforgettable Events</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of event enthusiasts. From tech conferences to music
            festivals, find your next great experience or host your own
            spectacular event.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/all-events"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore Events
            </Link>
            <Link
              href="/add-events"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300"
            >
              Host Event
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">500+</div>
              <div className="text-blue-100">Events Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">10K+</div>
              <div className="text-blue-100">Happy Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
