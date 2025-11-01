import { useFetchDetail } from "../../hooks";
import { JsonData } from "../../types";

type Props = {
  id: string;
  type: string; // Added type to differentiate between movie and tv
};

export const YoutubeEmbed = ({ id, type }: Props) => {
  const { data, error, loading } = useFetchDetail<JsonData>(
    `${type === "movie" ? "movie" : "tv"}`,
    `${id}`,
    "videos?page=1"
  ); // Example ID

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  if (data?.results.length === 0) return <div></div>;
  const youtubeKey = data.results.find(
    (video) => video.type === "Trailer"
  )?.key; // Assuming the first video is the desired one

  if (!youtubeKey) return <div>No trailer available</div>;
  return (
    <div className="aspect-video w-full h-full m-auto ">
      <iframe
        className="w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${youtubeKey}`}
        title="YouTube trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
