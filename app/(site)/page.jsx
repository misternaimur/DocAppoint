/** @format */

import HeroSection from "../page/HeroSection";
import WhyChoose from "../Compont/Share-component/WhyChoose";
import TopRatedDoctors from "../Compont/Share-component/TopRatedDoctors";
import HowWorks from "../Compont/Share-component/HowWorks";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata({
  title: "Book Doctors Online",
  description:
    "Discover trusted doctors, compare specialists, and book healthcare appointments online with DocAppoint.",
  path: "/",
});

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
