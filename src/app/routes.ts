import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import InterestsPage from "./pages/InterestsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/experience",
    Component: ExperiencePage,
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
