import { Outlet } from "react-router-dom";
import { StickyNavbar } from "../components/StickyNavbar";
import { Footer } from "../components/Footer";

export default function Layout() {
    return (
        <div>
            <StickyNavbar></StickyNavbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    )
}
