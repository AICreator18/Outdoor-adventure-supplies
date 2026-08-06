import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeProvider";
import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { ToastProvider } from "./context/ToastProvider";
import { QuickViewProvider } from "./context/QuickViewProvider";
import ToastContainer from "./components/ui/ToastContainer";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
