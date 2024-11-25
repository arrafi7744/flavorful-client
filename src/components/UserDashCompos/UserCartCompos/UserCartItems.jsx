import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCartItems({ item, removeFromCart, confirmCartItem }) {
  const navigate = useNavigate();
  return (
    <div class="w-full p-4 bg-white border rounded-lg shadow-md">
      <div class="relative">
        <img
          class="w-full h-28 rounded-t-lg object-contain"
          src={`${process.env.REACT_APP_BackendURLIMG}/images/${item?.productImage}`}
          alt="Apples"
        />
      </div>

      <div class="mt-5 text-left">
        <h3 class="text-lg font-semibold">{item?.productName}</h3>
        <p class="mt-2 text-md text-gray-900">
          Quantity:{' '}
          <span className="italic text-orange-500 font-extrabold">
            {item?.quantity} 
          </span>{' '}
          Kg
        </p>
        <div class="flex items-end justify-between">
          <div className="flex items-start gap-x-2">
            <span>Total Cost:</span>
            <span class="text-lg font-semibold text-orange-500">
              ${item?.totalPrice}
            </span>
          </div>
        </div>
        <div className="mt-5 flex justify-end items-center gap-x-2">
          <button
            // onClick={()=> {confirmCartItem(item?._id); navigate('/') }}
            onClick={async () => {
              const success = await confirmCartItem(item?._id);
              if (success) {
                navigate('/');
              }
            }}
            class="flex items-center justify-center border px-3 py-1 text-xs bg-green-600 text-white font-bold rounded duration-200 hover:duration-200 hover:scale-105"
          >
            Confirm
          </button>
          <button
            onClick={() => removeFromCart(item?.productId)}
            class="flex items-center justify-center border px-3 py-1 text-xs bg-red-600 text-white font-bold rounded duration-200 hover:duration-200 hover:scale-105"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCartItems;
