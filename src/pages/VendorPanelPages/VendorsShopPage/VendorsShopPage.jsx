import React, { useContext, useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import { AuthContext } from "../../../providers/AuthProviders";
import useRequest from "../../../APIServices/useRequest";
import Swal from "sweetalert2";

function VendorsShopPage() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [crtState, setCrtState] = useState(false);
  const [crtedShop, setcrtedShop] = useState(false);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);

  // Fetch Categories
  const fetchCategory = async () => {
    try {
      const fetchedData = await getRequest("/categories/src");
      setCategories(fetchedData?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Handle Shop Creation
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const shopName = form.shopName.value;
      const shopDescription = form.shopDescription.value;
      const shopCategory = form.shopCategory.value;
      const address = form.address.value;
      const state = form.state.value;
      const city = form.city.value;
      const country = form.country.value;
      const postalCode = form.postalCode.value;

      const categoryData = {
        userId: user?._id,
        shopName,
        shopDescription,
        shopCategory,
        products: [],
        location: {
          address,
          state,
          city,
          country,
          postalCode,
        },
      };

      const crtShp = await postRequest("/shop/crt", categoryData);
      console.log(crtShp, "Create Shop");

      // Update shops state after successful shop creation
      setShops([...shops, crtShp?.data]);

      // Close modal and show success
      setCrtState(false);
      setcrtedShop(true);
      Swal.fire("Successfully Created");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch All Shops (Optional: If shops need to be fetched from backend)
  const fetchAllShops = async () => {
    try {
      const response = await postRequest("/shop/src/alshop/byuserid", {
        userId: user?._id,
      });
      setShops(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllShops();
  }, [crtState]);

  console.log("Shops", shops);

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 pb-10 bg-white">
      <div className="w-full bg-white rounded pt-5">
        <GlobalHeaders
          title={"Shop Management"}
          searchFilter={"Product Name"}
        />
      </div>
      <div className="mt-5 w-full flex justify-end">
        <button
          className="px-6 py-1 rounded-xl bg-orange-600 text-white font-bold"
          onClick={() => setCrtState(true)}
        >
          Create Shop
        </button>
      </div>

      {/* Table to Display Shops */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 pl-5 border-l-4 border-orange-600">
          All Shops
        </h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">Shop Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.length > 0 ? (
              shops.map((shop) => (
                <tr key={shop._id} className="border-b">
                  <td className="px-6 py-4">{shop.shopName}</td>
                  <td className="px-6 py-4">{shop.shopDescription}</td>
                  <td className="px-6 py-4">{shop.shopCategory}</td>
                  <td className="px-6 py-4">{shop?.location?.address}</td>
                  <td className="px-6 py-4">
                    {/* <button className="text-blue-600">Edit</button> | */}
                    <button className="text-red-600 ml-2">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4">
                  No shops available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating Shop */}
      {crtState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Create Shop</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="shopName"
                placeholder="Shop Name"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="shopDescription"
                placeholder="Shop Description"
                className="w-full mb-3 p-2 border rounded"
              />
              <select
                name="shopCategory"
                className="w-full mb-3 p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                className="w-full mb-3 p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCrtState(false)}
                  className="mr-3 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorsShopPage;
