import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cartData, setCartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getUserLoggedCart() {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setCartData(data);
        } catch (err) {
            setError("Failed to load cart data.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeCartItem(productId) {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setCartData(data);
        } catch (err) {
            setError("Failed to remove cart item.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function clearCart() {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setCartData(data);
        } catch (err) {
            setError("Failed to clear the cart.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateProductCount(productId, productCount) {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: productCount },
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
            setCartData(data);
        } catch (err) {
            setError("Failed to update product count.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserLoggedCart();
    }, []);

    const totalCartPrice = cartData?.data?.totalCartPrice || 0;
    const products = cartData?.data?.products || [];

    return (
        <div>
            <div className="mb-3 font-bold p-2 flex justify-between">
                <Link to={'/address'} className="bg-blue-400 px-3 py-2 block text-white">Check Out</Link>
                <h3>Total Cart Price: {totalCartPrice} EGP</h3>
            </div>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p className="text-red-600 text-center">{error}</p>
            ) : products.length > 0 ? (
                products.map((product) => (
                    <div className="flex shadow p-5 mb-5 bg-neutral-200 justify-between items-center" key={product.product._id}>
                        <div className="flex items-center">
                            <img src={product.product.imageCover} className="w-28" alt={product.product.title} />
                            <div className="ms-3">
                                <h2 className="font-bold">{product.product.title}</h2>
                                <p className="text-lime-600">{product.product.category.name}</p>
                                <p>{product.price} EGP</p>
                                <p>{product.product.ratingsAverage} <i className="fa-solid fa-star text-yellow-400"></i></p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => removeCartItem(product.product._id)} className="text-red-600">Remove</button>
                            <div className="mt-3">
                                <button onClick={() => updateProductCount(product.product._id, product.count - 1)} className="text-center mx-2 p-2 border border-green-400 bg-slate-50 rounded-md">-</button>
                                <span>{product.count}</span>
                                <button onClick={() => updateProductCount(product.product._id, product.count + 1)} className="mx-2 p-2 border border-green-400 bg-slate-50 rounded-md">+</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center font-bold my-12">Your Cart is Empty</h1>
            )}
            {!isLoading && products.length > 0 && (
                <button onClick={clearCart} className="block m-auto text-center mt-4 border px-5 py-2 rounded border-green-400">
                    Clear Your Cart
                </button>
            )}
        </div>
    );
}
