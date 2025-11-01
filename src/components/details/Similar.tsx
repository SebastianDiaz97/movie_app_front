import { useRef } from "react";
import { useFetchDetail } from "../../hooks";
import { JsonData } from "../../types";
import { Card } from "../Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: string;
  type: string; // Added type to differentiate between movie and tv
};

export function Similar({ id, type }: Props) {
  const { data, error, loading } = useFetchDetail<JsonData>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`,
    "recommendations"
  ); // Example ID

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400; // cantidad de scroll en px
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>No data available</div>;
  // if (data?.total_results == 0) return <div>No data available</div>;

  return (
    <div>
      <h1 className="text-3xl mb-2">Recomendaciones</h1>

      {/* contenedor con posición relativa para las flechas */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto mt-4 custom-scroll"
        >
          {data?.total_results == 0 && <div>No data available</div>}
          <div className="flex gap-4 snap-x  font-bold">
            {data?.results.map((movie) => (
              <div
                key={movie.id}
                className={`flex-none w-32`}
                // className={`flex-none w-40 ${movie.poster_path ? "" : "hidden"}`}
              >
                <Card media={movie} />
              </div>
            ))}
          </div>
        </div>

        {/* Flechas (solo visibles en desktop y al hacer hover) */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/3 -translate-y-1/2 cursor-pointer
                     bg-black/40 hover:bg-black/70 text-white p-2 rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/3 -translate-y-1/2 cursor-pointer
                     bg-black/40 hover:bg-black/70 text-white p-2 rounded-full 
                     opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}
