
import MaxWidthWrapper from "./MaxWidthWrapper";

const Details = () => {
  return (
    <div id="details" className="bg-zinc-900 py-24 sm:py-32">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16">
          <div className="lg:col-span-1 flex items-center">
            <h2 className="font-montserrat text-7xl font-bold text-white tracking-wider [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
              CHINA PUZZLES
            </h2>
            <div className="ml-8 text-zinc-300 space-y-4 text-sm">
              <p><span className="font-bold text-white">Program Locations:</span><br/>Beijing, Shanghai, Chengdu, Xi’an</p>
              <p><span className="font-bold text-white">Flexible Duration:</span><br/>5–14 days</p>
              <p><span className="font-bold text-white">Program Fees:</span><br/><span className="font-bold text-lg">12,000 – 30,000 RMB</span> per person</p>
              <p className="text-xs text-zinc-400">All-inclusive: intercity transport, accommodation, meals, cultural programs, and company visits.</p>
              <div className="pt-4">
                <p className="font-bold text-white">Eligibility:</p>
                <p className="text-zinc-400">International university students and young professionals interested in Chinese culture and business.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-white">Deep China Culture Immersion</h3>
                <p className="mt-2 text-zinc-400 text-sm">Bringing China to life through its cuisine, architecture, traditions, and everyday experiences.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Top-Tier Company Visit</h3>
                <p className="mt-2 text-zinc-400 text-sm">Walk inside the offices of unicorns, multinationals, and rising startups to explore how business is done in China.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Network Building</h3>
                <p className="mt-2 text-zinc-400 text-sm">Offering participants a deep experience of China while expanding their global network and building lasting connections.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Tailored Made Experience</h3>
                <p className="mt-2 text-zinc-400 text-sm">Options to customize modules for universities, departments, or specific industries.</p>
              </div>
            </div>
            <div className="relative h-full min-h-[400px]">
              <img 
                src="/images/forbiddencity.jpg"
                alt="Forbidden City"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Details;
