import BigPost from "@/app/ui/BigPost";

export default async function Page(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;

    return (
        <main>
            <BigPost postId={id} />
        </main>
    )
};