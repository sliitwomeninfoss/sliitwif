import HomeIntro from "./components/HomeIntro";
import { getMediumPosts } from "@/lib/medium";

export default async function Home() {
  const blogPosts = await getMediumPosts();
  return (
    <main>
      <HomeIntro blogPosts={blogPosts} />
    </main>
  );
}
