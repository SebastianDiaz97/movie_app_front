import { useState } from "react";
import { tokenValidator, useGetCompleteList } from "../hooks";
import { Card } from "./Card";
import { Media, MediaData } from "../types";
import { Skeleton } from "./Skeleton";

export function MyList() {
  const token = window.localStorage.getItem("Authorization");
  const numArray = [1, 2, 3, 4, 5, 6, 7];
  const [page, setPage] = useState(0);
  if (!token) {
    tokenValidator();
    return;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, loading } = useGetCompleteList(token, page);

  if (loading) {
    return (
      <div
        className="m-auto grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center
        lg:grid-cols-5"
      >
        {numArray.map((e) => {
          return <Skeleton key={e} />;
        })}
      </div>
    );
  }

  if (!data) {
    return;
  }

  const changeData = (media: Media) => {
    const mediaData: MediaData = {
      id: media.tmbdId,
      poster_path: media.poster_path,
      vote_average: 0,
    };

    media.type == "movie"
      ? (mediaData.title = media.title)
      : (mediaData.name = media.title);
    return <Card media={mediaData} />;
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Mi Lista de Favoritos</h2>
      <div
        className="m-auto grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center
        lg:grid-cols-5"
      >
        {data.map((media) => {
          const jio = changeData(media);
          return <div key={`${media.type}-${media.tmbdId}`}>{jio}</div>;

          // <div
          //   className={`group relative aspect-[2/3]`}
          //   // className={`group relative
          //   //   ${
          //   //   media.media.poster_path ? "" : "hidden"
          //   // } aspect-[2/3]`}
          //   // onClick={() => handleClick(media.media.id)}
          // >
          //   <img
          //     alt={media.title}
          //     src={
          //       media.poster_path
          //         ? `http://image.tmdb.org/t/p/w780/${media.poster_path}`
          //         : noImg
          //     }
          //     className="rounded-md object-cover group-hover:opacity-75 w-full h-full"
          //   />
          //   <div className="mt-4 flex justify-between gap-2 font-bold">
          //     <div>
          //       <h3 className="text-md text-white line-clamp-3">
          //         <a className="cursor-pointer ">
          //           <span aria-hidden="true" className="absolute inset-0 " />
          //           {media.title}
          //         </a>
          //       </h3>
          //     </div>
          //   </div>
          // </div>
        })}
      </div>
    </>
  );
}
