import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import { fetchProducts } from "../services/mockAPI";
import Filter from "../components/Filter/Filter";
import ErrorBoundary from "../highOrderedComponents/ErrorBoundary";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();

      setProducts(products);
    };

    getProducts();
  }, []);

  const handleFilterInputChange = (ev) => {
    const filterRequest = ev.target.value;
    setFilter(filterRequest);
  };

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <Filter handleFilterInputChange={handleFilterInputChange} />
      <ErrorBoundary fallback={<h1>Oops. Something went wrong</h1>}>
        <ProductsList products={filteredProducts} />
      </ErrorBoundary>
    </>
  );
};

export default Products;
