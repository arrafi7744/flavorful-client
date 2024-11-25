import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import useRequest from "../../APIServices/useRequest";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [postRequest, getRequest] = useRequest();
  const [allFaqs, setAllFaqs] = useState([]);

  const fetchAllFaqs = async () => {
    try {
      const fetchData = await getRequest("/faq/src/all");
      setAllFaqs(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-14 md:mt-0 container mx-auto bg-white">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-8">
        Frequently Asked Questions
      </h1>
      {
        allFaqs && allFaqs.length > 0 ? <div className="py-6 px-6 md:px-10 mx-0 md:mx-80">
        {allFaqs.map((faq, index) => (
          <div
            key={index}
            className="border-2 border-orange-600 mb-5 px-5 rounded-lg shadow-md"
          >
            <div
              className="flex justify-between items-center py-4 cursor-pointer transition-transform duration-300 ease-in-out"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <FaMinus className="text-orange-600" />
              ) : (
                <FaPlus className="text-orange-600" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 pb-4 pl-6 transition-opacity duration-300 ease-in-out">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div> : <div className="mt-10 w-full text-2xl font-bold text-gray-400 text-center"><h1>No FAQs yet generated !!!</h1></div>
      }
    </div>
  );
};

export default FAQs;
