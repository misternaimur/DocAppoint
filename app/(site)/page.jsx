/** @format */

import HeroSection from "../page/HeroSection";
import WhyChoose from "../Compont/Share-component/WhyChoose";
import TopRatedDoctors from "../Compont/Share-component/TopRatedDoctors";
import HowWorks from "../Compont/Share-component/HowWorks";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <TopRatedDoctors />
      <WhyChoose />
      <HowWorks />
    </div>
  );
}
