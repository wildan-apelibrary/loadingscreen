import React, { useState, useEffect } from "react";
import {
  Book,
  RotateCcw,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const LoadingDots = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 700); // Changes every 500ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className={`transition-all duration-200 ease-in-out transform
            ${
              activeDot === dot
                ? "w-3 h-3 bg-white scale-100"
                : "w-3 h-3 bg-white/50 scale-75"
            }`}
          style={{
            borderRadius: "50%",
            transform: activeDot === dot ? "translateY(-4px)" : "translateY(0)",
          }}
        />
      ))}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-indigo-600 flex flex-col items-center justify-center z-50">
    <div className="text-white text-center max-w-md px-4">
      <div className="mb-8">
        <img
          src="logo.png"
          alt="AP Logo"
          className="w-32 h-32 mx-auto mb-4 animate-bounce"
        />
        <h2 className="text-3xl font-bold mb-2">AP E-Library</h2>
        <div className="h-1 w-24 bg-white mx-auto rounded-full mb-4"></div>
        <p className="text-indigo-100 text-lg mb-6">
          Sistem Manajemen Perpustakaan Digital Modern untuk Pengalaman Membaca
          yang Lebih Baik
        </p>
        <LoadingDots />
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-indigo-200 text-sm">
          Developed by Wildan Darma Setiawan © 2024.
        </p>
      </div>
    </div>
  </div>
);

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const slides = [
    {
      image: "g1.jpg",
      title: "Modern Library Experience",
      description: "Nikmati pengalaman perpustakaan modern yang nyaman",
    },
    {
      image: "g2.jpg",
      title: "Easy Book Management",
      description: "Kelola koleksi buku dengan mudah dan efisien",
    },
    {
      image: "g3.jpg",
      title: "Digital Innovation",
      description: "Inovasi digital untuk perpustakaan masa depan",
    },
  ];

  useEffect(() => {
    let timer;
    if (isAutoPlaying && !isHovering) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovering, currentSlide]);

  const handleMouseHover = (isHovered) => {
    setIsHovering(isHovered);
    setIsAutoPlaying(!isHovered);
  };

  const handleSlideChange = (direction) => {
    setIsAutoPlaying(false);
    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl shadow-xl group"
      onMouseEnter={() => handleMouseHover(true)}
      onMouseLeave={() => handleMouseHover(false)}
    >
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              currentSlide === index
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-105"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-4 sm:p-6 text-white/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-medium mb-1">
                  {slide.title}
                </h3>
                <p className="text-sm sm:text-base text-white/80">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSlideChange("prev")}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => handleSlideChange("next")}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-8 bg-white"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LibraryHeroSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const visibilityTimer = setTimeout(() => {
        setIsVisible(true);
      }, 100);

      return () => clearTimeout(visibilityTimer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-4 overflow-hidden">
      <div
        className={`max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center mb-6">
              <img src="logo.png" alt="AP Logo" className="w-20 h-20 mr-3" />
              <h2 className="text-2xl font-bold text-indigo-600">
                AP E-Library
              </h2>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              Perpustakaan Digital Modern
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Kelola perpustakaan Anda dengan mudah dan efisien.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: Book,
                  color: "text-blue-500",
                  text: "Pinjam buku dengan satu klik",
                },
                {
                  icon: RotateCcw,
                  color: "text-green-500",
                  text: "Kembalikan buku tanpa antri",
                },
                {
                  icon: MapPin,
                  color: "text-purple-500",
                  text: "Lacak lokasi buku di rak perpustakaan",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 transform transition-all duration-500 ease-out ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`p-2 rounded-full ${item.color} bg-opacity-20`}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-gray-700 text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <button
              className="mt-10 bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              onClick={() =>
                (window.location.href = "http://bit.ly/apelibrary")
              }
            >
              Mulai Jelajahi
            </button>
          </div>
          <div className="lg:w-1/2 bg-white flex items-center justify-center p-8 lg:p-12">
            <div
              className={`relative w-full h-96 transform transition-all duration-1000 ease-out ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryHeroSection;
