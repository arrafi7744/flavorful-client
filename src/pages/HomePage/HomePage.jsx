import React, { useEffect, useState } from "react";
import Banner from "../../components/HomePageCompos/Banner/Banner";
import CategorySelector from "../../components/HomePageCompos/CategorySelector/CategorySelector";
import HomePageAllProducts from "../../components/HomePageCompos/HomePageAllProducts/HomePageAllProducts";
import useRequest from "../../APIServices/useRequest";

function HomePage() {
  const [postRequest, getRequest] = useRequest();
  const [allProds, setAllProds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  

  const fetchAllProds = async () => {
    try {
      const prodList = await getRequest("/products/src");
      setAllProds(prodList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProds();
  }, []);


  const fetchProductByCategory = async (categoryCode) => {
    try {
      const productDetails = await getRequest(
        `/products/src/category/${categoryCode}`
      );
      setSelectedCategory(categoryCode);
      setAllProds(productDetails?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Banner />
      <CategorySelector fetchProductByCategory={fetchProductByCategory} fetchAllProds={fetchAllProds}/>
      <HomePageAllProducts allProds={allProds} />
    </div>
  );
}

export default HomePage;
