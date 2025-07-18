  import { useState } from "react";
import ngrokAxiosInstance from "../Hooks/axiosInstance";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agreeToUpdates: false,
    file: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log("Submitting form data:", formData);

    try {
      const response = await ngrokAxiosInstance.post(
        "/contact/contact_us",
        formData
      );

      console.log("Server response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          agreeToUpdates: false,
          file: null,
        });
      } else {
        alert(response.data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert(error.response?.data?.error || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-16 md:py-16 text-white">
          <div className="text-left md:mb-12 mb-8">
            <h2 className="lg:text-6xl text-3xl font-bold text-white">
              Contact <span className="text-orange-500">Us</span>
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-small mb-2">
                  Name <span className="text-orange-500 text-sm">Required</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-600 focus:outline-none text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-small mb-2">
                  Email Address{" "}
                  <span className="text-orange-500">Required</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-600 focus:outline-none text-white"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Enter a valid email address"
                />
              </div>
              <div>
                <label className="block text-xs font-small mb-2">
                  Phone <span className="text-gray-400">Optional</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  inputMode="numeric"
                  pattern="[6-9][0-9]{9}"
                  maxLength={10}
                  title="Enter a valid 10-digit phone number starting with 6-9"
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-600 focus:outline-none text-white"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-small mb-2">Message</label>
                <textarea
                  name="message"
                  rows="1"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border-b border-gray-600 focus:outline-none text-white"
                />
              </div>
              <div className="space-y-4">
                <div className="text-xs text-gray-400">
                  We will process your personal information in accordance with
                  our Privacy Policy.
                </div>
                <div className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToUpdates"
                    checked={formData.agreeToUpdates}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-orange-500 cursor-pointer bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <label className="text-xs text-gray-300 cursor-pointer">
                    I would like to be contacted with news and updates about
                    your{" "}
                    <span className="text-orange-500">events and services</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center md:mt-12 mt-3">
              <button
                type="submit"
                disabled={submitting}
                className={`w-50 md:w-70 ${
                  submitting
                    ? "bg-orange-300"
                    : "bg-orange-500 cursor-pointer hover:bg-orange-400"
                } text-black font-semibold py-3 px-4 md:py-4 md:px-8 rounded-full transition-colors duration-200 text-md md:text-lg`}
              >
                {submitting ? "Sending..." : "Send Message Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contacts;
