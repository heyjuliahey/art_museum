import { sortArtworks } from "../utils/sort";

describe("sortArtworks", () => {
  const artworks = [
    {
      id: 22485,
      title: "The Superb Lily, from The Temple of Flora",
      artist_title: "Richard Earlom",
      date_display: "1799",
      image_id: "8f9c85e4-28a2-88e0-2d99-f919fd0e2782",
    },
    {
      id: 30839,
      title: "The Philosopher's Conquest",
      artist_title: "Giorgio de Chirico",
      date_display: "1913",
      image_id: "7398163e-2357-ac74-254a-273907c5c7d1",
    },
    {
      id: 16327,
      title: "The Annunciation",
      artist_title: "Jean Hey",
      date_display: "1490",
      image_id: "77951d0c-d781-eac6-f4ff-f13cc5cfc0cf",
    },
  ];
  it("should sort artworks by title in ascending order", () => {
    const sortedArtworks = sortArtworks(artworks, "title");

    expect(sortedArtworks[0].title).toBe("The Annunciation");
    expect(sortedArtworks[1].title).toBe("The Philosopher's Conquest");
    expect(sortedArtworks[2].title).toBe(
      "The Superb Lily, from The Temple of Flora",
    );
  });

  it("should sort artworks by artist title in ascending order", () => {
    const sortedArtworks = sortArtworks(artworks, "artist");

    expect(sortedArtworks[0].artist_title).toBe("Giorgio de Chirico");
    expect(sortedArtworks[1].artist_title).toBe("Jean Hey");
    expect(sortedArtworks[2].artist_title).toBe("Richard Earlom");
  });
});
