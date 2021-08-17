import Home from "../modules/home";
import JsonViewer from "../modules/json-viewer";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/json-viewer", name: "JsonViewer", component: JsonViewer },
];
export default routes;
