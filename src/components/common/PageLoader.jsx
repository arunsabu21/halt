import { LoaderCircle } from "lucide-react";

function PageLoader() {
  return (
    <div className="page-loader-overlay">
      <LoaderCircle className="page-loader-spinner" />
    </div>
  );
}

export default PageLoader;
