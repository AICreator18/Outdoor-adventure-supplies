import { useParams } from "react-router-dom";
import { getPostBySlug, getRelatedPosts } from "../services/blogService";
import Section from "../components/ui/Section";
import Breadcrumb from "../components/ui/Breadcrumb";
import BlogCard from "../components/blog/BlogCard";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const related = getRelatedPosts(post, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="position-relative text-white" style={{ minHeight: 360 }}>
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img src={post.coverImage} alt={post.title} className="img-cover" />
          <div
            className="position-absolute top-0 start-0 w-100 h-100 bg-deep-green"
            style={{ opacity: 0.65 }}
          />
        </div>
        <div
          className="container position-relative d-flex flex-column justify-content-center"
          style={{ minHeight: 360 }}
        >
          <Breadcrumb
            variant="light"
            className="mb-3"
            items={[
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: post.title },
            ]}
          />
          <h1 className="display-6 fw-bold text-white mb-2" style={{ maxWidth: 760 }}>
            {post.title}
          </h1>
          <p className="text-white-50 mb-0">
            <span className="text-warm-orange fw-semibold">{post.category}</span>
            {" · "}{post.author} &middot; {formattedDate} &middot; {post.readMinutes} min read
          </p>
        </div>
      </section>

      <Section background="white">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-stone-gray mb-3" style={{ lineHeight: 1.8 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section background="cream">
          <h2 className="h4 fw-bold mb-4">More From the Journal</h2>
          <div className="row g-4">
            {related.map((relatedPost) => (
              <div className="col-md-4" key={relatedPost.id}>
                <BlogCard post={relatedPost} />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
