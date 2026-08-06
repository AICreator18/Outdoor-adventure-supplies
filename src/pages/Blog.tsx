import { getAllPosts } from "../services/blogService";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import BlogCard from "../components/blog/BlogCard";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <Section background="white">
      <SectionTitle
        title="Adventure Guides & Trail Tips"
        subtitle="Field-tested advice from our team and community, for every kind of trip."
      />
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </Section>
  );
}
