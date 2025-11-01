import { useFetchDetail } from "../../hooks";

type Props = {
  id: string;
  type: string; // Added type to differentiate between movie and tv
};

export type Providers = {
  logo_path: string;
  provider_name: string;
  provider_id: number;
};

interface CountryProviders {
  link: string;
  flatrate?: Providers[];
  buy?: Providers[];
  rent?: Providers[];
}

type Data = {
  id: number;
  results: {
    [countryCode: string]: CountryProviders;
  };
};

export function Providers({ id, type }: Props) {
  const { data, error, loading } = useFetchDetail<Data>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`,
    "watch/providers"
  ); //

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  const flatrateProviders = data.results["CL"]?.flatrate || [];
  const buyProviders = data.results["CL"]?.buy || [];
  const rentProviders = data.results["CL"]?.rent || [];
  const noProviders =
    flatrateProviders.length === 0 &&
    buyProviders.length === 0 &&
    rentProviders.length === 0;

  return (
    <div className="w-2/3">
      {noProviders && (
        <h2 className="text-3xl font-bold">
          No hay proveedores disponibles en Chile
        </h2>
      )}
      {flatrateProviders.length > 0 && (
        <div className="">
          <h2 className="text-2xl mb-2 text-center md:text-start">
            Retransmisión
          </h2>
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            {flatrateProviders.map((provider) => (
              <img
                className="w-1/5 h-auto"
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))}
          </div>
        </div>
      )}
      {buyProviders.length > 0 && (
        <div>
          <h2 className="text-2xl mb-2 text-center md:text-start">Comprar</h2>
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            {buyProviders.map((provider) => (
              <img
                className="w-1/5 h-auto"
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))}
          </div>
        </div>
      )}
      {rentProviders.length > 0 && (
        <div>
          <h2 className="text-2xl mb-2 text-center md:text-start">Alquiler</h2>
          <div className="flex gap-4 mb-4 justify-center md:justify-start">
            {rentProviders.map((provider) => (
              <img
                className="w-1/5 h-auto"
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
