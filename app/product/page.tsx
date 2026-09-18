
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore our range of products designed to help you understand China better.",
};

export default function ProductsPage() {
  return (
    <MaxWidthWrapper className="mt-28 sm:mt-40">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 font-montserrat">
          Our Products
        </h1>
        <div className="prose prose-lg max-w-none text-zinc-300 prose-p:text-zinc-300 space-y-6">
          <p>
            We offer a range of programs and experiences to help you connect with China.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            <Link href="/product/product-1" className="block group">
              <div className="bg-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                <div className="flex h-48 gap-x-1">
                  <div className="w-1/3 h-full overflow-hidden">
                    <img src="/images/beijing.jpg" alt="Beijing" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="w-1/3 h-full overflow-hidden">
                    <img src="/images/xian.jpg" alt="Xi'an" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="w-1/3 h-full overflow-hidden">
                    <img src="/images/shanghai.jpg" alt="Shanghai" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white font-montserrat">12-DAY TRIP in Beijing, Xi'an and Shanghai</h3>
                  <p className="mt-2 text-zinc-400">The Innovator's Journey to China</p>
                  <div className="mt-4 text-blue-400 font-semibold">Explore Program &rarr;</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
