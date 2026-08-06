import { useState } from "react";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import Button from "../components/ui/Button";

const STATS = [
  {
    icon: "bi-triangle-fill",
    value: "12+",
    label: "Years in Business",
    description: "A decade of equipping adventurers across India.",
  },
  {
    icon: "bi-people-fill",
    value: "180K+",
    label: "Happy Adventurers",
    description: "Trusted by explorers, trekkers, campers and anglers nationwide.",
  },
  {
    icon: "bi-backpack2-fill",
    value: "1,200+",
    label: "Gear Products",
    description: "Curated, tested and selected for real-world performance.",
  },
  {
    icon: "bi-geo-alt-fill",
    value: "45+",
    label: "Cities Served",
    description: "Delivering adventure gear across India.",
  },
];

const VALUES = [
  {
    icon: "bi-tree",
    title: "Built for the Outdoors",
    description: "Every product is field-tested by real campers, hikers, paddlers and anglers before it reaches our shelves.",
  },
  {
    icon: "bi-recycle",
    title: "Responsibly Sourced",
    description: "We partner with manufacturers who share our commitment to sustainable materials and ethical production.",
  },
  {
    icon: "bi-people",
    title: "Community First",
    description: "From local trail cleanups to gear-lending programs, we invest in the outdoor communities we serve.",
  },
  {
    icon: "bi-shield-check",
    title: "Trusted Quality",
    description: "Backed by our satisfaction guarantee, so you can adventure with confidence in every purchase.",
  },
];

const TRUST_BADGES = [
  {
    icon: "bi-shield-check",
    title: "Quality You Can Trust",
    description: "Field-tested gear from trusted global brands.",
  },
  {
    icon: "bi-award",
    title: "Expert Guidance",
    description: "Real advice from outdoor enthusiasts like you.",
  },
  {
    icon: "bi-truck",
    title: "Fast & Reliable Delivery",
    description: "Quick shipping across India, always.",
  },
  {
    icon: "bi-headset",
    title: "Support That Cares",
    description: "We're here before, during and after your trip.",
  },
];

const ABOUT_IMAGE = "/images/scenes/about-story.jpg";

export default function About() {
  const [sealBadgeOk, setSealBadgeOk] = useState(true);

  return (
    <>
      <section className="bg-deep-green text-white">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="display-6 fw-bold text-white mb-2">
                Gear Trusted From the Nilgiris to the Coast
              </h1>
              <p className="text-white-50 mb-4" style={{ maxWidth: 480 }}>
                Since 2012, Outdoor Adventure Supplies has equipped explorers across India with reliable,
                field-tested gear for every terrain — proudly headquartered in Chennai.
              </p>
              <Button to="/products" variant="orange" size="lg" icon="bi-arrow-right" iconPosition="end">
                Explore Our Collection
              </Button>
            </div>
            <div className="col-lg-6 d-none d-lg-block position-relative">
              <div className="ratio ratio-4x3 bg-deep-green rounded-md overflow-hidden">
                <img
                  src={ABOUT_IMAGE}
                  alt="Friends gathered around a campfire at dusk"
                  style={{ objectFit: "contain" }}
                />
              </div>
              {sealBadgeOk && (
                <img
                  src="/images/decor/about-badge-since-2012-seal.png"
                  alt=""
                  aria-hidden="true"
                  className="position-absolute"
                  style={{ top: 24, right: 40, width: 285, transform: "rotate(-6deg)" }}
                  onError={() => setSealBadgeOk(false)}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Section background="white">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">We Believe Adventure Should Be Accessible to Everyone</h2>
            <p className="text-stone-gray mb-3">
              What started as a single gear shop in Chennai has grown into a destination for outdoor
              enthusiasts across India. We hand-select every tent, backpack, kayak and rod in our catalog,
              testing each one on real trails — from the Western Ghats to the backwaters — before it ever
              reaches you.
            </p>
            <p className="text-stone-gray mb-0">
              Whether you're planning your first trek in the Nilgiris or outfitting a multi-day expedition,
              our team is here to help you find gear that performs when it matters most.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {STATS.map((stat) => (
                <div className="col-6" key={stat.label}>
                  <div className="bg-cream rounded-md p-4 h-100">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-deep-green text-white mb-3"
                      style={{ width: 44, height: 44 }}
                    >
                      <i className={`bi ${stat.icon}`} aria-hidden="true" />
                    </div>
                    <div className="fs-3 fw-bold text-ink mb-1">{stat.value}</div>
                    <div className="text-uppercase small fw-semibold letter-spacing-wide mb-2">
                      {stat.label}
                    </div>
                    <p className="text-stone-gray small mb-0">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="white" className="pt-0">
        <div className="row align-items-center g-4">
          <div className="col-md-3 d-none d-md-block">
            <img
              src="/images/decor/about-watercolor-nilgiris-trail.jpg"
              alt="Watercolor illustration of a trail through the Nilgiri tea hills"
              className="rounded-md w-100"
            />
          </div>
          <div className="col-md-9">
            <div className="row g-4">
              {TRUST_BADGES.map((badge) => (
                <div className="col-6 col-lg-3" key={badge.title}>
                  <i className={`bi ${badge.icon} fs-3 text-forest mb-2 d-inline-block`} aria-hidden="true" />
                  <h3 className="h6 fw-bold mb-1">{badge.title}</h3>
                  <p className="text-stone-gray small mb-0">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section background="cream">
        <SectionTitle
          title="Our Values"
          subtitle="The principles that guide every product we carry and every decision we make."
        />
        <div className="row g-4">
          {VALUES.map((value) => (
            <div className="col-6 col-lg-3" key={value.title}>
              <div className="bg-white rounded-md shadow-brand-sm p-4 h-100 text-center">
                <i className={`bi ${value.icon} fs-1 text-forest mb-3 d-inline-block`} aria-hidden="true" />
                <h3 className="h6 fw-bold mb-2">{value.title}</h3>
                <p className="text-stone-gray small mb-0">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
