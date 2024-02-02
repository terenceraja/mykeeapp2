//CSS
import "./App.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// ROUTE DEFINITION
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//IMPORT PAGES
import Cons from "./pages/Cons/Cons";
import Ptf from "./pages/Ptf/Ptf";
import DetPtf from "./pages/DetPtf/DetPtf";
import Mvt from "./pages/Mvt/Mvt";
import Log from "./pages/Log/Log";
import Layout from "./pages/Layout/Layout";

// CHARTJS & PLUGINS
import { Chart as ChartJS } from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// ChartJS.register(ChartDataLabels);

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Log />, index: true }, // Log component as the main index
    {
      path: "/layout", // or any other path you want for the Layout component
      element: <Layout />,
      children: [
        { path: "ptf", element: <Ptf /> },
        { path: "detPtf", element: <DetPtf /> },
        { path: "cons", element: <Cons /> },
        { path: "mvt", element: <Mvt /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
