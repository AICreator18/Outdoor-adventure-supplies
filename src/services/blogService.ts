import type { BlogPost } from "../types";
import blogRaw from "../data/blog.json";

const posts = blogRaw as unknown as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, limit);
}
