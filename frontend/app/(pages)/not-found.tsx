import {
    ExclamationTriangleIcon,
    ArrowLeftIcon
} from "@heroicons/react/24/outline";
import BackButton from "@/app/ui/BackButton";

export default function Page() {
    return (
        <main className="rounded bg-gray-950 p-10 justify-center">
            <div className="flex">
                <ExclamationTriangleIcon className="w-16 text-indigo-100"/>
                <h1 className="extrabold text-8xl text-indigo-100">404</h1>
            </div>
            <h3 className="text-3xl text-indigo-100">Cannot find what you're looking for?</h3>

            <BackButton fallbackUrl="/home">
                <div className="flex text-indigo-100 p-8 bg-gray-800 rounded m-4 hover:bg-gray-700 hover:cursor-pointer">
                    <ArrowLeftIcon className="w-10"/>
                    <p className="text-3xl">Go back to safety</p>
                </div>
            </BackButton>
        </main>
    );
};