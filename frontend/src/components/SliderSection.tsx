"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface AwardItem {
  name: string;
  imageSrc: string;
}

const awards: AwardItem[] = [
  { name: "Disruptor 50", imageSrc: "/images/beewise/award-disruptor50.webp" },
  { name: "Seal Award Winner 2024", imageSrc: "/images/beewise/award-seal2024.webp" },
  { name: "World Ag Top 10 Winner 2023", imageSrc: "/images/beewise/award-worldag.webp" },
  { name: "European Commission Seal of Excellence", imageSrc: "/images/beewise/award-eu-excellence.webp" },
  { name: "Fast Company", imageSrc: "/images/beewise/award-fastco.webp" },
  { name: "TIME Best Inventions", imageSrc: "/images/beewise/award-image40.webp" },
  { name: "Green Apple Environment Awards", imageSrc: "/images/beewise/award-greenapple.png" },
  { name: "Inc. Best in Business 2024", imageSrc: "/images/beewise/award-inc.png" },
  { name: "Bloomberg", imageSrc: "/images/beewise/award-bloomberg.png" },
  { name: "RBR50 Robotics", imageSrc: "/images/beewise/award-rbr50.png" },
];

export default function SliderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(5);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsVisible(2);
      } else if (window.innerWidth < 1024) {
        setItemsVisible(3);
      } else {
        setItemsVisible(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, awards.length - itemsVisible);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [maxIndex]);

  return (
    <section className="w-full bg-[#EDECEC] py-16 md:py-24 overflow-hidden">
      <div className="beewise-container">
        <h2 className="text-[32px] sm:text-[40px] md:text-[50px] font-normal text-black text-center leading-[1.2] mb-10 md:mb-14">
          What others are saying about us
        </h2>

        {/* Carousel Container with Sinusoidal Wave Background */}
        <div className="relative slider-wave-bg py-8 sm:py-12 md:py-16">
          <div className="overflow-hidden max-w-[1360px] mx-auto px-4">
            <div
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
              }}
            >
              {awards.map((award, index) => (
                <div
                  key={`${award.name}-${index}`}
                  className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)] flex items-center justify-center"
                >
                  {/* Hexagonal Award Card */}
                  <div className="hexagon-slide w-[180px] sm:w-[200px] md:w-[215px] h-[210px] sm:h-[230px] md:h-[244px] flex items-center justify-center p-6 drop-shadow-sm hover:scale-105 transition-transform duration-300">
                    <div className="relative w-[110px] sm:w-[130px] h-[110px] sm:h-[130px]">
                      <Image
                        src={award.imageSrc}
                        alt={award.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              aria-label="Previous Award"
              className="w-10 h-10 rounded-full border-2 border-[#4E4540] flex items-center justify-center hover:bg-[#4E4540] hover:text-white text-[#4E4540] transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Award"
              className="w-10 h-10 rounded-full border-2 border-[#4E4540] flex items-center justify-center hover:bg-[#4E4540] hover:text-white text-[#4E4540] transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
