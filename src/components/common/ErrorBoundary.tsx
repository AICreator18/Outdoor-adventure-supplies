import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center px-4"
          style={{ minHeight: "60vh" }}
        >
          <i className="bi bi-exclamation-triangle display-1 text-warm-orange mb-4" aria-hidden="true" />
          <h1 className="fw-bold mb-3">Something Went Wrong</h1>
          <p className="text-stone-gray mb-4 mx-auto" style={{ maxWidth: 480 }}>
            We hit an unexpected error loading this page. Try refreshing, or head back to the homepage.
          </p>
          {/* Plain anchors/buttons only — this boundary may catch errors that
              occur outside the Router, where <Link> would itself fail. */}
          <div className="d-flex gap-3">
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              Refresh Page
            </button>
            <a href="/" className="btn btn-outline-forest">
              Back to Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
