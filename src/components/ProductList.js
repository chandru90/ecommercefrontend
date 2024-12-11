import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Slider from "react-slick"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState(""); 
  const productsPerPage = 14;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, []);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPrice =
      (minPrice === "" || product.price >= minPrice) &&
      (maxPrice === "" || product.price <= maxPrice);

    return matchesSearch && matchesPrice;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    setCurrentPage(1); 
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    setCurrentPage(1); 
  };

  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 1,
    centerMode: true, 
    focusOnSelect: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 lg:col-span-3 space-y-4">
          
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>

            <div className="space-y-3">
              
              <div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md"
                />
              </div>

              
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="Min Price"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="Max Price"
                    className="w-full p-2 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

  
        <div className="col-span-1 lg:col-span-9">
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <Slider {...carouselSettings}>
              {filteredProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="carousel-item text-center">
                 
                  <img
                    src={product.image}
                    alt={product.title}
                    className="mx-auto object-contain h-64 w-full rounded-md" 
                  />
                  <h3 className="text-sm font-semibold mt-3">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-sm">${product.price}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {currentProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>

      
      <div className="flex justify-center items-center mt-4 space-x-3">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-3 py-1 text-sm rounded-md ${
              page + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
          >
            {page + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
