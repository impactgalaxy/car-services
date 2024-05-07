import person from "../assets/images/about_us/person.jpg"
import parts from "../assets/images/about_us/parts.jpg"

export default function AboutUs() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8 my-10">
            <div className="relative p-5">
                <img src={person} alt="" className="block w-full object-cover h-[90%]" />
                <img src={parts} alt="" className="block w-28 h-28 md:w-80 md:h-80 border-[12px] border-white object-cover absolute -bottom-4 -right-4 rounded-lg" />
            </div>
            <div className="space-y-4 p-5 ">
                <p className="font-bold text-red-600">About Us</p>
                <h1 className="text-2xl lg:text-5xl">We are qualified & of experience in this field</h1>
                <p className="text-[#737373]">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.

                </p>
                <p className="text-[#737373]">The majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable.
                </p>
                <button className="btn bg-[#FF3811] text-white">Get More Info</button>
            </div>
        </div>
    )
}
