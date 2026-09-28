import NavLinks from "./NavLinks";

export default function SideNav() {
    return (
        <div className='hidden md:flex w-32 md:w-64 h-screen bg-gray-800 text-white flex flex-col p-4 space-y-4 fixed top-0 left-0 right-0'>
            {/* MAKES SPACE BETWEEN THE TOP MARGIN AND THE NAV LINKS, A LOGO SHOULD BE HERE */}
            <div className="h-32 w-full rounded-md block"></div>

            {/* NAV LINKS */}
            <NavLinks />

            {/* MAKES SPACE BETWEEN COMPONENTS */}
            <div className="h-auto w-full grow rounded-md block border-t border-gray-700"></div>

            {/* PROFILE */}
            <div className='pt-4 border-t border-gray-700 text-sm text-gray-400 px-2'>
                <p>profile</p>
            </div>
        </div>
    );
};