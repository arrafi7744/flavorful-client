import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './banner.css';
import { Link } from 'react-router-dom';
import useRequest from '../../../APIServices/useRequest';

function Banner() {
  const [postRequest, getRequest] = useRequest();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced search function
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults(searchTerm);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const response = await postRequest(`/products/src/prd`, {
        pQuery: query,
      });
      setResults(response.data.data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInput = (e) => {
    if (!e.target.value) {
      setShowResults(false);
      setResults([]);
    }
  };

  return (
    <div className="bannerClass w-full h-[86vh]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="mx-5 md:mx-0 px-5 md:px-10 py-10 md:py-10 bg-white rounded-lg text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold font-poppins">
            Groceries will be delivered within 90 Minutes
          </h1>
          <p className="text-sm mt-4">
            Get your healthy foods & snacks delivered at your doorsteps all day
            everyday
          </p>
          <form className="mt-10 w-full grid grid-cols-12 items-center">
            <input
              className="col-span-9 md:col-span-10 border-0 md:border py-2 md:py-4 rounded-s-lg px-4"
              type="search"
              placeholder="Search for Products"
              value={searchTerm}
              onChange={handleSearchChange}
              onInput={handleInput} // Handle cancel icon click
            />
            <input
              className="col-span-3 md:col-span-2 px-2 md:px-4 py-2 md:py-4 rounded-e-lg bg-orange-600 text-white font-semibold"
              type="submit"
              value="Search"
              onClick={(e) => e.preventDefault()}
            />
          </form>

          {/* Results Panel */}
          {showResults && (
            <div className="mt-4 bg-gray-100 rounded-lg shadow-lg">
              {loading ? (
                <p className="p-4">Loading...</p>
              ) : results.length > 0 ? (
                results.map((product) => (
                  <Link
                    to={`/singleproductpage/${product._id}`}
                    key={product._id}
                  >
                    <div className="p-4 border-b cursor-pointer text-black hover:bg-gray-200">
                      {product.productName}
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center p-4">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Banner;
