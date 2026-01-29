



export default function Category({ category }) {
    return (
        <>
            <div className="p-5 border gap" >
                <div className="">
                    <img src={category.image} alt="" className="h-1/2  object-cover " />
                    <h5 className=" text-green-700 text-3xl text-center ">{category.name}</h5>

                </div>
            </div>

        </>
    )
}
