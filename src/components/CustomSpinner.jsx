import { Spinner } from "@material-tailwind/react";

export function CustomSpinner() {

    return (
        <div className="h-40 flex items-center justify-center">
            <Spinner className={`h-10 w-10  text-gray-900/50`} />
        </div>);
}