import "./App.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import React from "react";
import routes from "./router";

import { Switch, Route } from "react-router-dom";

const { Header, Footer, Content } = Layout;
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
            {routes.map((route) => (
              <Menu.Item key={route.path}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content>
          <Switch>
            {routes.map((route) => (
              <Route key={route.path} exact path={route.path} component={route.component}></Route>
            ))}
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;
