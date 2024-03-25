import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/server/product/getProducts");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to Daraz Shopping
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all products
        </Link>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {products && products.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Recent Products
            </h2>
            <div className="flex flex-wrap gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
