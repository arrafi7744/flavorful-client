import React, { useEffect, useState } from "react";
import FilterProductsByVendors from "../../../components/GlobalComponents/FilterProductsByVendors/FilterProductsByVendors";
import FilterProductsByCategories from "../../../components/GlobalComponents/FilterProductsByCategories/FilterProductsByCategories";
import AdminAllProductsTable from "../../../components/AdminDashCompos/AdminAllProductsTableCompos/AdminAllProductsTable";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import useRequest from "../../../APIServices/useRequest";

function AdminAllProductsPage() {
  const [postRequest, getRequest] = useRequest();
  const [allVendorsList, setAllVendorsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [allProdList, setAllProdList] = useState([]);
  const [deleteState, setDeleteState] = useState([]);
  const [activateState, setActivateState] = useState([]);

  console.log(allProdList, "All Product Lis");

  const fetchAllVendorsList = async () => {
    try {
      let vendorsList = await getRequest("/shop/src/all");
      setAllVendorsList(vendorsList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategoryList = async () => {
    try {
      let categoryList = await getRequest("/categories/src");
      setCategoryList(categoryList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProductList = async () => {
    try {
      let productList = await getRequest("/products/src/all");
      setAllProdList(productList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProductList();
    fetchAllVendorsList();
    fetchAllCategoryList();
  }, [deleteState, activateState]);

  const deleteProduct = async (id) => {
    try {
      const dltProd = await getRequest(`/products/del/${id}`);
      setDeleteState(dltProd?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const activateProduct = async (id) => {
    try {
      const activateProd = await getRequest(`/products/actv/${id}`);
      setActivateState(activateProd?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectVendors = async (userId) => {
    const fetchProdListAgain = await postRequest("/products/src/all/byusrid", {
      userId: userId.target.value,
    });
    setAllProdList(fetchProdListAgain?.data?.data);
  };

  const handleSelectCategories = async (categoryCode) => {
    const fetchProdListAgain = await getRequest(
      `/products/src/category/${categoryCode.target.value}`
    );
    setAllProdList(fetchProdListAgain?.data?.data);
  };

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
      <div className="w-full bg-white rounded pt-5">
        <GlobalHeaders
          title={"List of All Products"}
          // searchFilter={"Product Name"}
        />
        {
          allProdList && allProdList.length > 0 ? <div className="mt-5 w-full grid grid-cols-2 gap-x-80">
          <FilterProductsByVendors
            allVendorsList={allVendorsList}
            handleSelectVendors={handleSelectVendors}
          />
          <FilterProductsByCategories
            categoryList={categoryList}
            handleSelectCategories={handleSelectCategories}
          />
          {/* <FilterProductsByProductTypes /> */}
        </div> : <></>
        }
      </div>

      <div className="mt-5 bg-white w-full pt-5 pb-10 rounded">
        {allProdList && allProdList.length <= 0 ? (
          <div className="w-full flex justify-center">
            <h1 className="text-2xl text-gray-300">No Products Available</h1>
          </div>
        ) : (
          <AdminAllProductsTable
            deleteProduct={deleteProduct}
            activateProduct={activateProduct}
            activateState={activateState}
            deleteState={deleteState}
            allProdList={allProdList}
          />
        )}
      </div>
    </div>
  );
}

export default AdminAllProductsPage;
