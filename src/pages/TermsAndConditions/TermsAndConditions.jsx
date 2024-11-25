import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mt-10 md:mt-0 mx-auto p-5 md:p-10 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">
        Terms and Conditions
      </h1>
      <div className="text-center md:text-left">
        <p className="text-lg mb-6 text-gray-700">
          Welcome to Flavourfull Fushion! These terms and conditions outline the
          rules and regulations for the use of our website and the purchase of
          products.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4 text-gray-600">
          By accessing this website, you accept these terms and conditions in
          full. If you disagree with any part of these terms, you must not use
          our website.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          2. Changes to Terms
        </h2>
        <p className="mb-4 text-gray-600">
          We may revise these terms from time to time. The revised terms will
          apply to the use of our website from the date of publication. Please
          check this page regularly to ensure you are familiar with the current
          version.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">3. User Accounts</h2>
        <p className="mb-4 text-gray-600">
          To purchase products on our website, you may be required to create an
          account. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          4. Product Information
        </h2>
        <p className="mb-4 text-gray-600">
          We strive to provide accurate product descriptions and pricing
          information. However, we do not warrant that product descriptions or
          other content on this site are accurate, complete, reliable, or
          error-free.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          5. Orders and Payment
        </h2>
        <p className="mb-4 text-gray-600">
          By placing an order, you are making an offer to purchase a product.
          All orders are subject to acceptance by us. We reserve the right to
          refuse or cancel any order for any reason.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          6. Shipping and Delivery
        </h2>
        <p className="mb-4 text-gray-600">
          We aim to deliver products within the estimated delivery times.
          However, we are not liable for any delays caused by events outside our
          control.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          7. Returns and Refunds
        </h2>
        <p className="mb-4 text-gray-600">
          If you are not satisfied with your purchase, please refer to our
          Return Policy for information on how to return products.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          8. Limitation of Liability
        </h2>
        <p className="mb-4 text-gray-600">
          To the fullest extent permitted by law, we shall not be liable for any
          indirect, incidental, special, or consequential damages arising out of
          or in connection with your use of our website or products.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">9. Governing Law</h2>
        <p className="mb-4 text-gray-600">
          These terms and conditions shall be governed by and construed in
          accordance with the laws of the jurisdiction in which we operate.
        </p>

        <h2 className="text-3xl font-semibold mt-6 mb-4">
          10. Contact Information
        </h2>
        <p className="mb-4 text-gray-600">
          If you have any questions about these terms and conditions, please
          contact us at{" "}
          <a
            href="mailto:support@flavourfullfushion.com"
            className="text-blue-600 underline"
          >
            support@flavourfullfushion.com
          </a>
          .
        </p>

        <p className="mt-6 text-gray-500 text-center">
          Last updated: [01/12/2024]
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
