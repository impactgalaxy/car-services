import { Button, Input, Textarea } from '@material-tailwind/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

export default function Checkout() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user, toast } = React.useContext(AuthContext);

    const handleOrder = async (data) => {
        if (!data.email) {
            toast.error("You need your email set first")
            return;
        }
        data.uid = user?.uid;
        console.log(data);
        try {
            const response = await axios.post("http://localhost:5000/orders", data)
            if (response.data.insertedId) {
                toast.success("Order Confirm")
                reset()
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className='p-4 lg:p-8 bg-[#F3F3F3]'>
            <form onSubmit={handleSubmit(handleOrder)}>
                <h1 className='text-xl lg:text-3xl text-[#444444] text-center my-10'>Order Checkout</h1>
                <div className="flex lg:w-1/2 flex-col gap-8 mx-auto">

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <Input variant="standard" {...register("firstName", { required: true })} label="First Name" placeholder="Name" />
                        {errors.firstName && <span className='label-text-alt text-red-800'>Please enter your first name</span>}
                        <Input variant="standard" {...register("lastName", { required: true })} label="Last Name" placeholder="Name" />
                        {errors.lastName && <span className='label-text-alt text-red-800'>Please provide your last name</span>}
                        <Input variant="standard" {...register("phoneNumber", { required: true })} label="Your phone number" placeholder="Phone number" />
                        {errors.phoneNumber && <span className='label-text-alt text-red-800'>Please enter your phone number</span>}
                        <Input variant="standard" readOnly defaultValue={user?.email} {...register("email")} label="Your email" placeholder="Email" />
                        {errors.email && <span className='label-text-alt text-red-800'>Please enter your email</span>}
                    </div>
                    <div className="flex w-full flex-col gap-6">
                        <Textarea size="md" label="Message" {...register("message")} />

                    </div>

                    <Button size='lg' type="submit" className="bg-[#FF3811]">Order Confirm</Button>
                    <div className="text-center space-y-5 py-3">



                    </div>


                </div>
            </form>

        </div>
    )
}
