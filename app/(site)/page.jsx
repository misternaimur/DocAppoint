/** @format */

import HeroSection from "../page/HeroSection";
import WhyChoose from "../Compont/Share-component/WhyChoose";
import HowWorks from "../Compont/Share-component/HowWorks";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhyChoose />
      <HowWorks />
    </div>
  );
}
