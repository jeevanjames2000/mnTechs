import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Home/Index";
import NotFound from "./pages/NotFound";
// import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ContactWrapper from "./pages/CompWrapper";
import Products from "./products/Products";
import AppDevelopment from "./products/AppDevelopment";
import BillingSystems from "./products/BillingSystems";
import CRM from "./products/CRM";
import ECommerce from "./products/ECommerce";
import EducationManagement from "./products/EducationManagement";
import HospitalManagement from "./products/HospitalManagement";
import HRMS from "./products/HRMS";
import PayrollManagement from "./products/PayrollManagement";
import AIAgent from "./products/AIAgent";
import About from "./pages/About";
import Team from "./pages/Team";
import Terms from "./pages/Home/Terms";
import Privacy from "./pages/Home/Privacy";
import Careers from "./pages/Careers";
import ScrollToTop from "./products/Scrolltotop";
import ScrollButton from "./Components/ScrollButton";

const App = () => (
  <BrowserRouter>
   <ScrollToTop/>
    <Routes>
    
      <Route path="/" element={<Index/>} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
        <Route path="/products/ai-agent" element={<AIAgent />} />
        <Route path="/products/app-development" element={<AppDevelopment />} />
        <Route path="/products/billing-system" element={<BillingSystems />} />
        <Route path="/products/crm" element={<CRM />} />
        <Route path="/products/e-commerce" element={<ECommerce />} />
        <Route path="/products/education-management" element={<EducationManagement />} />
        <Route path="/products/hospital-management" element={<HospitalManagement />} />
        <Route path="/products/hrms" element={<HRMS />} />
        <Route path="/products/payroll-management" element={<PayrollManagement />} />
      <Route path="/terms" element={<Terms/>}/>
      <Route path="/privacy" element={<Privacy/>}/>
      <Route path="/about" element={<About/>} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<ContactWrapper />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/careers" element={<Careers/>} />
      
      
    </Routes>
    <ScrollButton />
  </BrowserRouter>
);
export default App;
