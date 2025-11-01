import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";
import { useTokenValidator } from "./hooks";

export default function Layout() {
  useTokenValidator();

  return (
    <div className="font-mono text-cyan-700">
      <Menu />
      <div className="max-w-6xl mx-auto w-full min-h-screen  bg-gray-900 text-sky-900">
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
