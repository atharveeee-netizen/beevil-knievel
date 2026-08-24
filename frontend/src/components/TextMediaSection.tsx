import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TextMediaBlockProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean; // If true, media on left, text on right
}

export function TextMediaBlock({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  isReversed = false,
}: TextMediaBlockProps) {
  return (
    <div
      className={`flex flex-col ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-stretch gap-6 w-full`}
    >
      {/* Text Card */}
      <div className="bg-white rounded-2xl md:rounded-[24px] p-6 sm:p-8 md:p-10 lg:p-12 lg:pb-16 flex flex-col justify-between items-start gap-6 lg:w-[450px] flex-shrink-0 shadow-sm">
        <div className="space-y-3">
          <h3 className="text-[26px] sm:text-[30px] md:text-[32px] font-normal text-black leading-tight">
            {title}
          </h3>
          <p className="text-[16px] sm:text-[18px] font-light text-[#363636] leading-relaxed">
            {subtitle}
          </p>
        </div>

        <Link
          href={buttonLink}
          target={buttonLink.startsWith("http") ? "_blank" : "_self"}
          className="btn-beewise-main w-full sm:w-auto"
        >
          {buttonText}
        </Link>
      </div>

      {/* Media Card */}
      <div className="relative flex-1 min-h-[240px] sm:min-h-[300px] lg:min-h-[380px] rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-2xl md:rounded-[24px]"
        />
      </div>
    </div>
  );
}

export default function TextMediaSection() {
  return (
    <section className="w-full bg-[#EDECEC] py-12 md:py-16">
      <div className="beewise-container space-y-6 md:space-y-8">
        {/* Growers */}
        <TextMediaBlock
          title="Growers"
          subtitle="Get guaranteed quality, competitive pricing, and peace of mind."
          buttonText="Learn more"
          buttonLink="https://beewise.ag/growers"
          imageSrc="/images/beewise/grower-tractor.webp"
          imageAlt="Almond grower on tractor"
        />

        {/* Beekeepers */}
        <TextMediaBlock
          title="Beekeepers"
          subtitle="Experience an AI and robotics enabled hive for simplified workflows and better returns."
          buttonText="Learn more"
          buttonLink="https://beewise.ag/beekeepers"
          imageSrc="/images/beewise/beekeepers-beehome.webp"
          imageAlt="Beekeepers with open BeeHome"
          isReversed
        />

        {/* Bees for Buildings */}
        <TextMediaBlock
          title="Bees for Buildings"
          subtitle="Bring measurable engagement and nature impact to your campus or property."
          buttonText="Learn more"
          buttonLink="https://beesforbuildings.com/"
          imageSrc="/images/beewise/bees-for-buildings.png"
          imageAlt="Bees for Buildings smart hive installation"
        />
      </div>
    </section>
  );
}
