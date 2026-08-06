import type { FaqItem } from "../types";
import faqRaw from "../data/faq.json";
import Section from "../components/ui/Section";
import SectionTitle from "../components/ui/SectionTitle";
import FaqAccordion from "../components/ui/FaqAccordion";

const faqs = faqRaw as unknown as FaqItem[];

export default function Faq() {
  return (
    <Section background="white">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Answers to the questions we hear most often."
          />
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
