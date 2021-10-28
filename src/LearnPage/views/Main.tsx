import React from "react";
import queryString from 'query-string';
import { changeHashTag } from '../store/dataSource'
import NavBar from '../components/NavBar'
import Core from './Core'

import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
  useRouteMatch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

interface Props {}

function Frame() {
  return <h2>Frame</h2>;
}

function ReactPage() {
  return <h2>React</h2>;
}
function VuePage() {
  return <h2>Vue</h2>;
}
function Browser() {
  return <h2>Browser</h2>;
}
function Performance() {
  return <h2>Performance</h2>;
}
function Micro() {
  return <h2>Micro</h2>;
}
function Other() {
  return <h2>Other</h2>;
}
export default function Main({}: Props): React.ReactElement {
  const hash = queryString.parseUrl(location.href, {parseFragmentIdentifier: true});
  changeHashTag(String(hash.fragmentIdentifier))
  return (
    <BrowserRouter>
      <div style={{display: 'flex', flexDirection:'column', height: '100vh'}}>
        <NavBar></NavBar>
        <Switch>
          <Route path="/LearnPage/home" exact>
            <Core />
          </Route>
          <Route path="/LearnPage/frame">
            <Frame />
          </Route>
          <Route path="/LearnPage/react">
            <ReactPage />
          </Route>
          <Route path="/LearnPage/vue">
            <VuePage />
          </Route>
          <Route path="/LearnPage/browser">
            <Browser />
          </Route>
          <Route path="/LearnPage/performance">
            <Performance />
          </Route>
          <Route path="/LearnPage/micro">
            <Micro />
          </Route>
          <Route path="/LearnPage/other">
            <Other />
          </Route>
          <Redirect to="/LearnPage/home"></Redirect>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
