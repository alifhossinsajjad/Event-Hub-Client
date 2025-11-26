
'use client';
import Link from 'next/link';

const CategoriesShowcase = () => {
  const categories = [
    {
      name: "Technology",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
        </svg>
      ),
      events: "120+ Events",
      color: "bg-blue-50 border-blue-200 text-blue-600",
      hoverColor: "hover:bg-blue-500",
      description: "Tech conferences & workshops"
    },
    {
      name: "Music",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
        </svg>
      ),
      events: "85+ Events",
      color: "bg-purple-50 border-purple-200 text-purple-600",
      hoverColor: "hover:bg-purple-500",
      description: "Concerts & festivals"
    },
    {
      name: "Business",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      events: "90+ Events",
      color: "bg-green-50 border-green-200 text-green-600",
      hoverColor: "hover:bg-green-500",
      description: "Networking & conferences"
    },
    {
      name: "Sports",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      ),
      events: "65+ Events",
      color: "bg-red-50 border-red-200 text-red-600",
      hoverColor: "hover:bg-red-500",
      description: "Tournaments & matches"
    },
    {
      name: "Arts",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      ),
      events: "45+ Events",
      color: "bg-pink-50 border-pink-200 text-pink-600",
      hoverColor: "hover:bg-pink-500",
      description: "Exhibitions & workshops"
    },
    {
      name: "Food",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
        </svg>
      ),
      events: "55+ Events",
      color: "bg-orange-50 border-orange-200 text-orange-600",
      hoverColor: "hover:bg-orange-500",
      description: "Food festivals & classes"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore by <span className="text-blue-600">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover events that match your interests and passions across diverse categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/all-events?category=${category.name}`}
              className="group block"
            >
              <div className={`relative bg-white p-6 rounded-2xl border-2 ${category.color} transition-all duration-300 group-hover:shadow-2xl group-hover:border-transparent h-full flex flex-col`}>
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${category.color} mb-5 group-hover:bg-white group-hover:scale-110 transition-all duration-300`}>
                  <div className="group-hover:text-white transition-colors duration-300">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 group-hover:text-blue-50 transition-colors duration-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Events Count */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-100 transition-colors duration-300">
                    {category.events}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.hoverColor} opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/all-events"
            className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Explore All Categories
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;