import { useState } from "react";
import Hero from "../components/home/Hero";
import PopularRoutes from "../components/home/PopularRoutes";
import HowItWorks from "../components/home/HowItWorks";
import WhyChooseHalt from "../components/home/WhyChooseHalt";
import CtaBanner from "../components/home/CtaBanner";
import PageLoader from "../components/common/PageLoader";
import "../styles/Home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <PageLoader />}
      <Hero />
      <PopularRoutes onLoadingChange={setIsLoading} />
      <HowItWorks />
      <WhyChooseHalt />
      <CtaBanner />
    </>
  );
}

export default Home;
