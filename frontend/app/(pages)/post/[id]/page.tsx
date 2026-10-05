import BigPost from "@/app/ui/BigPost";

export default async function Page(props: { params: Promise<{ id: number }> }) {
    const { id } = await props.params;

    return (
        <main>
            <BigPost postId={id} />
        </main>
    );
};