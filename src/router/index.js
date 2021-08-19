import Base64 from "../modules/base64";
import Home from "../modules/home";
import JsonViewer from "../modules/json-viewer";

const routes = [
  { path: "/", exact: true, name: "Home", component: Home, meta: { title: "Home" } },
  { path: "/json-viewer", name: "JsonViewer", component: JsonViewer, meta: { title: "JsonViewer" } },
  { path: "/base64", name: "Base64", component: Base64, meta: { title: "Base64" } },
];
export default routes;
