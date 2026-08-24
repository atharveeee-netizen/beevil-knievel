import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BannerCtaSection() {
  return (
    <section className="w-full bg-[#EDECEC] py-8 sm:py-12">
      <div className="beewise-container">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[524px] rounded-[24px] overflow-hidden bg-[#EDECEC] shadow-sm">
          {/* Background Images */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/beewise/join-team-desktop.webp"
              alt="Join the Beewise Team"
              fill
              className="hidden sm:block object-cover object-center"
            />
            <Image
              src="/images/beewise/join-team-mobile.jpg"
              alt="Join the Beewise Team"
              fill
              className="block sm:hidden object-cover object-center"
            />
          </div>

          {/* Cutout CTA Card Top-Left */}
          <div className="relative z-10 bg-[#EDECEC] max-w-[90%] sm:max-w-[580px] p-6 sm:p-10 md:pl-12 md:pr-16 md:pt-10 md:pb-12 rounded-br-[24px] flex flex-col items-start gap-4 sm:gap-6 cutout-corner-top-right">
            {/* Top-Right Cutout SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className="absolute top-0 -right-[23px] w-6 h-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.859375 24C0.859375 10.7452 11.6045 0 24.8594 0H0.859375V24Z"
                fill="#EDECEC"
              />
            </svg>

            <h3 className="text-[26px] sm:text-[30px] md:text-[32px] font-medium text-black leading-tight">
              Join the team
            </h3>
            <p className="text-[15px] sm:text-[18px] md:text-[20px] font-normal text-[#363636] leading-relaxed">
              Help save the bees and protect the global food supply at a growing, dynamic company.
            </p>
            <Link
              href="https://beewise.ag/careers"
              target="_blank"
              className="btn-beewise-main w-full sm:w-auto"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
