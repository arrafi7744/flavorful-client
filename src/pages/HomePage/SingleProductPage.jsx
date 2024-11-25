/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import useRequest from '../../APIServices/useRequest';
import { FaHeart, FaStar } from 'react-icons/fa';
import GlobalLoading from '../../components/GlobalComponents/GlobalLoading/GlobalLoading';
import Swal from 'sweetalert2';
import RatingReviewShow from '../../components/HomePageCompos/RatingReviewShow/RatingReviewShow';

function SingleProductPage() {
  const { id } = useParams();
  const { addToCart, user } = useContext(AuthContext);

  const [postRequest, getRequest] = useRequest();
  const [productInfo, setProductInfo] = useState(null);
  const [stocks, setStocks] = useState(0);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0); // Rating state
  const [review, setReview] = useState('');
  const [crtReviewState, setCrtReviewState] = useState(false);
  const [allTotalRating, setAllTotalRating] = useState([]);
  const [fetchRatingState, setFetchRatingState] = useState(false);
  const [calculatedRating, setCalculatedRating] = useState(0);
  const [mainImage, setMainImage] = useState('');

  const fetchTotalRatings = async () => {
    try {
      const fetchData = await getRequest(`/ratings/src/byId/${id}`);
      setAllTotalRating(fetchData?.data?.data);
      setFetchRatingState(!fetchRatingState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTotalRatings();
  }, [crtReviewState]);

  const calculateRating = async () => {
    try {
      const totalRating = allTotalRating.length;
      let sumOfAllRatings = 0;
      let avgRating = 0;

      allTotalRating &&
        allTotalRating.map((item) => {
          sumOfAllRatings += item.rating;
        });

      avgRating = sumOfAllRatings / totalRating;

      setCalculatedRating(avgRating);
    } catch (error) {
      console.log(error);
    }
  };

  const staticRating = calculatedRating ? calculatedRating : 0;
  const staticRatingCount = allTotalRating.length;

  useEffect(() => {
    calculateRating();
  }, [fetchRatingState]);

  const fetchProductInfo = async () => {
    const singleProdFetchInfo = {
      userId: user?._id,
      productId: id,
    };
    try {
      const fetchData = await postRequest(
        '/products/src/byid',
        singleProdFetchInfo
      );
      setProductInfo(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchStockDetails = async () => {
    try {
      const stockDetails = await getRequest(`/stocks/src/${id}`);
      setStocks(stockDetails?.data?.data?.stockQTY);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, []);

  const fetchCategory = async () => {
    try {
      const fetchData = await getRequest(
        `/categories/src/${productInfo?.categoryId}`
      );
      setCategories(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productInfo && productInfo?.categoryId) {
      fetchCategory();
    }
  }, [productInfo]);

  const handleIncrease = () => {
    if (quantity < stocks) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmitReview = async () => {
    const crtReview = await postRequest('/ratings/crt', {
      userId: user?._id,
      productId: id,
      rating: rating,
      review: review,
    });

    if (crtReview?.data?.error === false) {
      Swal.fire('Successfully Added the Review');
      setRating(0);
      setReview('');
      setCrtReviewState(!crtReviewState);
    }
  };

  useEffect(() => {
    if (productInfo) {
      setMainImage(productInfo?.productThumb);
    }
  }, [productInfo]);

  const handleThumbnailClick = (imagePath) => {
    // Update the main image when a thumbnail is clicked
    setMainImage(imagePath);
  };

  if (!productInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GlobalLoading />
      </div>
    );
  }

  return (
    <div className="container mt-10 md:mt-0 mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 bg-white pb-8 px-4 md:px-8">
        <div className="md:w-1/2 flex flex-col items-center justify-center">
          <div className="relative w-96 h-96">
            <img
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${mainImage}`}
              alt={productInfo?.name}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-14 mt-4">
            {productInfo &&
              productInfo.productsImg.map((item) => (
                <div
                  onClick={() => handleThumbnailClick(item.path)}
                  key={item.path}
                  className="w-20 h-20 rounded-xl border-2 hover:cursor-pointer hover:scale-105"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={`${process.env.REACT_APP_BackendURLIMG}/images/${item?.path}`}
                    alt="productImg"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="md:w-1/2 md:-mt-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {productInfo?.productName}
            </h1>
          </div>
          {stocks && stocks > 0 ? (
            <p className="text-gray-500 mb-4 font-semibold md:font-normal">
              Stock Remaining: {stocks} pieces
            </p>
          ) : (
            <p>Stock Unavailable</p>
          )}
          <p className="text-gray-600 mb-6">{productInfo.productDescription}</p>

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

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-green-600">
              Tk {productInfo.sellingPrice} /-
            </span>
            {productInfo.originalPrice && (
              <span className="text-gray-400 line-through">
                ${productInfo.originalPrice}
              </span>
            )}
          </div>

          {user && user.userType === 103 ? (
            <div className="mb-10 flex items-center space-x-2">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded-l-lg text-gray-600 hover:bg-gray-300 disabled:opacity-50"
                disabled={quantity <= 0}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-14 py-1 flex items-center justify-normal text-center border-t border-b border-gray-300 focus:outline-none"
              />
              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded-r-lg text-gray-600 hover:bg-gray-300 disabled:opacity-50"
                disabled={quantity >= stocks}
              >
                +
              </button>
            </div>
          ) : null}

          <div className="mt-3 mb-5 text-lg flex items-center gap-x-2 font-semibold">
            <span>Total Cost: </span>
            <span className="text-green-700">
              {quantity * productInfo?.sellingPrice} TK
            </span>
          </div>

          <div>
            {user !== null ? (
              <>
                {user.userType === 103 ? (
                  <button
                    onClick={() => addToCart(productInfo, stocks, quantity)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300"
                    disabled={quantity === 0 || stocks <= 0}
                  >
                    Add To Shopping Cart
                  </button>
                ) : (
                  <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled
                  >
                    Add To Shopping Cart
                  </button>
                )}
              </>
            ) : (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mb-6 transition duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled
              >
                Add To Shopping Cart
              </button>
            )}
          </div>

          {/* Categories, Seller, and Review Section */}
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-x-5">
              <div>
                <span className="font-semibold">Categories:</span>{' '}
                {categories?.categoryName || 'not defined'}
              </div>
              <div className="flex items-center gap-x-2">
                <span className="font-semibold">Sellers:</span>
                <p className="text-orange-600 hover:underline cursor-pointer">
                  {productInfo.seller || 'Grocery Shop'}
                </p>
              </div>
            </div>

            {/* Rating and Review Section */}
            {user && user?.userType === 103 ? (
              <div className="mt-2">
                <h3 className="font-semibold">Your Rating and Review:</h3>
                <div className="flex gap-x-4 items-center mt-2">
                  {/* Star Rating Input */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-full flex justify-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          onClick={() => handleStarClick(star)}
                          className={`cursor-pointer w-5 h-5 ${
                            star <= rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleSubmitReview}
                      disabled={!rating || !review} // Button is disabled until both rating and review are provided
                      className={`w-full mt-3 px-4 py-1 text-sm font-semibold rounded transition ${
                        rating && review
                          ? 'bg-orange-600 text-white hover:bg-orange-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit
                    </button>
                  </div>

                  {/* Review Textarea */}
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-orange-600"
                  ></textarea>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 md:mx-10">
        <h3 className="font-semibold text-xl underline">Customer Reviews:</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 ">
          {allTotalRating.length > 0 ? (
            allTotalRating.map((reviewData, index) => (
              <RatingReviewShow reviewData={reviewData} key={index} />
            ))
          ) : (
            <p className="text-gray-500">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
