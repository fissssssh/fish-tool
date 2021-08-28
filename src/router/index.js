import Base64 from "../views/base64";
import Home from "../views/home";
import JsonViewer from "../views/json-viewer";
import Cropper from "../views/cropper";

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/json-viewer",
    name: "JsonViewer",
    component: JsonViewer,
    meta: { title: "JsonViewer" },
  },
  {
    path: "/base64",
    name: "Base64",
    component: Base64,
    meta: { title: "Base64" },
  },
  {
    path: "/cropper",
    name: "Cropper",
    component: Cropper,
    meta: { title: "Cropper" },
  },
];
export default routes;
