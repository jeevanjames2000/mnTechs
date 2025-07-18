import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  PhoneCall,
  MailIcon,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import MnTechImage from "../assets/images/mntech.png";
import ngrokAxiosInstance from "../Hooks/axiosInstance";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    ngrokAxiosInstance
      .get("/dynamic/footer")
      .then((res) => setFooterData(res.data[0]))
      .catch((err) =>
        console.error(
          "Error loading footer data:",
          err.response ? err.response.data : err.message
        )
      );
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("default-search");
    const email = emailInput.value;

    if (!email) return alert("Please enter your email");

    try {
      const response = await ngrokAxiosInstance.post("/newsLetter/create", {
        email,
      });

      alert(response.data.message || "Subscription successful");
    } catch (error) {
      console.error(
        "Error subscribing:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.status === 409) {
        alert("This email is already subscribed.");
      } else {
        alert(
          error.response?.data?.error ||
            error.response?.data?.message ||
            "Something went wrong"
        );
      }
    } finally {
      // ✅ Always clear input, whether success or error
      emailInput.value = "";
    }
  };

  if (!footerData) return null;

  const {
    socialLinks,
    menuLinks,
    productLinks,
    branch,
    copyright,
    policyLinks,
    sectionTitles,
  } = footerData;

  const splitAddress = branch?.address?.split("\n") || [];

  return (
    <footer className="pb-7 bg-gray-900 text-gray-400">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-0 md:pb-14 md:border-b border-transparent md:border-gray-500 gap-8">
          <a href="/" aria-label="Home">
            <img src={MnTechImage} alt="MNTECHS Logo" className="h-14 w-auto" />
          </a>

          <div className="flex gap-4 ">
            {socialLinks?.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer">
                <Facebook
                  className="text-white hover:text-blue-500"
                  size={30}
                />
              </a>
            )}
            {socialLinks?.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
                <Instagram
                  className="text-white hover:text-red-500"
                  size={30}
                />
              </a>
            )}
            {socialLinks?.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noreferrer">
                <Youtube className="text-white hover:text-red-500" size={30} />
              </a>
            )}
          </div>
        </div>

        <div className="py-14 flex flex-col lg:flex-row justify-between gap-12 border-b border-gray-500">
          <div className="flex flex-col sm:flex-row gap-7 md:gap-12 w-full lg:w-3/4">
            <div className="md:p-0 p-5 border border-gray-500 rounded-md md:border-0 md:rounded-none md:border-transparent shadow-md">
              <h6 className="text-lg font-semibold text-white mb-6 text-center sm:text-left">
                {sectionTitles?.menuTitle}
              </h6>
              <ul className="space-y-4 text-left sm:text-left">
                {menuLinks?.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="hover:text-amber-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div className="md:p-0 p-5 border border-gray-500 rounded-md md:border-0 md:rounded-none md:border-transparent shadow-md">
              <h6 className="text-lg font-semibold text-white mb-6 text-center sm:text-left">
                {sectionTitles?.productTitle}
              </h6>
              <ul className="space-y-4 text-left sm:text-left">
                {productLinks?.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path} className="hover:text-amber-400">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Branch Info */}
            <div className="flex flex-col gap-5 md:p-0 p-5 border border-gray-500 rounded-md md:border-0 md:rounded-none md:border-transparent shadow-md">
              <h6 className="text-lg font-semibold text-white mb-6 text-center sm:text-left">
                {sectionTitles?.branchTitle}
              </h6>

              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5" />
                <p className="md:text-base text-sm text-gray-400   hover:text-amber-400">
                  {splitAddress.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex items-start gap-2  hover:text-amber-400">
                <PhoneCall className="w-5 h-5" />
                <p className="text-base text-gray-400   hover:text-amber-400">
                  {branch?.phone}
                </p>
              </div>
              <div className="flex items-start gap-2  hover:text-amber-400">
                <MailIcon className="w-5 h-5" />
                <a
                  href={`mailto:${branch?.email}`}
                  className="text-base text-gray-400 hover:text-amber-400"
                >
                  {branch?.email}
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-80 lg:max-w-md max-lg:mx-auto mb-5 md:mb-0">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-5">
              <input
                type="email"
                id="default-search"
                className="w-full px-10 py-3 md:py-4 text-gray-600 bg-white border border-gray-300 rounded-full placeholder-gray-400"
                placeholder="Your email address"
                required
              />
              <button
                type="submit"
                className="w-full py-3 md:py-4 bg-orange-500 hover:bg-orange-400 rounded-full text-black font-medium"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex relative flex-col md:flex-row items-center justify-between pt-7 text-sm">
          <span>
              {copyright}
          </span>

          <div className="flex flex-wrap justify-center gap-4 absolute md:static -top-10 md:top-auto">
            {policyLinks?.map((item, idx) => (
              <React.Fragment key={idx}>
                <a href={item.path} className="hover:text-amber-400">
                  {item.label}
                </a>
                {idx < policyLinks.length - 1 && (
                  <span className="text-amber-400">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
