import React, { useEffect, useState } from 'react';
import useRequest from '../../../APIServices/useRequest';
import { IoTrashBinOutline } from 'react-icons/io5';
import { FaUndo } from 'react-icons/fa';
import Swal from 'sweetalert2';

function VendorSingleProductTableItem({
  deleteProduct,
  activateProduct,
  activateState,
  deleteState,
  product,
  handleRowClick,
  index,
}) {
  const [, getRequest] = useRequest();
  const [stockCount, setStockCount] = useState(0);
  const [category, setCategory] = useState('');

  // const handleRowClick = () => {
  //   onRowClick(product);
  // };

  const fetchIndividualProductStock = async () => {
    let stockCount = await getRequest(`/stocks/src/${product?._id}`);
    setStockCount(stockCount?.data?.data?.stockQTY);
  };

  const fetchCategoryOfIndividualProduct = async () => {
    let categoryFetch = await getRequest(
      `/categories/src/${product?.categoryId}`
    );
    setCategory(categoryFetch?.data?.data?.categoryName);
  };

  useEffect(() => {
    fetchCategoryOfIndividualProduct();
    fetchIndividualProductStock();
  }, []);

  const handleDeleteProd = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#db5800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product?._id);
        if (deleteState?.data?.error === false) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your product has been deleted.',
            icon: 'success',
          });
        }
      }
    });
  };

  const handleActivateProd = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#db5800',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Activate it!',
    }).then((result) => {
      if (result.isConfirmed) {
        activateProduct(product?._id);
        if (activateState?.data?.error === false) {
          Swal.fire({
            title: 'Activated!',
            text: 'Your Product has been Activated.',
            icon: 'success',
          });
        }
      }
    });
  };

  return (
    <tr
      onClick={() => handleRowClick(product)}
      className="hover:cursor-pointer"
      key={`${product?._id}`}
    >
      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="h-11 w-11 flex-shrink-0">
            <img
              className="h-14 w-14 rounded-full object-cover"
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${product?.productThumb}`}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {product?.productName}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap py-5 text-sm text-center pr-10 text-gray-500">
        {stockCount}
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {category}
      </td>
      {/* <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div className="flex items-center">
            <div className="">
              <div className="font-medium text-gray-900">
                {product.shopName}
              </div>
            </div>
          </div>
        </td> */}
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {product?.buyingPrice} Tk
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {product?.sellingPrice} Tk
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        {product && product.isActive === true && product.isDeleted === false ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
            Deleted
          </span>
        )}
      </td>
      <td className="relative whitespace-nowrap py-5 pl-10 text-center text-xl font-medium sm:pr-0">
        {product &&
        product?.isActive === true &&
        product?.isDeleted === false ? (
          <IoTrashBinOutline
            onClick={handleDeleteProd}
            className="text-red-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
          />
        ) : (
          <FaUndo
            onClick={handleActivateProd}
            className="text-green-600 duration-400 hover:duration-400 hover:scale-110 hover:cursor-pointer"
          />
        )}
      </td>
    </tr>
  );
}

export default VendorSingleProductTableItem;
