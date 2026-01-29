import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export default function Product({ product }) {
    const [isLoading, setIsLoading] = useState(false);

    async function addProductsToCart() {
        setIsLoading(true);
        try {
            let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: product._id }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setIsLoading(false);
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            setIsLoading(false);
            console.error("There was an error adding the product to the cart:", error);
            toast.error("Failed to add product to cart.");
        }
    }

    return (
        <>
            <div className="">
                <div className="p-3">
                    <NavLink to={'/productDetails/' + product._id}>
                        <img src={product.imageCover} alt="" className="w-full" />
                        <h5 className="font-light text-green-400">{product.category.name}</h5>
                        <h4 className="font-bold">{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                        <div className="flex justify-between">
                            <h6 className="">{product.price}</h6>
                            <h6><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}</h6>
                        </div>
                    </NavLink>
                    <button
                        onClick={addProductsToCart}
                        className="w-full mt-2 p-2 text-center bg-cyan-500 rounded text-white hover:bg-cyan-700"
                        disabled={isLoading}
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </>
    );
}
