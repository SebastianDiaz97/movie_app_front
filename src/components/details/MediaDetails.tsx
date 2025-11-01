import { useNavigate, useParams } from "react-router-dom";
import { addList, getList, removeList, useFetchDetail } from "../../hooks";
import { MediaDetail } from "../../types";
import { Credits } from "./Credits";
import { Similar } from "./Similar";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { useState } from "react";
import { loadTemp } from "../auth/Login";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { Providers } from "./Providers";
import { SeasonDetails } from "./SeasonDetails";

type FormData = {
  tmbdId: number;
  type: string;
  title?: string;
  poster_path: string;
};

export function MediaDetails() {
  const favorite = useFavoritesStore((state) => state.favorites);
  const clearFavorite = useFavoritesStore((state) => state.clearFavorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);

  const { id, type } = useParams();
  const token = window.localStorage.getItem("Authorization");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!id) {
    return <div>Error: No ID provided</div>;
  }
  if (!type) {
    return <div>Error: No TYPE provided</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, loading } = useFetchDetail<MediaDetail>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`
  );
  window.scrollTo({ top: 0, behavior: "smooth" });

  const noImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const body: FormData = {
    type: `${type === "movie" ? "movie" : "tv"}`,
    poster_path: data.poster_path,
    title: data.title || data.name,
    tmbdId: parseInt(id, 10),
  };

  const handleClick = async () => {
    if (!token) {
      alert("Debes iniciar sesion");
      navigate("/login");
    } else {
      setIsLoading(true);
      if (isFavorite) {
        await removeList(token, parseInt(id, 10));
      } else {
        await addList(body, token);
      }

      clearFavorite();
      const dataList = await getList(`${token}`);
      dataList.forEach((e: number) => {
        addFavorite(e);
      });
      setIsLoading(false);
    }
  };
  const isFavorite = favorite.includes(parseInt(id, 10));

  return (
    // <div className="grid grid-cols-3 gap-2">
    <div>
      {/* <div  className={`${type === "movie" ? "col-span-3" : "col-span-2"}`}>  */}
      <div>
        <h1 className="text-7xl font-bold mb-4 justify-center flex">
          {data.name || data.title}
        </h1>
        <div
          className={` ${
            data.overview === ""
              ? ""
              : "flex flex-col md:flex-row items-center justify-center"
          }`}
        >
          <img
            alt={data.title || data.name}
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w780${data.poster_path} `
                : noImg
            }
            className="w-5/6 m-auto md:w-7/24 rounded-md bg-gray-200 object-cover group-hover:opacity-75"
          />
          <div className="mb-4 mt-4 md:ml-4">
            <h2 className="text-xl font-bold ">{data.overview}</h2>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 cursor-pointer"
              type="button"
              onClick={handleClick}
            >
              {isLoading
                ? loadTemp
                : isFavorite
                ? "Eliminar de mi lista"
                : "Agregar a mi lista"}
            </button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center justify-items-center">
          <YoutubeEmbed id={id} type={type} />
          <Providers id={id} type={type} />
        </div>
        {type === "tv" && (
          <div>
            <SeasonDetails
              id={id}
              type={type}
              seasons={data.number_of_seasons || 1}
            />
          </div>
        )}
        <div className="mt-4">
          <Credits id={id} type={type} />
          <Similar id={id} type={type} />
        </div>
      </div>
    </div>
  );
}
