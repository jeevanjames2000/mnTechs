import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { ArrowRight } from "lucide-react";
import ngrokAxiosInstance from "../Hooks/axiosInstance";

const Safeguard = () => {
  const [data, setData] = useState({ title: "", subtitle: "", cards: [] });

  const fetchSafeguard = async () => {
    try {
      const res = await ngrokAxiosInstance.get("/dynamic/safeguard");
      if (Array.isArray(res.data) && res.data.length > 0) {
        setData(res.data[0]);
      }
    } catch (error) {
      console.error("Error fetching safeguard data:", error);
    }
  };

  useEffect(() => {
    fetchSafeguard();
  }, []);

  return (
    <section className="py-16 px-4 bg-white text-center">
      <p className="text-orange-500 font-medium mb-2">● {data.title}</p>
      <h2 className="text-4xl font-bold text-gray-900 mb-12">{data.subtitle}</h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {data.cards.map((card, index) => (
          <div
            key={index}
            className="border rounded-2xl p-8 shadow-sm hover:shadow-md transition hover:border-orange-500"
          >
            <h3 className="text-xl text-black font-semibold mb-4">
              {card.title}
            </h3>
            <p className="text-gray-400 mb-8">{card.description}</p>
            <Link
              to={index === 0 ? "/demo" : "/contact"} // Use /demo for "Request a Free Demo", /contact for "Get In Touch"
              className="flex items-center gap-2 text-black font-semibold"
            >
              {index === 0 ? "Request a Free Demo" : "Get In Touch"}
              <span className="bg-gray-200 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Safeguard;