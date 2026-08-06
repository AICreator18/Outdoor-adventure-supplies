import { Link } from "react-router-dom";
import type { BlogPost } from "../../types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="card h-100 border-0 shadow-brand-sm hover-lift rounded-md overflow-hidden">
      <div className="ratio ratio-16x9 bg-stone-gray-light">
        <img src={post.coverImage} alt={post.title} className="img-cover" loading="lazy" />
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="h6 mb-1">
          <Link to={`/blog/${post.slug}`} className="text-decoration-none text-reset stretched-link">
            {post.title}
          </Link>
        </h3>
        <span className="text-uppercase text-forest small fw-semibold mb-2 d-block">{post.category}</span>
        <p className="text-stone-gray small mb-3">{post.excerpt}</p>
        <div className="mt-auto d-flex justify-content-between text-stone-gray small">
          <span>{post.author}</span>
          <span>{post.readMinutes} min read</span>
        </div>
      </div>
    </div>
  );
}
