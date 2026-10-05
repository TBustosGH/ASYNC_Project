import Profile from "@/app/ui/profile/Profile";

export default async function Page(props: { params: Promise<{ id: number }>}) {
    const { id } = await props.params;

    return (
        <main>
            <Profile id={id} />
        </main>
    );
};