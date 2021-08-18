import Home from "../modules/home";
import JsonViewer from "../modules/json-viewer";

const routes = [
  { path: "/", exact: true, name: "Home", component: Home, meta: { title: "Home" } },
  { path: "/json-viewer", name: "JsonViewer", component: JsonViewer, meta: { title: "JsonViewer" } },
];
export default routes;
