/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Media } from "../types";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Y0Y2FmZDZkYTg2NzM4NDYzN2UxYmUwN2U4YjQxZiIsIm5iZiI6MTc1MDMxODkwMS4yMTEsInN1YiI6IjY4NTNiZjM1OTBkN2Q5NjQ5MjBjZjFmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DXo6jQ4aI-PVrntsK3Lhp25qvv9xXZoAYfOFsdaVuqY",
  },
};

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export function useFetchMulti<T>(
  tipo: string,
  page?: number,
  mediaLists?: string,
  search?: string
): Params<T> {
  const pageNum = page || 1;


  let url = `https://api.themoviedb.org/3/${tipo}/${mediaLists}?page=${pageNum}`;
  if (search !== "" && search !== undefined) {
    url = `https://api.themoviedb.org/3/search/${tipo}?query=${search}&page=${pageNum}`
  }

  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export function useFetchDetail<T>(
  tipo: string,
  id: string,
  extra?: string
): Params<T> {
  const url = `https://api.themoviedb.org/3/${tipo}/${id}${extra ? `/${extra}?language=es-US` : "?language=es-US"
    } `;
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

// const API_BASE = import.meta.env.PROD
//   ? import.meta.env.VITE_API_URL  // usa tu backend real en producción
//   : "/api"; 

export const addList = async (body: object, token: string) => {

  const url = `/api/media/addToList`;
  try {
    tokenValidator();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // console.log(response.json());
    }
    return response.status;
  } catch (error) {
    console.error(error);
  }
};

export const getList = async (token: string) => {
  const url = `/api/user`;

  try {
    tokenValidator();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    const data = await response.json().catch(() => null);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const useGetCompleteList = (token: string) => { 
  // const pageNum = page || 0;
  // const url = `/api/media?page=${pageNum}`;

  const url = `/api/media`;
  const [data, setData] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        tokenValidator();
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        const dataJson = await response.json();
        setData(dataJson.content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

export const removeList = async (token: string, tmdbId: number) => {
  const url = `/api/user/${tmdbId}`;

  try {
    tokenValidator();
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    const data = await response.json().catch(() => null);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export function useTokenValidator() {
  useEffect(() => {
    const interval = setInterval(async () => {
      tokenValidator();
    }, 10 * 60 * 1000); // cada 5 min

    return () => clearInterval(interval);
  }, []);
}

export const tokenValidator = async () => {
  try {
    const token = localStorage.getItem("Authorization");

    if (!token) return;

    const res = await fetch(`/api/user/auth`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      // si el backend dice que no es válido → logout
      alert("Sesion expirada, cerrando sesión...");
      localStorage.removeItem("Authorization");
      useFavoritesStore.getState().clearFavorites();

      window.location.href = "/login"; // redirigir
    }
  } catch (err) {
    console.error("Error validando token", err);
  }
};

export function useFetchDetailSeason<T>(
  tipo: string,
  id: string,
  season: string
): Params<T> {
  const url = `https://api.themoviedb.org/3/${tipo}/${id}/season/${season} `;
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);


  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export function useFetchMultiPeople<T>(page?: number): Params<T> {
  const pageNum = page || 1;
  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNum}`;
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}
