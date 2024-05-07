import errorPic from "../assets/not-found-page.svg";
export default function ErrorPage() {
    return (
        <div className="h-screen flex items-center justify-center">
            <img src={errorPic} alt="" className="w-full h-full block object-cover" />
        </div>
    )
}
