import React from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { PencilIcon } from "@heroicons/react/24/solid";

import {
    Card,
    Typography,
    CardBody,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function MyOrders() {
    const { user, loading } = React.useContext(AuthContext);

    const TABLE_HEAD = ["Name", "Amount", "Email", "Status", "Account", ""];

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/orders?email=${user?.email}`, { credentials: "include" })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        },
    })
    const TABLE_ROWS = data || [];

    if (isLoading) {
        return <h1 className='lg:text-5xl text-green-600 text-center'>Loading...</h1>
    }
    if (data.length === 0) {
        return <div className='h-28 flex items-center justify-center text-xl lg:text-3xl'>No Data Found</div>
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:5000/orders/${id}`)
                    if (res.data.deletedCount > 0) {

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            showConfirmButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                refetch();
                            }
                        })

                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Something wrong!",
                        text: "Not deleted please try later"
                    })
                }

            }
        });

    }
    return (
        <Card className="h-full w-full">



            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, idx) => (
                                <th
                                    key={idx}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            (
                                {
                                    email, firstName, lastName, _id
                                },
                                index,
                            ) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src="{img}"
                                                    alt={firstName}
                                                    size="md"
                                                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                                />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {firstName}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                1500
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                                                    <Avatar
                                                        src=""
                                                        size="sm"
                                                        alt={firstName}
                                                        variant="square"
                                                        className="h-full w-full object-contain p-1"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal capitalize"
                                                    >
                                                        {email}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {lastName}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                        <td className={`${classes} cursor-pointer`} onClick={() => handleDelete(_id)}>
                                            <Tooltip content="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </Tooltip>


                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
