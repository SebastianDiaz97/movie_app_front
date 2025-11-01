import CardCarousel from "./CardCarousel";

export function MovieCard() {
  return (
    <>
      <CardCarousel
        tipo="movie"
        label="Peliculas populares"
        mediaLists="popular"
      />
      <CardCarousel
        tipo="movie"
        label="Peliculas recientes"
        mediaLists="upcoming"
      />
      <CardCarousel
        tipo="movie"
        label="Peliculas mejor valoradas"
        mediaLists="top_rated"
      />
      <CardCarousel
        tipo="movie"
        label="Peliculas en cines"
        mediaLists="now_playing"
      />
      <CardCarousel tipo="tv" label="Series populares" mediaLists="popular" />
      <CardCarousel tipo="tv" label="Series al aire" mediaLists="on_the_air" />
      <CardCarousel tipo="tv" label="Series mejor valoradas" mediaLists="top_rated" />
      {/* <CardCarousel
        tipo="tv"
        label="Series airing_today"
        mediaLists="airing_today"
      /> */}
    </>
  );
}
