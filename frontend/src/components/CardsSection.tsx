import React from "react";
import Image from "next/image";

interface ChallengeCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

function ChallengeCard({ imageSrc, title, subtitle }: ChallengeCardProps) {
  return (
    <div className="relative w-full md:w-[calc(33.333%-16px)] h-[360px] sm:h-[420px] md:h-[446px] rounded-[24px] overflow-hidden bg-[#EDECEC] group">
      {/* Background Image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover rounded-[24px] transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top-Left Cutout Header Overlay */}
      <div className="absolute top-0 left-0 bg-[#EDECEC] pr-8 pl-6 pt-5 pb-5 rounded-br-[24px] max-w-[85%] sm:max-w-[78%] z-10 cutout-corner-top-right cutout-corner-bottom-left">
        <h3 className="text-[26px] sm:text-[30px] md:text-[32px] font-normal text-black leading-tight mb-1">
          {title}
        </h3>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] font-light text-[#363636] leading-snug">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default function CardsSection() {
  const challenges = [
    {
      title: "Distance",
      subtitle: "Hives are hundreds of miles apart",
      imageSrc: "/images/beewise/card-distance.webp",
    },
    {
      title: "Timing",
      subtitle: "Bees often receive visits too late",
      imageSrc: "/images/beewise/card-timing.webp",
    },
    {
      title: "Expertise",
      subtitle: "Skilled help is scarce",
      imageSrc: "/images/beewise/card-expertise.webp",
    },
  ];

  return (
    <section className="w-full bg-[#EDECEC] py-16 md:py-24">
      <div className="beewise-container">
        <h2 className="text-[30px] sm:text-[38px] md:text-[50px] font-normal text-black text-center leading-[1.2] max-w-[1100px] mx-auto mb-10 md:mb-16">
          These are the major challenges preventing beekeepers from providing bees the best care:
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-6">
          {challenges.map((card) => (
            <ChallengeCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              imageSrc={card.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
