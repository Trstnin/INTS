import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Feedback from "../components/Feedback";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen">

        {/* Header */}
        <div className="p-4 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg fixed top-0 left-0 right-0 z-10">
          <Header />
        </div>

        {/* Hero Section */}
        <HeroSection />

        {/* Feedback Section */}
        <Feedback />

        {/* Footer */}
        <div className="relative bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-green-500 mt-12">
          <Footer />
        </div>
        
      </div>
    </>
  );
};

export default Landing;
