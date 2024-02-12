import useHttp from "../hooks/UseHttp";
import Error from "./Error";
import Product from "../models/Product";
import ProductItem from "./ProductItem";
import React, { useMemo, useState } from "react";

const requestConfig = {};

const cssSearch = "p-2 border-gray-300 rounded md:mr-4 mb-4 md:w-64 w-[90%]";

const Products: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Assuming the category is a string

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("https://fakestoreapi.com/products", requestConfig, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchText(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = useMemo(() => {
    return loadedMeals.filter((product: Product) => {
      if (
        selectedCategory &&
        selectedCategory !== "" &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (
        searchText &&
        searchText !== "" &&
        !product.title.toLowerCase().includes(searchText.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [loadedMeals, searchText, selectedCategory]);

  if (isLoading) {
    return <p className="text-center">Fetching products...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center text-stone-900">
        <input
            type="text"
            value={searchText}
            onChange={handleSearchInputChange}
            placeholder="Search by name"
            className={cssSearch}
        />
        <select
            className={cssSearch}
            value={selectedCategory}
            onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>
      <ul className="w-90 max-w-70rem list-none mx-auto my-8 p-4 grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {filteredProducts.map((product: Product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Products;
