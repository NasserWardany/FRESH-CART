import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"


export default function Layout() {
    return (
        <>
            <Navbar />

            <div className="container mx-auto w-3/4 p-5 my-2 ">
                <Outlet />
            </div>
            
        </>
    )
}
