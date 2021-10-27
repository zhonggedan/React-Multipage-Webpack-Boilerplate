import React from "react";
import Home from './Home'
import {
  BrowserRouter as Routser,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

interface Props {}

function About() {
  return <h2>About1</h2>;
}

function Users() {
  return <h2>
    <a href="/Page1">跳转到page1</a>
    <a href="/Page2">跳转到page2</a>
  </h2>;
}
export default function Main({}: Props): React.ReactElement {
  return (
    <Routser>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/IndexPage">Home</Link>
            </li>
            <li>
              <Link to="/IndexPage/about">About</Link>
            </li>
            <li>
              <Link to="/IndexPage/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/IndexPage/about" exact>
            <About />
          </Route>
          <Route path="/IndexPage/users">
            <Users />
          </Route>
          <Route path="/IndexPage">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Routser>
  );
}
