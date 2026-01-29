import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick"

export default function CategoriesSlider() {

    const [categories, setCategories] = useState([])


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };
    async function getCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        setCategories(data.data);
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <h2 className="my-3 font-bold text-3xl">Shop Popular Categories</h2>
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category} className="h-36">
                        <img src={category.image} className="w-full h-full object-cover " alt="" />
                    </div>
                ))}
            </Slider>

        </>
    )
}
