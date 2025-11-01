import { Link } from "react-router-dom";
import { MediaData } from "../types";

type Props = {
  media: MediaData;
};

export function Card(media: Props) {
  // const navigate = useNavigate();

  // const handleClick = (id: number) => {
  //   // Aquí podrías implementar la lógica para redirigir a los detalles del medio
  //   // Por ejemplo, usando react-router-dom:
  //   // Redirigir a la ruta de detalles del medio
  //   // Asumiendo que tienes rutas definidas para películas y series
  //   // Puedes ajustar la ruta según tu estructura de rutas
  //   navigate(`/${media.media.title ? "movie" : "serie"}/${id}`);

  //   // <Navigate to={`/${media.media.title ? "movie" : "serie"}/${id}`} />;
  // };

  const noImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  return (
    <Link
      to={`/${media.media.title ? "movie" : "serie"}/${media.media.id}`}
      className="block cursor-pointer"
      target="_self"
    >
      <div
        className={`group relative aspect-[2/3] hover:shadow-gray-600 hover:shadow-md rounded-md`}
      >
        <img
          alt={media.media.title || media.media.name}
          src={
            media.media.poster_path
              ? `https://image.tmdb.org/t/p/w780/${media.media.poster_path}`
              : noImg
          }
          className="rounded-md object-cover w-full h-full "
        />
        <div className="mt-4 flex justify-between gap-2 font-bold">
          <div>
            <h3 className="text-md line-clamp-3">
              <p className="cursor-pointer ">
                <span aria-hidden="true" className="absolute inset-0 " />
                {media.media.title || media.media.name}
              </p>
            </h3>
          </div>
          <p className="text-sm font-medium flex items-center">
            {media.media.vote_average === 0
              ? ""
              : media.media.vote_average.toFixed(1) || ""}
          </p>
        </div>
      </div>
    </Link>
  );
}
