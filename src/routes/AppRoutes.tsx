import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import {
  Home,
  Products,
  ProductDetail,
  Camping,
  Boating,
  Hiking,
  Fishing,
  Accessories,
  Cart,
  Checkout,
  Wishlist,
  About,
  Contact,
  Blog,
  BlogPost,
  Faq,
  NotFound,
} from "./lazyPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:slug", element: <ProductDetail /> },
      { path: "camping", element: <Camping /> },
      { path: "boating", element: <Boating /> },
      { path: "hiking", element: <Hiking /> },
      { path: "fishing", element: <Fishing /> },
      { path: "accessories", element: <Accessories /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "faq", element: <Faq /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
