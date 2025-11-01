import { useEffect, useRef, useState } from "react";
import { useFetchMulti } from "../hooks";
import { JsonData, MediaData } from "../types";
import { Card } from "./Card";
import { useParams } from "react-router-dom";
import { Skeleton } from "./Skeleton";

export function InfiniteList() {
  const numArray = [1, 2, 3, 4, 5, 6, 7];
  const { typeMedia, typeList } = useParams();
  const tipo = typeMedia === "movies" ? "movie" : "tv";
  const label = typeMedia === "movies" ? "Peliculas" : "Series";

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<MediaData[]>([]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [search]);
  const loaderRef = useRef(null);

  const { data, error, loading } = useFetchMulti<JsonData>(
    tipo,
    page,
    typeList,
    search
  );

  useEffect(() => {
    if (data?.results) {
      // hacer un array con resultados unicos
      const uniqueResults = data.results.filter(
        (item: MediaData) => !items.some((i) => i.id === item.id)
      );

      // setItems((prev) => [...prev, ...(data.results as MediaData[])]);
      setItems((prev) => [...prev, ...uniqueResults]);

      // Si no hay más páginas, detener scroll infinito
      if (data.page >= data.total_pages) {
        setHasMore(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1);
        }
      },
      {
        root: null, // viewport
        rootMargin: "2px 0px", // empieza a cargar un poco antes
        threshold: 0,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="p-4">
      <input
        type="text"
        className={`w-full z-2 bg-gray-500 p-2 mb-4 border border-gray-300 rounded `}
        onChange={(e) => {
          setTimeout(() => {
            setSearch(e.target.value);
          }, 1000);
        }}
        placeholder={`Busca una ${
          location.pathname.includes("/movies") ? "pelicula" : "serie"
        }`}
      />
      <h3 className="text-3xl font-bold mb-5">{label}</h3>
      <div
        className="m-auto grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center
        lg:grid-cols-5"
      >
        {items.map((media) => (
          <div
            key={media.id}
            // className={`${media.poster_path ? "block" : "hidden"}`}
          >
            <Card media={media} />
          </div>
        ))}
        {loading
          ? numArray.map((e) => {
              return <Skeleton key={e} />;
            })
          : null}
      </div>

      {error && <p className="text-center py-4 text-red-500">Error cargando</p>}

      {hasMore && <div ref={loaderRef} className="h-8" />}
      {!hasMore && (
        <p className="text-center py-4 text-gray-400">No hay más contenido</p>
      )}
    </div>
  );
}
