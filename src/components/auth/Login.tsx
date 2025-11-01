/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConection } from "./CreateAccount";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import { getList } from "../../hooks";

type FormData = {
  email: string;
  password: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loadTemp = (
  <svg
    aria-hidden="true"
    className="w-10 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

export function Login() {
  const navigate = useNavigate();
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem("Authorization", "");
    setLoading(true);

    if (formData.email && formData.password) {
      const data = await apiConection(formData, "login");

      if (data === 403) {
        alert("Email o Contraseña estan mal, intente otra vez");
        setLoading(false);
        return;
      }

      if (data !== 403) {
        window.localStorage.setItem("Authorization", `Bearer ${data.jwtToken}`);
        const dataList = await getList(`Bearer ${data.jwtToken}`);
        dataList.forEach((e: number) => {
          addFavorite(e);
        });
        setLoading(false);

        navigate("/");
      }
    } else {
      alert("Por favor completa todos los datos");
      setLoading(false);
    }
  };

  return (
    //create a login form with email and password fields and a submit button
    <div className="flex justify-center">
      <form
        className={`p-6 rounded w-full max-w-sm ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center ">Iniciar Sesion</h2>
        <div className="mb-4 ">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline text-white"
            id="password"
            type="password"
            placeholder="******************"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? loadTemp : "Iniciar Sesion"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/create-account")}
          >
            Crear Cuenta
          </button>
        </div>
      </form>
    </div>
  );
}
