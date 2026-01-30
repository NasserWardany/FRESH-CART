import axios from "axios";
import { useEffect, useState } from "react";
import Category from "../Category/Category";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-2">
        {categories.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
    </>
  );
}
