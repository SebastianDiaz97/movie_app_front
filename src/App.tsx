import "./App.css";
import { MovieCard } from "./components/MovieCard";
import { useTokenValidator } from "./hooks";

function App() {
  useTokenValidator();

  return (
    <>
      <div className="">
        <MovieCard />
      </div>
    </>
  );
}

export default App;
