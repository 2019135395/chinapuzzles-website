import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import Details from "@/components/Details";
import ContactFooter from "@/components/ContactFooter";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "China Puzzles",
  description: "Explore the mysteries of the East with ChinaPuzzles. A unique collection of engaging and educational puzzles that celebrate the richness of Chinese history, art, and culture.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      {/* <Details /> */}
      <ContactFooter />
    </>
  );
}