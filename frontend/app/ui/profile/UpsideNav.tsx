import BackButton from "../BackButton";
import {
    ArrowLeftIcon
} from "@heroicons/react/24/outline";

interface UpsideNaveProps {
    username: String;
};

export default function UpsideNav ({ username }: UpsideNaveProps) {
    return (
        <div className="flex bg-gray-800 h-auto p-6 w-full cursor-pointer">
            <BackButton fallbackUrl="/home">
                <ArrowLeftIcon className="w-10 hover:text-white" />
            </BackButton>
            <h1 className="text-4xl font-extrabold">{ username }</h1>
        </div>
    );
};