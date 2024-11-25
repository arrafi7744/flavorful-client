import React, { useEffect, useState } from 'react';
import useRequest from '../../../APIServices/useRequest';

function VendorEditProductModal({ isOpen, onClose, product, onSave }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [postRequest, getRequest] = useRequest();
  const [stocks, setStocks] = useState([]);

  const fetchStockValues = async () => {
    try {
      const fetchData = await getRequest(`/stocks/src/${product?._id}`);
      setStocks(fetchData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product?._id) {
      fetchStockValues();
    }
  }, [product?._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Compare the edited product with the original product to find changes
    const changedFields = Object.keys(editedProduct).reduce((changes, key) => {
      if (editedProduct[key] !== product[key]) {
        changes[key] = editedProduct[key];
      }
      return changes;
    }, {});
    onSave(changedFields, product?._id);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[90%] max-w-2xl rounded-lg p-5">
        <h2 className="text-xl font-bold mb-4">
          Edit Information of {product?.productName}
        </h2>
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center">
            <img
              className="h-20 w-20 rounded-full object-contain"
              src={`${process.env.REACT_APP_BackendURLIMG}/images/${product?.productThumb}`}
              alt=""
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              defaultValue={product.productName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stockCount"
              defaultValue={stocks?.stockQTY}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Buying Price</label>
            <input
              type="number"
              name="buyingPrice"
              defaultValue={product.buyingPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              defaultValue={product.sellingPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="productDescription"
              defaultValue={product?.productDescription}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorEditProductModal;
