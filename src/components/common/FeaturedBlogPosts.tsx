import { getRecentPosts } from "../../services/blogService";
import Section from "../ui/Section";
import Button from "../ui/Button";
import BlogCard from "../blog/BlogCard";

export default function FeaturedBlogPosts() {
  const posts = getRecentPosts(3);

  return (
    <Section background="cream">
      <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 mb-lg-5 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Adventure Guides &amp; Trail Tips</h2>
        </div>
        <Button to="/blog" variant="outline" icon="bi-arrow-right" iconPosition="end">
          Read the Blog
        </Button>
      </div>
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </Section>
  );
}
