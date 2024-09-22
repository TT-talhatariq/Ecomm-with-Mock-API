import ProductHeader from "../../components/ProductHeader/ProductHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import EmptyScreen from "../../components/EmptyScreen/EmptyScreen";
import axios from "axios";
import ProductSkeleton from "./Skeleton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3002/products");

        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const isEmpty = filteredProducts.length === 0;

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const result = products.filter(
      (product) => product.name.includes(text) || product.desc.includes(text)
    );
    setFilteredProducts(result);
  };

  return (
    <div className="products-container">
      <ProductHeader />
      <h1>All Items</h1>

      <div className="searchFilters">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div className="all-products">
        {isLoading && <ProductSkeleton noOfCards={8} />}

        {!isLoading && isEmpty ? (
          <EmptyScreen
            heading={"No Data Found"}
            text={
              searchText === ""
                ? "No Products in the store at this moment ..."
                : "Please try reseting your filters"
            }
          />
        ) : (
          <>
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
