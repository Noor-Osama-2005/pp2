import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllIssues } from "./pages/AllIssues";
import { IssueViewer } from "./pages/IssueViewer";
import { ArticlePage } from "./pages/ArticlePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "issues", Component: AllIssues },
      { path: "issue/:id", Component: IssueViewer },
      { path: "article/:id", Component: ArticlePage },
    ],
  },
]);
