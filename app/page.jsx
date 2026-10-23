
import Link from "next/link";

export default function Home() {
  return (
    <section className="panel">
      <h1>Discover Art from Around the World</h1>

      <p className="muted">
        Explore amazing artworks from The Metropolitan Museum of Art.
        Search for your favorite artists, discover paintings,
        and learn more about each artwork.
      </p>

      <Link className="button" href="/artwork">
        Explore Artworks
      </Link>
    </section>
  );
}
