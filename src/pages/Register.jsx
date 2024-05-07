import loginPic from "../assets/images/login/login.svg";
import { Button, Input } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, toast } = useContext(AuthContext);


    const handleRegister = async (data) => {
        const { email, password } = data;
        try {
            const response = await createUser(email, password);
            if (response.user.uid) {
                toast.success("User created successfully")

            }
        } catch (error) {
            let msg = "";
            switch (error.code) {
                case "auth/email-already-in-use":
                    msg = "This email already in use";
                    break;
                case "auth/weak-password":
                    msg = "Password must need 6 character length";
                    break;
                case "auth/network-request-failed":
                    msg = "Network failed";
                    break;

            }
            toast.error(`Sorry! ${msg}`)
        }


    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 md:p-8 lg:p-10">
            <div className=''>
                <img src={loginPic} alt="" />
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <h1 className='text-xl lg:text-3xl text-[#444444] text-center my-10'>Register</h1>
                <div className="flex lg:w-1/2 flex-col gap-8 mx-auto">

                    <Input variant="standard" {...register("name")} label="Enter Name" placeholder="Name" />
                    <Input variant="standard" {...register("email", { required: true })} label="Enter Email" placeholder="Email" />
                    {errors?.email && <span className='label-text-alt text-red-800'>Please provide your email</span>}
                    <Input variant="standard" {...register("password", { required: true })} label="Confirm Password" placeholder="Password" />
                    {errors?.password && <span className='label-text-alt text-red-800'>Please provide your password</span>}
                    <Button size='lg' type="submit" className="bg-[#FF3811]">Register</Button>
                    <div className="text-center space-y-5 py-3">
                        <h1>Or Sign in with</h1>
                        <div className="flex items-center gap-5 justify-center">
                            <FaFacebook className="hover:bg-[#F5F5F8] rounded-full p-2 text-4xl cursor-pointer"></FaFacebook>
                            <FcGoogle className="hover:bg-[#F5F5F8] rounded-full p-2 text-4xl cursor-pointer"></FcGoogle>
                            <FaGithub className="hover:bg-[#F5F5F8] rounded-full p-2 text-4xl cursor-pointer"></FaGithub>

                        </div>
                        <p>Already have an account? Please <Link to="/login" className="font-black">Log in</Link></p>
                    </div>


                </div>
            </form>
        </div>
    )
}
