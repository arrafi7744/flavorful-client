import React, { useContext, useEffect, useState } from 'react';
import useRequest from '../../../APIServices/useRequest';
import { AuthContext } from '../../../providers/AuthProviders';
import { Link, useNavigate } from 'react-router-dom';

function HomePageIndividualProduct({ product }) {
  const { addToCart, addedProduct, user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [rating, setRating] = useState([]);
  const [calculatedRating, setCalculatedRating] = useState(0);

  const fetchStock = async () => {
    try {
      const fetchData = await getRequest(`/stocks/src/${product?._id}`);
      setStock(fetchData?.data?.data?.stockQTY);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRating = async () => {
    try {
      const fetchData = await getRequest(`/ratings/src/byId/${product?._id}`);
      setRating(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStock();
    fetchRating();
  }, []);

  const handleIncrease = () => {
    if (quantity < stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setStock(stock - 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setStock(stock + 1);
    }
  };

  const calculateRating = async () => {
    try {
      const totalRating = rating.length;
      let sumOfAllRatings = 0;
      let avgRating = 0;

      rating &&
        rating.map((item) => {
          sumOfAllRatings += item.rating;
        });

      avgRating = sumOfAllRatings / totalRating;

      setCalculatedRating(avgRating);
    } catch (error) {
      console.log(error);
    }
  };

  const staticRating = calculatedRating ? calculatedRating : 0;
  const staticRatingCount = rating.length;

  useEffect(() => {
    calculateRating();
  }, [rating]);

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-md hover:cursor-pointer">
      <Link to={`/singleproductpage/${product?._id}`}>
        <div className="relative">
          <img
            className="w-full h-60 rounded-t-lg object-contain"
            src={`${process.env.REACT_APP_BackendURLIMG}/images/${product?.productThumb}`}
            alt="Product"
          />
        </div>
      </Link>

      <div className="mt-5 text-left">
        <h3 className="text-lg font-semibold">{product?.productName}</h3>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((star, index) => (
            <svg
              key={index}
              className={`w-6 h-6 ${
                index < Math.floor(staticRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.977a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.388 2.464a1 1 0 00-.364 1.118l1.286 3.977c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.388 2.464c-.785.57-1.84-.197-1.54-1.118l1.286-3.977a1 1 0 00-.364-1.118L2.605 9.404c-.784-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.286-3.977z"></path>
            </svg>
          ))}
          <span className="ml-2 text-gray-600 text-sm">
            {staticRating} ({staticRatingCount} ratings)
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Quantity Remaining: <span className="italic">{stock}</span> Kg
        </p>
        {user && user.userType === 103 ? (
          <div className="mt-3 flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              disabled={quantity === 1}
              className={`px-2 border rounded-lg ${
                quantity === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-black bg-red-100 border-red-100'
              }`}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-8 text-xs !px-0 !py-1 text-center border rounded-lg border-gray-200"
            />
            <button
              onClick={handleIncrease}
              disabled={quantity === stock}
              className={`px-2 border rounded-lg ${
                quantity === stock
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-black bg-green-100 border-green-100'
              }`}
            >
              +
            </button>
          </div>
        ) : (
          <></>
        )}

        <div className="mt-10 flex items-end justify-between">
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold text-green-500">
              ${product?.sellingPrice}
            </span>
          </div>
          {user && user.userType === 103 ? (
            <button
              onClick={() => addToCart(product, stock, quantity)}
              className="flex items-center justify-center border px-3 py-1 text-sm bg-white text-green-600 font-bold rounded-3xl duration-200 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 6M7 13l1.4 6m10-6l-1.4 6M7 19h10M9 23a1 1 0 102 0m4 0a1 1 0 102 0"
                />
              </svg>
              Cart
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePageIndividualProduct;
