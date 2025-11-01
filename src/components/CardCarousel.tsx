import { useNavigate } from "react-router-dom";
import { useFetchMulti } from "../hooks";
import { JsonData, MediaLists, MediaType } from "../types";
import { Card } from "./Card";
import { Skeleton } from "./Skeleton";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // iconos bonitos

type Data = {
  label: string;
  tipo: MediaType;
  mediaLists?: MediaLists;
};

const CardCarousel = ({ tipo, label, mediaLists }: Data) => {
  const numArray = [1, 2, 3, 4, 5, 6, 7];
  const navigate = useNavigate();
  const { data, error, loading } = useFetchMulti<JsonData>(tipo, 1, mediaLists);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400; // cantidad de scroll en px
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="mb-4 mt-2">
        <div className="overflow-x-auto custom-scroll">
          <div className="flex w-max gap-4 snap-x snap-mandatory">
            {numArray.map((n) => (
              <div key={n} className={`flex-none w-40 mb-6`}>
                <Skeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div>Error loading data</div>;

  if (!data || !data.results) return <div>No data found</div>;

  return (
    <div className="mb-4 mt-2">
      <h2 className="text-2xl font-bold mb-4">{label}</h2>

      {/* contenedor con posición relativa para las flechas */}
      <div className="relative group">
        {/* carrusel con scroll */}
        <div ref={scrollRef} className="overflow-x-auto custom-scroll">
          <div className="flex w-max gap-4 snap-x snap-mandatory">
            {data.results.map((movie) => (
              <div
                key={movie.id}
                className={`flex-none w-40 mb-6`}
                // className={`flex-none w-40 mb-6 ${
                //   movie.poster_path ? "" : "hidden"
                // }`}
              >
                <Card media={movie} />
              </div>
            ))}
            <div key={1} className="group relative ">
              <img
                src="https://thumbs.dreamstime.com/b/c%C3%ADrculo-interior-de-signo-blanco-m%C3%A1s-sobre-fondo-transparente-dise%C3%B1o-simple-el-sencillo-se-centra-en-un-gris-que-contrasta-con-394623791.jpg"
                className="w-40 h-60 rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto"
              />
              <div className="mt-4 flex justify-between">
                <div
                  onClick={() =>
                    navigate(
                      `/${
                        tipo === "movie" ? "movies" : "series"
                      }/list/${mediaLists}`
                    )
                  }
                >
                  <h3 className="text-md text-white truncate w-40">
                    <a className="cursor-pointer ">
                      <span aria-hidden="true" className="absolute inset-0" />
                      Ver más
                    </a>
                  </h3>
                </div>
              </div>
            </div>
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
};

export default CardCarousel;
