
import { Suspense } from "react";
import ArtworkBrowser from "@/components/ArtworkBrowser";

export default function Artworks() {
  return (
    <>
      <h1>Browse Artworks</h1>

      <p className="muted">
        Search and explore artworks from The Metropolitan Museum of Art.
      </p>

      <Suspense fallback={<p>Loading artwork search...</p>}>
        <ArtworkBrowser />
      </Suspense>
    </>
  );
}
