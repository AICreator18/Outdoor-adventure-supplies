import type { InstagramPost } from "../../types";
import instagramRaw from "../../data/instagramPosts.json";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";

const posts = instagramRaw as unknown as InstagramPost[];

export default function InstagramGallery() {
  return (
    <Section background="white">
      <SectionTitle
        title="Adventures Shared By Our Community"
        subtitle="Follow us @outdooradventuresupplies"
      />
      <div className="row g-2 g-md-3">
        {posts.map((post) => (
          <div className="col-6 col-md-3" key={post.id}>
            <div className="instagram-tile ratio ratio-1x1 rounded-md overflow-hidden position-relative">
              <img src={post.image} alt={post.caption} className="img-cover" loading="lazy" />
              <div className="instagram-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center p-2">
                <i className="bi bi-instagram fs-4 mb-1" aria-hidden="true" />
                <span className="small fw-semibold">
                  <i className="bi bi-heart-fill me-1" aria-hidden="true" />
                  {post.likes.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
