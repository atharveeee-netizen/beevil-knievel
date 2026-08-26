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
        {/* Commercial Orchard Growers */}
        <TextMediaBlock
          title="Commercial Growers"
          subtitle="Verify true pollination density and frame coverage without interrupting foraging flights or breaking propolis seals."
          buttonText="Learn more"
          buttonLink="https://github.com/atharveeee-netizen/beevil-knievel"
          imageSrc="/images/beewise/grower-tractor.webp"
          imageAlt="Commercial orchard grower"
        />

        {/* Commercial Beekeepers */}
        <TextMediaBlock
          title="Commercial Apiaries"
          subtitle="Eliminate lifting 40kg brood boxes in 38°C heat with automated 285 Hz queenless detection and 72-hour pre-swarm warnings."
          buttonText="Explore technology"
          buttonLink="/app"
          imageSrc="/images/beewise/beekeepers-beehome.webp"
          imageAlt="Beekeepers inspecting apiary"
          isReversed
        />

        {/* Research & Conservation */}
        <TextMediaBlock
          title="Research &amp; Biosecurity"
          subtitle="Continuous 16-channel NIST-calibrated physical telemetry and cryptographic provenance for entomology research."
          buttonText="View dataset"
          buttonLink="https://github.com/atharveeee-netizen/beevil-knievel"
          imageSrc="/images/beewise/bees-for-buildings.png"
          imageAlt="Apiary research telemetry station"
        />
      </div>
    </section>
  );
}
