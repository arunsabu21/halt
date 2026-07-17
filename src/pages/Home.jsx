import Hero from "../components/home/Hero";
import PopularRoutes from "../components/home/PopularRoutes";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseHalt from "../components/home/WhyChooseHalt";
import CtaBanner from "../components/home/CtaBanner";
import "../styles/Home.css";

function Home() {
  return (
    <>
      <Hero />
      <PopularRoutes />
      <HowItWorks />
      <WhyChooseHalt />
      <CtaBanner />
    </>
  );
}

export default Home;
