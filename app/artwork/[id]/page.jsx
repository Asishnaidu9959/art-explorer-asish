import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtwork } from "../../../lib/metApi";

export default async function ArtworkDetailPage({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  let artwork;
  try { artwork = await getArtwork(id); } catch { notFound(); }
  const imageUrl = artwork.primaryImage || artwork.primaryImageSmall;
  return (
    <section className="panel detail">
      <Link href="/artwork">← Back to Artworks</Link>
      <h1>{artwork.title || "Untitled"}</h1>
      {imageUrl ? (
        <img className="detail-image" src={imageUrl} alt={artwork.title || "Artwork"} />
      ) : <div className="image-fallback">Image not available from the museum</div>}
      <p><strong>Artist:</strong> {artwork.artistDisplayName || "Unknown artist"}</p>
      <p><strong>Date:</strong> {artwork.objectDate || "Unknown"}</p>
      <p><strong>Medium:</strong> {artwork.medium || "Not available"}</p>
      <p><strong>Department:</strong> {artwork.department || "Not available"}</p>
      <p><strong>Classification:</strong> {artwork.classification || "Not available"}</p>
      {artwork.creditLine && <p className="muted">{artwork.creditLine}</p>}
    </section>
  );
}
