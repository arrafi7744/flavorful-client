import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProviders';
import useRequest from '../../../APIServices/useRequest';

function UserDashAllReviews() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [ratingReviews, setRatingReviews] = useState([]);

  const fetchAllUserRatings = async () => {
    try {
      const fetchData = await getRequest(`/ratings/src/byUser/${user?._id}`);
      setRatingReviews(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllUserRatings();
  }, []);

  // Updated truncateText function to handle null/undefined values
  const truncateText = (text, maxLength) => {
    if (!text) return ''; // Return an empty string if text is null or undefined
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratingReviews.map((review) => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative"
            title={review.review || 'No review available'} // Tooltip for full review on hover
          >
            <div className="flex flex-col items-center">
              <img
                src={`${process.env.REACT_APP_BackendURLIMG}/images/${review?.productThumb}`}
                alt={review.productName}
                className="w-20 h-20 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-center">
                {review.productName}
              </h3>
              <div className="flex items-center text-yellow-400 my-2">
                {'★'.repeat(review.rating)}{' '}
                <span className="text-gray-400 ml-2">
                  ({review.rating} / 5)
                </span>
              </div>
              <p className="text-gray-600 mt-2 text-center hover:cursor-context-menu">
                {truncateText(review.review, 30)}
              </p>
              <span className="text-sm text-gray-500 mt-1">
                {review.createdDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashAllReviews;
