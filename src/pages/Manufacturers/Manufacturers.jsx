import React, { useEffect, useState } from "react";
import useRequest from "../../APIServices/useRequest";

const Manufacturers = () => {
  const [postRequest, getRequest] = useRequest();
  const [allVendors, setAllVendors] = useState([]);

  const fetchAllShops = async () => {
    try {
      const fetchData = await getRequest("/shop/src/all");
      setAllVendors(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllShops();
  }, []);

  // Array of light background colors
  const bgColors = [
    "bg-yellow-100",
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-indigo-100",
    "bg-teal-100",
    "bg-orange-100",
  ];

  console.log(allVendors, "All Vendors");

  return (
    <div className="container mt-10 md:mt-0 mx-auto p-5 md:p-10 bg-white">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
        Our Manufacturers & Publishers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allVendors.map((manufacturer, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div
              className={`${
                bgColors[index % bgColors.length]
              } w-full h-48 flex items-center justify-center text-4xl font-bold text-gray-700`}
            >
              {manufacturer.shopName.charAt(0).toUpperCase()}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {manufacturer.shopName}
              </h2>
              <p className="text-gray-600 mt-2">
                {manufacturer.shopDescription}
              </p>
              <p className="text-orange-600 mt-1 italic">
                {manufacturer.shopCategory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manufacturers;
