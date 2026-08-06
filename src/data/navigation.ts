import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Camping",
    path: "/camping",
    megaMenu: [
      {
        title: "Shelter & Sleep",
        links: [
          { label: "Camping Tents", path: "/camping" },
          { label: "Sleeping Bags", path: "/camping" },
        ],
      },
      {
        title: "Basecamp",
        links: [
          { label: "Camping Furniture", path: "/camping" },
          { label: "Camping Lights", path: "/camping" },
        ],
      },
      {
        title: "Cooking & Cold",
        links: [
          { label: "Cooking Equipment", path: "/camping" },
          { label: "Coolers", path: "/camping" },
        ],
      },
    ],
  },
  {
    label: "Hiking",
    path: "/hiking",
    megaMenu: [
      {
        title: "Carry",
        links: [{ label: "Hiking Backpacks", path: "/hiking" }, { label: "Trekking Poles", path: "/hiking" }],
      },
      {
        title: "Wear",
        links: [{ label: "Hiking Shoes", path: "/hiking" }, { label: "Outdoor Clothing", path: "/hiking" }],
      },
    ],
  },
  {
    label: "Boating",
    path: "/boating",
    megaMenu: [
      {
        title: "Vessels",
        links: [{ label: "Kayaks", path: "/boating" }, { label: "Canoes", path: "/boating" }],
      },
      {
        title: "On the Water",
        links: [{ label: "Boating Equipment", path: "/boating" }],
      },
    ],
  },
  { label: "Fishing", path: "/fishing" },
  {
    label: "Accessories",
    path: "/accessories",
    megaMenu: [
      {
        title: "Prepared",
        links: [{ label: "Survival Kits", path: "/accessories" }, { label: "GPS Devices", path: "/accessories" }],
      },
      {
        title: "Power & Hydration",
        links: [{ label: "Portable Power Stations", path: "/accessories" }, { label: "Water Bottles", path: "/accessories" }],
      },
      {
        title: "Tools",
        links: [{ label: "Knives & Multi-tools", path: "/accessories" }, { label: "Adventure Accessories", path: "/accessories" }],
      },
    ],
  },
  { label: "Sale", path: "/products?sale=true", highlight: true },
  { label: "Blog", path: "/blog" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];
