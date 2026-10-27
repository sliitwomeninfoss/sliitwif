import BlogJournal from "./BlogJournal";
import { getMediumPosts } from "@/lib/medium";

export default async function BlogPage() {
  const posts = await getMediumPosts();
  return <BlogJournal posts={posts} />;
}
