import { Switch, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import User from "./pages/User";
import SideMenu from "./components/sidebar/SideMenu";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Creator from "./pages/Creator";
import SignIn from "./pages/Signin";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import PersistLogin from "./pages/PersistLogin";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorized from "./pages/UnAuthorized";
import RequireAuth from "./pages/RequireAuth";
import Pricing from "./pages/Pricing";
import EditUser from "./components/users/EditUser";

const App = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (pathname.toLowerCase() == "/signin" || pathname.toLowerCase() == "/signup" || pathname.toLowerCase() == "/unauthorized") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname])

  return (
    <div>
      {show === true && (
        <div>
          <Header />
        </div>
      )}

      <div style={{ display: show ? "flex" : "block" }}>
        {show === true && (
          <div>
            <SideMenu />
          </div>
        )}
        <div style={{ width: "100%" }} >
          <Switch>

            {/* public routes */}

            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>

            {/* private routes */}

            <Route
              exact
              path="/"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['User', 'Creator', 'Admin']}>
                    <Home />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/pricing"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['User', 'Creator', 'Admin']}>
                    <Pricing />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/admin"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['Admin']}>
                    <Admin />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/admin/:id"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['Admin']}>
                    <EditUser />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/creator"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['Admin', 'Creator']}>
                    <Creator />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/user"
              render={(props) => (
                <PersistLogin {...props} >
                  <RequireAuth {...props} allowedRoles={['Admin', 'Creator', 'User']}>
                    <User />
                  </RequireAuth>
                </PersistLogin>
              )}
            />

            <Route
              exact
              path="/unauthorized"
              render={(props) => (
                <PersistLogin {...props} >
                  <UnAuthorized />
                </PersistLogin>
              )}
            />

            {/* Page Not Found route */}
            <Route component={PageNotFound} />

          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
