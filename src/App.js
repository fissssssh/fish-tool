import "./App.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import React from "react";
import routes from "./router";
import { Switch, Route, useLocation } from "react-router-dom";

const { Header, Footer, Content } = Layout;

export default function App() {
  let location = useLocation();
  return (
    <Layout style={{ height: "100vh", alignItems: "stretch" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          {routes.map((route) => (
            <Menu.Item key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: "24px", overflowY: "scroll" }}>
        <Switch>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              render={(props) => {
                document.title = route.meta.title + " - FishTool";
                return <route.component></route.component>;
              }}
            ></Route>
          ))}
        </Switch>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Fish Tool @2021 Create by fissssssh
      </Footer>
    </Layout>
  );
}
