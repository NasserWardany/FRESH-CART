import axios from "axios"
import { useEffect, useState } from "react";
import Category from "../Category/Category";


export default function Categories() {
    const [categories, setCategories] = useState([])

    async function getCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        console.log(data);
        setCategories(data.data);
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
            <div className="grid grid-cols-4 gap-3 ">
                {categories.map((category, index) => {
                    return <>
                        <Category category={category} key={index} />
                    </>
                })}

            </div >
        </>
    )
}
