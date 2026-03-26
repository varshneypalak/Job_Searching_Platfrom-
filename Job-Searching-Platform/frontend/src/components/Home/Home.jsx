import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import CTABanner from "./CTABanner";

const Home = () => {
  const { isAuthorized } = useAuth();
  if (!isAuthorized) return <Navigate to="/login" />;

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <CTABanner />
    </>
  );
};

export default Home;
