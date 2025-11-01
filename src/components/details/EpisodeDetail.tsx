import { SeasonDetail } from "../../types";

type Prop = {
  data: SeasonDetail;
};

const noImg =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

export function EpisodeDetail({ data }: Prop) {
  return (
    <div>
      <img
        className={data.still_path ? "w-full rounded-md" : "aspect-[16/9]"}
        src={
          data.still_path
            ? `https://image.tmdb.org/t/p/w780/${data.still_path} `
            : noImg
        }
        alt=""
      />
      <h3 className="text-lg font-bold mt-2">{data.name}</h3>
      <p className="text-sm">{data.overview}</p>
      <p className="text-sm font-semibold mt-1">
        Duración: {data.runtime} minutos
      </p>
      <p className="text-sm font-semibold mt-1">
        Fecha de emisión: {data.air_date}
      </p>
      <p className="text-sm font-semibold mt-1">
        Puntuación: {data.vote_average.toFixed(2)}
      </p>
    </div>
  );
}
