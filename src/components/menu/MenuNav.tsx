import { MenuLinks } from "./MenuLinks";
import menu from "../../assets/burger-menu-svgrepo-com.svg";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MenuNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sticky top-0 z-2 bg-indigo-950">
      <div className="py-4 md:py-1 px-2 flex md:gap-4 place-content-between items-center max-w-6xl mx-auto">
        <h1
          className="text-xl font-bold text-center cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          MOVIE APP
        </h1>
        <MenuLinks isOpen={isOpen} setIsOpen={setIsOpen} />
        <img
          src={menu}
          className="w-9 md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`${
          location.pathname.includes("movies") ||
          location.pathname.includes("series")
            ? "block"
            : "hidden"
        }`}
      >
        {/* <input
          type="text"
          className={`w-full z-2 bg-gray-500 p-2 mb-4 border border-gray-300 rounded `}
          placeholder={`Busca una ${
            location.pathname.includes("/movies") ? "pelicula" : "serie"
          }`}
        /> */}
      </div>
    </div>
  );
};

export default MenuNav;
