
import ArtworkCard from "./ArtworkCard";

export default function ArtworkList({ artworks }) {
  return (
    <div className="grid">
      {artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.objectID}
          artwork={artwork}
        />
      ))}
    </div>
  );
}
