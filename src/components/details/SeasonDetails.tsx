import { useState } from "react";
import { useFetchDetailSeason } from "../../hooks";
import { Season } from "../../types";
import { EpisodeDetail } from "./EpisodeDetail";

type Props = {
  id: string;
  type: string; // Added type to differentiate between movie and tv
  seasons: number;
};

export function SeasonDetails({ id, type, seasons }: Props) {
  const [seasionNumber, setSeasonNumber] = useState(1);
  const { data, error, loading } = useFetchDetailSeason<Season>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`,
    seasionNumber.toString()
  );
  const array = [];
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  for (let index = 1; index <= seasons; index++) {
    array.push(index);
  }

  return (
    <div>
      <div className="w-64 mt-4 sticky top-16 z-1 bg-gray-900 w-full">
        <label htmlFor="country" className="text-2xl">
          Temporadas
        </label>
        <select
          id="country"
          name="country"
          className="w-full mt-2 bg-gray-900 rounded-md border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setSeasonNumber(Number(e.target.value))}
          value={seasionNumber}
        >
          {array.map((seasonNumber) => (
            <option key={seasonNumber} value={seasonNumber}>
              Temporada {seasonNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 px-1">
        {data.episodes.map((episode) => (
          <EpisodeDetail data={episode} />
        ))}
      </div>
    </div>
  );
}
