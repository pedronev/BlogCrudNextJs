import PostCard from "../components/PostCard";
import prismadb from "@/libs/prismadb";

async function getPosts() {
  const response = await prismadb.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      Tag: true,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  return response;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {posts.map((post: any) => (
        <PostCard post={post} key={post.id} />
      ))}
    </main>
  );
}
