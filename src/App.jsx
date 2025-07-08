// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import GameMenu from "./pages/game/GameMenu";
import {
  AuthMiddleware,
  IsAdmin,
  LoggedInMiddleware,
  RoleMiddleware,
} from "./middleware/AuthMiddleware";
import GameTutorial from "./pages/game/GameTutorial";
import OrientationWarning from "./OrientationWarning";
import GamePlay from "./pages/game/GamePlay";
import Dashboard from "./pages/admin/Dashboard";
import Edit from "./pages/admin/Edit";

function App() {
  return (
    <>
      <OrientationWarning />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoggedInMiddleware>
                <Home />
              </LoggedInMiddleware>
            }
          />
          <Route
            path="/login"
            element={
              <LoggedInMiddleware>
                <Login />
              </LoggedInMiddleware>
            }
          />
          <Route
            path="/register"
            element={
              <LoggedInMiddleware>
                <Register />
              </LoggedInMiddleware>
            }
          />

          <Route
            path="/game"
            element={
              <AuthMiddleware>
                <RoleMiddleware>
                  <GameMenu />
                </RoleMiddleware>
              </AuthMiddleware>
            }
          />
          <Route
            path="/game/tutorial"
            element={
              <AuthMiddleware>
                <GameTutorial />
              </AuthMiddleware>
            }
          />
          <Route
            path="/game/play"
            element={
              <AuthMiddleware>
                <GamePlay />
              </AuthMiddleware>
            }
          />
          {/* ADMIN */}
          <Route
            path="/dashboard"
            element={
              <AuthMiddleware>
                <IsAdmin>
                  <Dashboard />
                </IsAdmin>
              </AuthMiddleware>
            }
          />
          <Route
            path="/dashboard/edit"
            element={
              <AuthMiddleware>
                <IsAdmin>
                  <Edit />
                </IsAdmin>
              </AuthMiddleware>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
