import React, { useEffect, useState } from 'react';
import useRequest from '../../../APIServices/useRequest';

function AdminDashPopularProductsTableItem({ prod }) {
  const [postRequest, getRequest] = useRequest();
  const [stock, setStocks] = useState(0);

  const fetchStock = async () => {
    try {
      const stockData = await getRequest(`/stocks/src/${prod?._id}`);
      setStocks(stockData?.data?.data?.stockQTY);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <tr>
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex items-center">
            <img
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${prod?.productThumb}`}
              alt="product_image"
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{prod.productName}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-left pl-10 text-gray-500">
        {stock}
      </td>
      {/* <td className="whitespace-nowrap py-5 text-sm text-left pl-5 text-gray-500">
        <div className="mt-1 text-gray-500">{prod.shopCategory}</div>
      </td> */}
      <td className="whitespace-nowrap pl-5 pr-3 py-5 text-sm text-gray-500">
        {prod.buyingPrice} $
      </td>
      <td className="whitespace-nowrap pl-5 pr-3 py-5 text-sm text-gray-500">
        {prod.sellingPrice} $
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Active
        </span>
      </td>
      {/* <td className="relative whitespace-nowrap py-5 pl-10 text-center text-sm font-medium sm:pr-0">
                      <p className="text-indigo-600 hover:text-indigo-900">Edit<span className="sr-only">, {prod.name}</span></p>
                    </td> */}
    </tr>
  );
}

export default AdminDashPopularProductsTableItem;
