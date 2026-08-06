export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readMinutes: number;
  excerpt: string;
  content: string[];
  coverImage: string;
}
