import axios from "axios"
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";

export default function Home() {

    const [products, setProducts] = useState([])

    async function getProducts() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        setProducts(data.data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <CategoriesSlider />
            <div className="grid grid-cols-6">
                {products.map((product, index) => {
                    return <>
                        < Product product={product} key={index} />
                    </>
                })}
            </div >


        </>
    )
}








