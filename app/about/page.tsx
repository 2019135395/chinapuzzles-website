
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the passionate team of developers, designers, and cultural enthusiasts dedicated to creating ChinaPuzzles and sharing the beauty of Chinese culture.",
};

export default function AboutPage() {
  return (
    <MaxWidthWrapper className="mt-28 sm:mt-40">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-montserrat">
          About Us
        </h1>
        <div className="prose prose-lg max-w-none text-zinc-300 prose-p:text-zinc-300 space-y-6">
          <p>
            <span className="font-semibold">China Puzzles</span> is a cross-cultural exploration platform connecting the world with a multifaceted China.
          </p>
          <p>
            We design high-energy programs that combine business, culture, and storytelling — from company visits and immersive experiences to conversations with entrepreneurs, scholars, and changemakers.
          </p>
          <p>
            Our founding team comes from top universities across China and abroad, and brings a young, diverse, and globally-minded perspective. We're driven by curiosity, creativity, and the belief that real understanding comes from honest, human connection — not just headlines.
          </p>
          <p>
            Whether you're a <span className="font-semibold">student, founder, investor, or explorer</span>, we invite you to collect the puzzle pieces with us — and reimagine China through many lenses.
          </p>
          <p>
            <span className="font-semibold">Let’s piece together the future, one story at a time.</span>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
