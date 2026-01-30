import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <CategoriesSlider />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-2">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
