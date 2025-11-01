import { useParams } from "react-router-dom";
import { InfiniteList } from "./InfiniteList";

function InfiniteListWrapper() {
  const { typeMedia } = useParams();

  return <InfiniteList key={typeMedia} />;
}

export default InfiniteListWrapper;
