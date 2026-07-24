import Navbar from "../components/landing/Navbar";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import EventShowcase from "../components/landing/EventShowcase";
import Stats from "../components/landing/Stats";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";


function HomePage() {

  return (

    <div className="bg-[#F8F4EC]">


      <Navbar />


      <main>

        <Hero />


        <Features />


        <HowItWorks />


        <EventShowcase />


        <Stats />


        <Testimonials />


        <FAQ />


        <CTA />

      </main>


      <Footer />


    </div>

  );

}


export default HomePage;