import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Components/Navigation";
import Footer from "../Components/Footer";
import map from "../assets/images/map.png"; 
import Form from "../Components/contact/Form"; 
import BreadCrumb from "./BreadCrumb";

const Contact = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navigation className="bg-gray-50" />
      <BreadCrumb title='Reach US'
      paragraph={`Your journey with MNTechs begins here.
Reach out — the future is just a message away.`} />
      
      <div className="relative py-10 px-4 md:px-20 bg-white">
        <img
          src={map}
          alt="hexagon background"
          className="absolute right-10 top-10 opacity-10 pointer-events-none hidden md:block"
          style={{ height: "150px" }}
        />
        <div className="px-2 pt-10 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       
            <div className="lg:col-span-2">
            <div className="mt-8 flex  gap-2 text-black font-medium text-lg">
        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
        Tell us about Yourself
      </div>
              <Form />
            </div>

            <div className="lg:col-span-1 flex lg:justify-end md:justify-left">
              <div className="w-full max-w-md space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <h6 className="text-lg font-bold text-gray-900">
                      Support Request
                    </h6>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-gray-600 sm:text-start text-sm mb-4">
                      Our experts are ready to answer your questions.
                    </p>
                    <div className="flex justify-center items-center space-x-2">
                      <h3 className="font-semibold text-sm text-gray-900">
                        Support Now
                      </h3>
                      <button
                        className="flex items-center justify-center w-10 h-10 text-orange-500 text-2xl border border-orange-500 rounded-full hover:translate-x-1 transition-transform"
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <h6 className="text-lg font-bold text-gray-900">
                      Need Help?
                    </h6>
                  </div>
                  <p className="text-gray-600 mb-4">
                    For technical or billing questions, contact Customer Care.
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <h6 className="text-2xl font-bold text-gray-900">
                      Need More Info?
                    </h6>
                  </div>
                  <p className="text-gray-600 mb-4">
                    For additional questions, contact Customer Care.
                  </p>
                </div>
              </div>
            </div>
          </div>

     
          <div className="w-full h-[400px] md:h-[500px] rounded overflow-hidden my-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.188572952851!2d78.45114611487795!3d17.44179378802811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb914d2a1e5453%3A0x8bff9bdbb0d5b853!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1718120589655!5m2!1sen!2sin"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Hyderabad"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
