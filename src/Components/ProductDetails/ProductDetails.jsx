import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    async function getProductDetails(productId) {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + productId);
            setProductDetails(data.data);
        } catch (error) {
            console.error("There was an error fetching the product details:", error);
            toast.error("Failed to fetch product details.");
        }
    }

    async function addProductsToCart() {
        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId: id },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(data);
            toast.success(data.message || "Product added to cart successfully!");
        } catch (error) {
            console.error("There was an error adding the product to the cart:", error);
            if (error.response) {
                toast.error(error.response.data.message || "Failed to add product to cart.");
            } else {
                toast.error("Failed to add product to cart. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    return (
        <>
            {Object.keys(productDetails).length > 0 ? (
                <div className="p-5 container">
                    <div className="flex h-full flex-row">
                        <div>
                            <img src={productDetails.imageCover} alt={productDetails.title} className="w-3/4" />
                        </div>
                        <div className="info pt-12 leading-10 h-full">
                            <h1 className="font-bold text-3xl">{productDetails.title}</h1>
                            <h4>{productDetails.description}</h4>
                            <div className="flex my-5">
                                <h5 className="me-32">{productDetails.price} EGP</h5>
                                <span className="ms-32">
                                    <i className="fa-solid fa-star text-2xl text-yellow-400"></i> <span>{productDetails.ratingsAverage}</span>
                                </span>
                            </div>
                            <button
                                onClick={addProductsToCart}
                                className="bg-lime-400 hover:bg-lime-700 text-white px-32 rounded"
                                disabled={isLoading}
                            >
                                {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}
                            </button>
                            <i className="fa-solid fa-heart text-green-900 text-3xl ms-2"></i>
                        </div>
                    </div>
                </div>
            ) : (
                <i className="fas fa-spinner fa-spin"></i>
            )}
        </>
    );
}
