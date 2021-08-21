import App from "./App";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
import { zhCN } from "antd/lib/locale/zh_CN";
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <App />
    </Router>
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
