import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

interface Props {}
function Home() {
  return <h2>123123</h2>;
}

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
    <Router>
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
    </Router>
  );
}
