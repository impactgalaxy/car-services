
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Service({ service }) {
    const { _id, img, title, price } = service;
    return (
        <Card className="mt-6 w-80">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src={img}
                    alt="card-image"
                    className="h-full"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                </Typography>
                <Typography color="red" className="font-black">
                    Price: ${price}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 ">
                <Link to={`/car-services-details/${_id}`} className="float-right">
                    <Button size="sm" variant="text" className="flex items-center gap-2 text-red-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}