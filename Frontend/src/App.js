import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "~/global/global.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import authoService from "~/services/authoService";
import NotFound from "~/pages/Common/NotFound";

import {
  publicRoutes,
  privateRoutes,
  privateAdminRoutes,
} from "./routes/routes";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    authoService.currentUser().then((res) => setCurrentUser(res));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  currentUser?.role?.some(
                    (x) => x.name === "QUẢN LÝ" || x.name === "NHÂN VIÊN"
                  ) ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <NotFound />
                  )
                }
              />
            );
          })}
          {privateAdminRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = Fragment;
            if (route.layout) {
              Layout = route.layout;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  currentUser?.role?.some((x) => x.name === "QUẢN LÝ") ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <NotFound />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
