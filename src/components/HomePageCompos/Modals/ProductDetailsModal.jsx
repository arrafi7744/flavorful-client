// src/components/Modals/ProductDetailModal.js
import React from 'react';

function ProductDetailModal({ product, stock, isOpen, onClose, addToCart }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-3xl mx-5 p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-4xl text-red-500 hover:text-gray-800"
        >
          &times;
        </button>

        {/* Product Image and Details */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${product?.productThumb}`}
              alt={product?.productName}
              className="object-contain w-full h-80"
            />
          </div>

          {/* Product Information */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold">{product?.productName}</h2>
            <p className="text-gray-600 mt-2">{product?.productDescription}</p>
            <p className="text-sm text-gray-500 mt-2">Stock: {stock} pieces</p>

            {/* Price and Cart Button */}
            <div className="mt-5 flex flex-col items-start space-y-4">
              <span className="text-xl font-semibold text-green-600">
                ${product?.sellingPrice}
              </span>

              <button
                onClick={async () => {
                  const success = await addToCart(product, stock);
                  if (success) {
                    onClose();
                  }
                }}
                className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
