import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../layout";
import { productByCategory } from "../../admin/products/FetchApi";

import { isWishReq, unWishReq, isWish, offerPrice } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Submenu = ({ category, showFilter, setShowFilter }) => {
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section style={{paddingTop:"55px"}} className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center">
          <div className="text-sm flex space-x-3">
            <span
              className="hover:text-yellow-700 cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              Shop
            </span>
            <span className="text-yellow-700 cursor-default">{category}</span>
          </div>
          <div
            className="hover:text-yellow-700 cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          >

          {/* <span className="text-md md:text-lg">Filter */}
            <span>
              {/* <svg
                className="w-6 h-6 hover:w-8 hover:h-8 text-gray-700 text-yellow-700 hover:text-yellow-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg> */}
            </span>
            {/* </span> */}

            {/* <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg> */}
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

const AllProduct = ({ products,  setProducts}) => {

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  ); // Wishlist State Control
  
  const history = useHistory();
  const category =
    products && products.length > 0 ? products[0].pCategory.cName : "";

  const [showFilter, setShowFilter] = useState(false);
  const [display, setDisplay] = useState(products);

  useEffect(() => {
    setDisplay(products);
  }, [products]);

  return (
    <Fragment>
      <Submenu category={category} showFilter={showFilter} setShowFilter={setShowFilter}/>

      {/* Filter */}
      <FilterList showFilter={showFilter} setShowFilter={setShowFilter} products={products} setProducts={setDisplay}/>
      {/* Filter End*/}

      <section className="m-4 md:mx-8 md:my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* {products && products.length > 0 ? ( */}
        {/* {display && display.length > 0 ? ( */}
        {display ? (
          // products.map((item, index) => {
          display.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="relative col-span-1 m-2">
                  <img
                    onClick={(e) => history.push(`/products/${item._id}`)}
                    className="w-full object-cover object-center cursor-pointer"
                    src={item.pImages[0]}
                    alt=""
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-gray-600 font-light truncate">
                      {item.pName}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>
                        <svg
                          className="w-4 h-4 fill-current text-yellow-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">
                        {item.pRatings ? item.pRatings.length : 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                  { item.pOffer == 0 ?
                    <span>₹{item.pPrice}</span>
                    :
                    <>
                      <span className='strikeThrough'>₹{item.pPrice}</span>
                      {/* <span>&nbsp; ₹{item.pPrice - (item.pPrice * item.pOffer/100)}</span> */}
                      <span>&nbsp; ₹{offerPrice(item.pPrice, item.pOffer)}</span>
                    </>
                  }
                  </div>
                  <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                    {/* <svg
                      className="w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg> */}
                    <span>
                      <svg
                        onClick={(e) => isWishReq(e, item._id, setWlist)}
                        className={`${
                          isWish(item._id, wList) && "hidden"
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <svg
                        onClick={(e) => unWishReq(e, item._id, setWlist)}
                        className={`${
                          !isWish(item._id, wList) && "hidden"
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
            {/* No product found */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
          <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
        </div>
          </div>
        )}
      </section>
    </Fragment>
  );
};

const FilterList = ({ showFilter, setShowFilter, products, setProducts }) => {
  const [range, setRange] = useState(0);

  const MAX = 5000;

  useEffect(() => {
    setRange(MAX);
  }, []);

  const rangeHandle = (e) => {
    setRange(e.target.value);

    console.log('products', products);

    const filtered = products.filter(product => (
      product.pPrice <= range
    ));
    setProducts(filtered);
  };

  const closeFilterBar = () => {
    setRange(MAX);
    setProducts(products);
    setShowFilter(false);
  };

  return (
    <section className="mx-4 mt-2 md:mx-12">
    <div className={`${showFilter ? "" : "hidden"} my-4`}>
      <hr />
      <div className="w-full flex flex-col">
        <div className="font-medium py-2">Filter by price</div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-2  w-2/3 lg:w-2/4">
            <label htmlFor="points" className="text-sm">
              Price (between 0 and ₹{MAX}):{" "}
              <span className="font-semibold text-yellow-700">₹{range}.00</span>{" "}
            </label>
            <input
              value={range}
              className="slider"
              type="range"
              id="points"
              min="0"
              max={MAX}
              step="10"
              onChange={(e) => rangeHandle(e)}
            />
          </div>
          <div onClick={(e) => closeFilterBar()} className="cursor-pointer">
            <svg
              className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

const PageComponent = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <AllProduct products={products} setProducts={setProducts}/>
    </Fragment>
  );
};

const ProductByCategory = (props) => {
  return (
    <Fragment>
      <Layout children={<PageComponent />} />
    </Fragment>
  );
};

export default ProductByCategory;
