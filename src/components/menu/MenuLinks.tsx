import { useLocation, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../store/useFavoritesStore";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function MenuLinks({ isOpen, setIsOpen }: Props) {
  // const [];
  const navigate = useNavigate();
  const location = useLocation().pathname;
  console.log(location);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };
  const isToken = window.localStorage.getItem("Authorization");

  return (
    <div
      className={`
         text-2xl font-bold md:gap-3
        fixed inset-0 z-50 flex flex-col items-center space-y-6
        bg-black/90 transform transition-all duration-300 ease-in-out
        overflow-y-auto p-6 
        ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }
        md:static md:flex md:flex-row md:space-y-0 md:translate-x-0 md:opacity-100
        md:pointer-events-auto md:bg-transparent md:transition-none md:overflow-visible
         md:p-4 md:text-base
         text-cyan-700
      `}
      onClick={() => setIsOpen(false)}
    >
      <div className="md:hidden" onClick={() => setIsOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
          className="w-10 h-10 text-white cursor-pointer"
          fill="currentColor"
        >
          <path
            d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 
          22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 
          L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"
          ></path>
        </svg>
      </div>

      <h2
        className={`text-center cursor-pointer hover:text-sky-400 ${
          location === "/" ? "text-white" : ""
        }`}
        onClick={() => {
          handleLinkClick("/");
        }}
      >
        Inicio
      </h2>
      <h2
        className={`text-center cursor-pointer hover:text-sky-400 ${
          location.includes("movies") ? "text-white" : ""
        }`}
        onClick={() => {
          handleLinkClick("/movies/list/popular");
        }}
      >
        Películas
      </h2>
      <h2
        className={`text-center cursor-pointer hover:text-sky-400 ${
          location.includes("series") ? "text-white" : ""
        }`}
        onClick={() => {
          handleLinkClick("/series/list/popular");
        }}
      >
        Series
      </h2>
      <h2
        className={`text-center cursor-pointer hover:text-sky-400 ${
          location.includes("login") || location.includes("create-account")
            ? "text-white"
            : ""
        }`}
        onClick={() => {
          if (!isToken) {
            handleLinkClick("/login");
          } else {
            window.localStorage.removeItem("Authorization");
            useFavoritesStore.getState().clearFavorites();

            handleLinkClick("/");
          }
        }}
      >
        {!isToken ? "Iniciar Sesion" : "Cerrar Sesion"}
      </h2>
      <h2
        className={`text-center cursor-pointer hover:text-sky-400 ${
          location === "/my-list" ? "text-white" : ""
        }`}
        onClick={() => {
          if (!isToken) {
            handleLinkClick("/login");
          } else {
            handleLinkClick("/my-list");
          }
        }}
      >
        Mi lista
      </h2>
    </div>
  );
}
