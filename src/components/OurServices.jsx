import axios from "axios";
import { useEffect, useState } from "react"
import { Service } from "./Service";
import { CustomSpinner } from "./CustomSpinner";

export default function OurServices() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/services")
            .then(res => setServices(res.data))
            .catch(err => console.log(err))
    }, [])

    if (services.length === 0) {
        return <CustomSpinner></CustomSpinner>
    }
    return (
        <div>
            <div className="lg:w-1/2 mx-auto space-y-5 p-4 text-center">
                <p className="font-bold text-red-600">Service</p>
                <h1 className="text-2xl md:text-4xl">Our Services Area</h1>
                <p>The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {
                    services.map((service => <Service key={service._id} service={service}></Service>))
                }

            </div>
        </div>
    )
}
