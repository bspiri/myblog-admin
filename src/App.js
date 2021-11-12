import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PostList from "./pages/PostList";
import PostCreate from "./pages/PostCreate";
import PostUpdate from "./pages/PostUpdate";
import PortfolioList from "./pages/PortfolioList";
import PortfolioCreate from "./pages/PortfolioCreate";
import PortfolioUpdate from "./pages/PortfolioUpdate";
import Contact from "./pages/Contact";
import ContactDetails from "./pages/ContactDetails";
import SocialList from "./pages/SocialList";
import SocialCreate from "./pages/SocialCreate";
import SocialUpdate from "./pages/SocialUpdate";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserUpdate from "./pages/UserUpdate";
import About from "./pages/About";
import Logo from "./pages/Logo";
import Comments from "./pages/Comments";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(localStorage.getItem("isLogin"));
  const setLoginResult = (isLoggedIn) => {
    if (isLoggedIn) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  if (login) {
    return (
      <Router>
        <Layout setLoginResult={setLoginResult}>
          <Switch>
            <Route path="/post" exact component={PostList} />
            <Route path="/post/:post_id/comment" exact component={Comments} />
            <Route path="/logo" exact component={Logo} />
            <Route path="/about" exact component={About} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/post/new" exact component={PostCreate} />
            <Route path="/post/:id/update" exact component={PostUpdate} />
            <Route path="/portfolio" exact component={PortfolioList} />
            <Route path="/portfolio/new" exact component={PortfolioCreate} />
            <Route
              path="/portfolio/:id/update"
              exact
              component={PortfolioUpdate}
            />
            <Route path="/social" exact component={SocialList} />
            <Route path="/social/new" exact component={SocialCreate} />
            <Route path="/social/:id/update" exact component={SocialUpdate} />
            <Route path="/contact" exact component={Contact} />
            <Route
              path="/contact/:contact_id"
              exact
              component={ContactDetails}
            />
            <Route path="/user" exact component={UserList} />
            <Route path="/user/new" exact component={UserCreate} />
            <Route path="/user/:id/update" exact component={UserUpdate} />
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  } else {
    return <SignIn setLoginResult={setLoginResult} />;
  }
}

export default App;
