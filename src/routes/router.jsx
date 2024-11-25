import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";
import HomePage from "../pages/HomePage/HomePage";
import SignUpPage from "../pages/SignupPage/SignUpPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import OffersPage from "../pages/OffersPage/OffersPage";
import ShopsPage from "../pages/ShopsPage/ShopsPage";
import UserDashLayouts from "../layouts/UserDashLayouts/UserDashLayouts";
import AdminDashLayouts from "../layouts/AdminDashLayouts/AdminDashLayouts";
import UserDashHomePage from "../pages/UserPanelPages/UserDashHomePage/UserDashHomePage";
import AdminDashHomePage from "../pages/AdminPanelPages/AdminDashHomePage/AdminDashHomePage";
import AdminAllProductsPage from "../pages/AdminPanelPages/AdminAllProductsPage/AdminAllProductsPage";
import AdminAllCategoriesPage from "../pages/AdminPanelPages/AdminAllCategoriesPage/AdminAllCategoriesPage";
import AdminAllPendingOrdersPage from "../pages/AdminPanelPages/AdminAllPendingOrdersPage/AdminAllPendingOrdersPage";
import AdminAllCancelledOrdersPage from "../pages/AdminPanelPages/AdminAllCancelledOrdersPage/AdminAllCancelledOrdersPage";
import AdminAllDeliveredOrdersPage from "../pages/AdminPanelPages/ADminAllDeliveredOrdersPage/AdminAllDeliveredOrdersPage";
import AdminFAQ from "../pages/AdminPanelPages/AdminFAQ/AdminFAQ";
import AdminAllReviews from "../pages/AdminPanelPages/AdminAllReviews/AdminAllReviews";
import AdminAllUsersPage from "../pages/AdminPanelPages/AdminAllUsers/AdminAllUsersPage";
import AdminAllVendorsPage from "../pages/AdminPanelPages/AdminAllVendorsPage/AdminAllVendorsPage";
import AdminAllAdminPage from "../pages/AdminPanelPages/AdminAllAdminPages/AdminAllAdminPage";
import VendorDashPage from "../pages/VendorPanelPages/VendorDashPage/VendorDashPage";
import VendorDashLayout from "../layouts/VendorDashLayout/VendorDashLayout";
import VendorPendingOrders from "../pages/VendorPanelPages/VendorPendingOrders/VendorPendingOrders";
import VendorConfirmedOrders from "../pages/VendorPanelPages/VendorConfirmedOrders/VendorConfirmedOrders";
import VendorDeliveredOrders from "../pages/VendorPanelPages/VendorDeliveredOrders/VendorDeliveredOrders";
import VendorCancelledOrders from "../pages/VendorPanelPages/VendorCancelledOrders/VendorCancelledOrders";
import VendorAddAProduct from "../pages/VendorPanelPages/VendorAddAProduct/VendorAddAProduct";
import VendorAllProducts from "../pages/VendorPanelPages/VendorAllProducts/VendorAllProducts";
import UserDashAllOrders from "../pages/UserPanelPages/UserDashAllOrders/UserDashAllOrders";
import UserDashAllCarts from "../pages/UserPanelPages/UserDashAllCarts/UserDashAllCarts";
import UserDashAllReviews from "../pages/UserPanelPages/UserDashAllReviews/UserDashAllReviews";
import UserCancelledOrders from "../pages/UserPanelPages/UserCancelledOrders/UserCancelledOrders";
import UserDeliveredOrders from "../pages/UserPanelPages/UserDeliveredOrders/UserDeliveredOrders";
import UserPendingOrders from "../pages/UserPanelPages/UserPendingOrders/UserPendingOrders";
import AdminAllConfirmedOrdersPage from "../pages/AdminPanelPages/AdminAllConfirmedOrdersPage/AdminAllConfirmedOrdersPage";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import FAQs from "../pages/FAQs/FAQs";
import Manufacturers from "../pages/Manufacturers/Manufacturers";
import SingleProductPage from "../pages/HomePage/SingleProductPage";
import CreateUserInfoPage from "../pages/LoginPage/CrtUserInfo";
import VendorsShopPage from "../pages/VendorPanelPages/VendorsShopPage/VendorsShopPage";
import PrivateRoute from "./PrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import VendorPrivateRoute from "./VendorPrivateRoute";
import BuyerPrivateRoute from "./BuyerPrivateRoute";
import AminRecommendations from "../pages/AdminPanelPages/AdminRecommendations/AminRecommendations";
import UserRecieptsPage from "../pages/UserPanelPages/UserReceiptsPage/UserRecieptsPage";
import VendorProfilePage from "../pages/VendorPanelPages/VendorProfilePage/VendorProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/offers",
        element: <OffersPage />,
      },
      {
        path: "/shops",
        element: <ShopsPage />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
      {
        path: "/faq",
        element: <FAQs />,
      },
      {
        path: "/manufacturers",
        element: <Manufacturers />,
      },
      {
        path: "/singleproductpage/:id",
        element: <SingleProductPage />,
      },
    ],
  },
  {
    path: "/",
    element: <UserDashLayouts />,
    children: [
      {
        path: "/userdash",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserDashHomePage />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/userallorders",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserDashAllOrders />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/usercarts",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserDashAllCarts />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/userallreviews",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserDashAllReviews />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/usercancelledorders",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserCancelledOrders />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/userdeliveredorders",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserDeliveredOrders />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/userpendingorders",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserPendingOrders />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
      {
        path: "/userallreceipts",
        element: (
          <BuyerPrivateRoute>
            <PrivateRoute>
              <UserRecieptsPage />
            </PrivateRoute>
          </BuyerPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <VendorDashLayout />,
    children: [
      {
        path: "/vendorprofile",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorProfilePage />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendordash",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorDashPage />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendorpendingorders",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorPendingOrders />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendorconfirmorders",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorConfirmedOrders />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendordeliveredorders",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorDeliveredOrders />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendorcancelledorders",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorCancelledOrders />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendoraddproduct",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorAddAProduct />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendorproducts",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorAllProducts />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
      {
        path: "/vendorshops",
        element: (
          <VendorPrivateRoute>
            <PrivateRoute>
              <VendorsShopPage />
            </PrivateRoute>
          </VendorPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AdminDashLayouts />,
    children: [
      {
        path: "/admindash",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminDashHomePage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allproducts",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllProductsPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allcategories",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllCategoriesPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "recommendations",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AminRecommendations />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allpendingorders",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllPendingOrdersPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allcancelledorders",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllCancelledOrdersPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allconfirmedorders",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllConfirmedOrdersPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "alldeliveredorders",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllDeliveredOrdersPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allfaq",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminFAQ />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allreviews",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllReviews />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllUsersPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "allvendors",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllVendorsPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "alladmins",
        element: (
          <AdminPrivateRoute>
            <PrivateRoute>
              <AdminAllAdminPage />
            </PrivateRoute>
          </AdminPrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/user-info-crt",
    element: <CreateUserInfoPage />,
  },
]);

export default router;
