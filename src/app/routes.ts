import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import InterestsPage from "./pages/InterestsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/projects",
    Component: ProjectsPage,
  },
  {
    path: "/interests",
    Component: InterestsPage,
  },
]);
