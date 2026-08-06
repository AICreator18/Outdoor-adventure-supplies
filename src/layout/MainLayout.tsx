import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import QuickViewModal from "../components/product/QuickViewModal";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTopButton />
      <QuickViewModal />
    </>
  );
}
