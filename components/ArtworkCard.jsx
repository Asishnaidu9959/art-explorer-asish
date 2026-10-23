"use client";
import { useState } from "react";
import Link from "next/link";

export default function ArtworkCard({ artwork }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = artwork.primaryImageSmall || artwork.primaryImage;
  return (
    <article className="card">
      {imageUrl && !failed ? (
        <img src={imageUrl} alt={artwork.title || "Museum artwork"}
          loading="lazy" onError={() => setFailed(true)} />
      ) : <div className="image-fallback">Image unavailable</div>}
      <h3>{artwork.title || "Untitled"}</h3>
      <p className="muted">{artwork.artistDisplayName || "Unknown artist"}</p>
      <p className="muted">{artwork.objectDate || "Date unknown"}</p>
      <Link href={`/artwork/${artwork.objectID}`}>View Details →</Link>
    </article>
  );
}
