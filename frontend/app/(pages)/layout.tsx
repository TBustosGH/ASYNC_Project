import SideNav from "../ui/navbar/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex'>
            <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
                <SideNav />
            </div>
            <div className='grow p-6 mc:overflow-y-auto md:p-12'> {children} </div>
        </div>
    );
};