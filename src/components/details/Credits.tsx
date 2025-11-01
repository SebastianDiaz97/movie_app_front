import { useRef } from "react";
import { useFetchDetail } from "../../hooks";
import { CreditsDetail } from "../../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  id: string;
  type: string;
};

const noImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

export function Credits({ id, type }: Props) {
  const { data, error, loading } = useFetchDetail<CreditsDetail>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`,
    `${type === "movie" ? "credits" : "aggregate_credits"}`
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
  if (!data) return <div>No data available</div>;

  data.cast.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  data.cast = data.cast.slice(0, 20); // Limit to first 20 cast members
  // data.cast = data.cast.filter((member) => member.order <= 100);

  return (
    <div className="w-full overflow-x-auto mt-4">
      <h1 className="text-2xl mb-2">Elenco</h1>

      {/* contenedor con posición relativa para las flechas */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-x-auto w-full text-sm custom-scroll"
        >
          <div className="flex gap-4 snap-x snap-mandatory">
            {data.cast.map((member) => (
              <div key={member.id} className={`flex-none w-32`}>
                <img
                  alt={member.name}
                  src={`${
                    member.profile_path != null
                      ? `https://image.tmdb.org/t/p/w780/${member.profile_path}`
                      : noImg
                  } `}
                  className=" rounded-md bg-gray-200 object-contain  mb-4 "
                />
                <h2 className="text-sm font-bold">{member.name}</h2>
                <h2 className="line-clamp-3">
                  {member.character ||
                    member.roles?.map((role) => role.character).join(", ")}
                </h2>
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
