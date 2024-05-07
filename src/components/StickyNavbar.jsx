import React from "react";
import logo from "../assets/logo.svg";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


export function StickyNavbar() {
    const { user, userLogout, toast } = React.useContext(AuthContext);
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    const handleLogout = async () => {
        try {
            await userLogout();
            toast.success("Logout successful")

        } catch (error) {
            toast.error("Please try again")
        }


    }

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/">Home</Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/about">About</Link>

            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/checkout">Checkout</Link>

            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/my_orders">My Orders</Link>
            </Typography>
        </ul>
    );

    return (
        <div className="w-full">
            <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="li"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        <Link to="/"><img src={logo} alt="Logo of car doctor" className="h-14" /></Link>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        {
                            user ? <Button
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button> :
                                <div className="flex items-center gap-x-1">
                                    <Button
                                        variant="text"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </div>
                        }
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    {
                        user === null && <div className="flex items-center gap-x-1">
                            <Button fullWidth variant="text" size="sm" className="">
                                <Link to="/login">Log In</Link>
                            </Button>
                            <Button fullWidth variant="gradient" size="sm" className="">
                                <Link to="/register">Register</Link>
                            </Button>
                        </div>
                    }
                </Collapse>
            </Navbar>

        </div>
    );
}