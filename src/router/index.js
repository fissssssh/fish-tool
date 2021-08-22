import Base64 from "../modules/base64";
import Home from "../modules/home";
import JsonViewer from "../modules/json-viewer";
import Cropper from "../modules/cropper";

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
