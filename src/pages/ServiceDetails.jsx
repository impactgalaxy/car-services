import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { CustomSpinner } from "../components/CustomSpinner";

export default function ServiceDetails() {
    const [serviceDetails, setServiceDetails] = useState({});
    const { img, title, description, facility, price } = serviceDetails;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:5000/services/${id}`)
            .then(res => {
                setServiceDetails(res.data)
                setLoading(false);
            }).catch(err => console.log(err))
    }, [id]);

    if (loading) {
        return <CustomSpinner></CustomSpinner>
    }

    return (

        <div className="p-4">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-3">
                    <div className="md:col-span-2 lg:col-span-3 space-y-4">
                        <img src={img} alt="" className="w-full block object-cover m-auto h-80" />
                        <h1 className="font-black text-2xl lg:text-5xl">Unique {title}</h1>
                        <p>{description}</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {
                                facility.length === 0 ? <h1>Loading...</h1> : facility.map((fact, idx) => <Card className="mt-6 w-96" key={idx}>
                                    <CardBody>
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {fact.name}
                                        </Typography>
                                        <Typography>
                                            {fact.details}
                                        </Typography>
                                    </CardBody>

                                </Card>)
                            }
                        </div>

                    </div>
                    <div className="px-4 lg:px-8">
                        <h1 className="text-2xl lg:text-4xl text-red-600">Services</h1>
                        <div>
                            <Button size="sm" variant="text" className="flex items-center gap-2 text-red-600">
                                Full Car Repair
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
                        </div>
                        <div>
                            <h1 className="font-black text-2xl">Price: ${price}</h1>
                            <Link to="/checkout" className="btn bg-[#FF3811]">Proceed to Checkout <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={4}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                />
                            </svg></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
