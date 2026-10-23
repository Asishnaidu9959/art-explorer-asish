
const API = "https://collectionapi.metmuseum.org/public/collection";

export async function getArtwork(id) {
  const response = await fetch(`${API}/v1/objects/${id}`);

  if (!response.ok) {
    throw new Error("Could not load artwork details");
  }

  return response.json();
}

export async function searchArtworkIDs(keyword, titleOnly = false) {
  const searchTerm = keyword.trim();

  if (!searchTerm) {
    return [];
  }

  const params = new URLSearchParams({
    q: searchTerm,
    hasImages: "true",
    limit: "360"
  });

  if (titleOnly) {
    params.set("title", "true");
  }

  const response = await fetch(
    `${API}/v1.1/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Artwork search failed (${response.status}). Please try again.`
    );
  }

  const data = await response.json();

  return data.objectIDs || [];
}
