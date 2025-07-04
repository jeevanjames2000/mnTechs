import React, { Suspense, lazy } from "react";
import Loader from "../../Components/loaders/Loader";

// Lazy load all components
const Hero = lazy(() => import("../../Components/Hero"));
const ItServices = lazy(() => import("../../Components/ItServices"));
const CollaborationSection = lazy(() => import("../../Components/CollaborationSection"));
const SkillsSection = lazy(() => import("../../Components/SkillsSection"));
const TestimonialsSection = lazy(() => import("../../Components/TestimonialsSection"));
const Navigation = lazy(() => import("../../Components/Navigation"));
const Contacts = lazy(() => import("../../Components/Contacts"));
const Footer = lazy(() => import("../../Components/Footer"));

export default function Index() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Navigation />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <ItServices />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <CollaborationSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <Contacts />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </>
  );
}
