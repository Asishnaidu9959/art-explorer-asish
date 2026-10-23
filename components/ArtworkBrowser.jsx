"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArtworkList from "./ArtworkList";
import { getArtwork, searchArtworkIDs } from "../lib/metApi";

const PAGE_SIZE = 6;
const CANDIDATES_PER_PAGE = 30;
const CONCURRENCY = 3;

async function loadImageArtworks(ids, start, existingIds = new Set()) {
  const found = [];
  let position = start;
  // Only request a limited number of details per click to keep the API responsive.
  while (position < ids.length && position < start + CANDIDATES_PER_PAGE && found.length < PAGE_SIZE) {
    const batch = ids.slice(position, position + CONCURRENCY);
    const results = await Promise.allSettled(batch.map(getArtwork));
    position += batch.length;
    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      const art = result.value;
      if (art?.objectID && (art.primaryImageSmall || art.primaryImage) && !existingIds.has(art.objectID)) {
        found.push(art);
        existingIds.add(art.objectID);
        if (found.length === PAGE_SIZE) break;
      }
    }
  }
  return { found, nextPosition: position };
}

export default function ArtworkBrowser() {
  const searchParams = useSearchParams();
  const urlKeyword = searchParams.get("q") || "sunflowers";
  const titleOnly = searchParams.get("title") === "true";
  const [keyword, setKeyword] = useState(urlKeyword);
  const [artworks, setArtworks] = useState([]);
  const [ids, setIds] = useState([]);
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  async function startSearch(term, onlyTitles = false) {
    const current = ++requestId.current;
    setLoading(true);
    setError("");
    setArtworks([]);
    setIds([]);
    setPosition(0);
    try {
      const resultIds = await searchArtworkIDs(term, onlyTitles);
      if (current !== requestId.current) return;
      const page = await loadImageArtworks(resultIds, 0);
      if (current !== requestId.current) return;
      setIds(resultIds);
      setArtworks(page.found);
      setPosition(page.nextPosition);
    } catch (e) {
      if (current === requestId.current) setError(e.message || "Something went wrong");
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }

  useEffect(() => {
    setKeyword(urlKeyword);
    startSearch(urlKeyword, titleOnly);
    return () => { requestId.current++; };
  }, [urlKeyword, titleOnly]);

  async function handleLoadMore() {
    const current = requestId.current;
    setLoadingMore(true);
    setError("");
    try {
      const existing = new Set(artworks.map((a) => a.objectID));
      const page = await loadImageArtworks(ids, position, existing);
      if (current !== requestId.current) return;
      setArtworks((old) => [...old, ...page.found]);
      setPosition(page.nextPosition);
    } catch (e) {
      if (current === requestId.current) setError(e.message || "Could not load more artworks");
    } finally {
      if (current === requestId.current) setLoadingMore(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const term = keyword.trim();
    if (term.length < 3) {
      setError("Enter at least 3 characters");
      return;
    }
    startSearch(term);
  }

  return (
    <section className="panel">
      <form className="row search-row" onSubmit={handleSearch}>
        <input className="field" aria-label="Artwork keyword" placeholder="Search artworks"
          value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button className="button" type="submit" disabled={loading || loadingMore}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && <p className="muted" role="status">Finding artworks with pictures...</p>}
      {error && <p className="error" role="alert">{error}</p>}
      {!loading && !error && artworks.length === 0 && (
        <p className="muted">No artworks with pictures found in this batch. Try another keyword.</p>
      )}
      <ArtworkList artworks={artworks} />
      {!loading && position < ids.length && (
        <div className="load-more">
          <button className="button" type="button" onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading more..." : "Load More Artworks"}
          </button>
        </div>
      )}
      {!loading && artworks.length > 0 && <p className="muted result-note">Showing {artworks.length} artworks with images.</p>}
    </section>
  );
}
