import React, { useContext, useEffect, useState } from "react";
import GlobalHeaders from "../../../components/GlobalComponents/GlobalHeaders/GlobalHeaders";
import useRequest from "../../../APIServices/useRequest";
import VendorsAllProductTable from "../../../components/VendorsCompos/VendorsAllProductTable/VendorsAllProductTable";
import { AuthContext } from "../../../providers/AuthProviders";
import VendorEditProductModal from "../../../components/VendorsCompos/VendorEditProductModal/VendorEditProductModal";
import Swal from "sweetalert2";

function VendorAllProducts() {
  const { user } = useContext(AuthContext);
  const [postRequest, getRequest] = useRequest();
  const [allProdList, setAllProdList] = useState([]);
  const [deleteState, setDeleteState] = useState([]);
  const [activateState, setActivateState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uptState, setUptState] = useState(false);

  const handleSave = async (updatedProduct, prodId) => {
    console.log(updatedProduct, "Updated Product")
    const updateProdInfo = await postRequest(
      `/products/upt/${prodId}`,
      updatedProduct
    );

    if (updateProdInfo?.data?.error === false) {
      Swal.fire("Product Info Updated Successfully");
      setUptState(!uptState);
    }
  };

  const fetchAllProducts = async () => {
    try {
      let prodList = await postRequest("/products/src/all/byusrid", {
        userId: user?._id,
      });
      setAllProdList(prodList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [deleteState, activateState, uptState]);

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

  const handleRowClick = (product) => {
    console.log("Product Selected", product);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full rounded-lg shadow-md px-10 bg-white">
      <div className="w-full bg-white rounded pt-5">
        <GlobalHeaders title={"Products"} searchFilter={"Product Name"} />
      </div>

      <div className="bg-white w-full pb-10 rounded">
        {allProdList === null ? (
          <div className="w-full flex justify-center">
            <h1 className="text-2xl text-gray-300">No Products Available</h1>
          </div>
        ) : (
          <VendorsAllProductTable
            deleteProduct={deleteProduct}
            activateProduct={activateProduct}
            activateState={activateState}
            deleteState={deleteState}
            allProdList={allProdList}
            handleRowClick={handleRowClick}
          />
        )}
      </div>

      <VendorEditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSave}
      />
    </div>
  );
}

export default VendorAllProducts;
