/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTemp } from "./Login";

type FormData = {
  name?: string;
  lastname?: string;
  username?: string;
  email: string;
  password: string;
};

type TypeReq = "login" | "user";
export const apiConection = async (
  body: FormData,
  type: TypeReq
): Promise<any | null> => {
  const url = `/api/${type}`;
  try {
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (response.status === 400) {
      alert(`${data[0].campo.toUpperCase()}: ${data[0].error.toUpperCase()} `);
      return;
    }

    if (response.status === 409) {
      alert(`${data.campo.toUpperCase()}: ${data.error.toUpperCase()} `);
      return;
    }

    if (!response.ok) {
      return response.status;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export function CreateAccount() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    lastname: "",
    username: "",
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
    setLoading(true);

    if (
      formData.email &&
      formData.lastname &&
      formData.name &&
      formData.password &&
      formData.username
    ) {
      const data = await apiConection(formData, "user");

      if (data) {
        setLoading(false);
        alert("Usuario Creado");
        navigate("/login");
      }
    } else {
      alert("Por favor completa todos los datos");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    //create a create account form with email and password fields and a submit button
    <div className="flex justify-center">
      <form className="p-6 rounded w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
        <div className="mb-4 flex gap-4">
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              id="name"
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" htmlFor="lastname">
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              id="lastname"
              type="text"
              placeholder="Apellido"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Nombre de Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
            id="username"
            type="text"
            placeholder="Nombre de Usuario"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {/* {loading && <p className="text-blue-500">Creando usuario...</p>} */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? loadTemp : "Crear cuenta"}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="button"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesion
          </button>
        </div>
      </form>
    </div>
  );
}
