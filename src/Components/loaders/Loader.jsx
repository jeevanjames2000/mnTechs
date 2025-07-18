// src/Components/loaders/Loader.jsx
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/mntech.png"; // Adjust path if needed

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Loader mounted, starting 2-second timer");
    const timer = setTimeout(() => {
      console.log("Timer complete, hiding loader");
      setIsLoading(false);
    }, 2000); // 2000ms = 2 seconds

    // Cleanup timer on unmount
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) {
    console.log("Loader hidden, rendering null");
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center h-screen bg-white z-50">
      <img
        src={logo}
        alt="Loading Logo"
        className="w-[150px] h-auto animate-bounce"
      />
    </div>
  );
};

export default Loader;