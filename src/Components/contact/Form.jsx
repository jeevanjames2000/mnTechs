import React from "react";
import useForm from "../../Hooks/useForm";
import ngrokAxiosInstance from "../../Hooks/axiosInstance";

// Utility function to convert number to words (Indian Rupees format)
const numberToWords = (num) => {
  if (!num || isNaN(num) || num <= 0) return "Zero Rupees";

  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Lakh", "Crore"];

  const convertLessThanThousand = (num) => {
    let result = "";
    if (num >= 100) {
      result += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num >= 10 && num < 20) {
      result += teens[num - 10] + " ";
      num = 0;
    }
    if (num > 0) {
      result += units[num] + " ";
    }
    return result;
  };

  let n = Math.floor(num);
  if (n > 10000000) return "Exceeds 1 Crore"; // Handle budget limit

  let result = "";
  let thousandIndex = 0;

  while (n > 0) {
    if (n % 1000 !== 0) {
      let part = convertLessThanThousand(n % 1000);
      result = part + thousands[thousandIndex] + " " + result;
    }
    n = Math.floor(n / 1000);
    thousandIndex++;
  }

  return result.trim() + " Rupees";
};

const Form = () => {
  const { formData, handleChange, setFormData } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    ProductDesign: "",
    ProjectBudget: "",
  });

  // Regular expression for alphabetic characters and spaces only
  const namePattern = /^[A-Za-z\s]*$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate firstName and lastName
    if (!namePattern.test(formData.firstName)) {
      alert("First Name should contain only letters and spaces.");
      return;
    }
    if (!namePattern.test(formData.lastName)) {
      alert("Last Name should contain only letters and spaces.");
      return;
    }

    // Validate phone number
    const phonePattern = /^[6-9][0-9]{9}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number starting with 6-9");
      return;
    }

    // Validate budget (limit is ₹1 crore)
    const maxBudget = 10000000;
    if (Number(formData.ProjectBudget) > maxBudget) {
      alert("Project budget should not exceed ₹1,00,00,000 (1 crore)");
      return;
    }

    try {
      const response = await ngrokAxiosInstance.post(
        "/reach/create_reach_us",
        formData
      );

      console.log("Server response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        alert("Form submitted successfully!");

        // Clear form data after successful submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          message: "",
          ProductDesign: "",
          ProjectBudget: "",
        });
      } else {
        alert("Submission failed: " + response.data.error);
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      alert(error.response?.data?.error || "An error occurred.");
    }
  };

  // Custom handleChange to filter non-alphabetic characters for name fields
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      if (namePattern.test(value)) {
        handleChange(e);
      }
    } else {
      handleChange(e);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border-b border-gray-300 rounded-lg focus:outline-none text-black placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["firstName", "lastName"].map((field) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {field === "firstName" ? "First Name" : "Last Name"}
            </label>
            <input
              type="text"
              name={field}
              placeholder={field === "firstName" ? "Joe" : "Smith"}
              value={formData[field]}
              onChange={handleNameChange}
              pattern="[A-Za-z\s]*"
              onKeyPress={(e) => {
                if (!namePattern.test(e.key)) {
                  e.preventDefault();
                }
              }}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@domain.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            placeholder="Enter 10-digit phone"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              handleChange({ target: { name: "phone", value } });
            }}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["company", "role"].map((field) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {field === "company" ? "Company" : "Role"}
            </label>
            <input
              type="text"
              name={field}
              placeholder={`Your ${field === "company" ? "Company Name" : "Role"}`}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Product Design
        </label>
        <input
          type="text"
          name="ProductDesign"
          placeholder="e.g., Web Design"
          value={formData.ProductDesign}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Project Description
        </label>
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`${inputClass} resize-none bg-transparent`}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Project Budget
        </label>
        <input
          type="number"
          name="ProjectBudget"
          placeholder="Enter your budget"
          value={formData.ProjectBudget}
          onChange={(e) => {
            const value = e.target.value;
            if (!value || Number(value) <= 10000000) {
              handleChange(e);
            }
          }}
          className={inputClass}
        />
        <p className="text-sm text-gray-500 mt-2">
          {formData.ProjectBudget
            ? numberToWords(Number(formData.ProjectBudget))
            : "Please enter a budget"}
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full mt-6 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
      >
        Submit Now
      </button>
    </form>
  );
};

export default Form;