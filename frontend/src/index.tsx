import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { ThemeProvider } from "@mui/material/styles";
import "./index.scss";
import { defaultTheme } from "./defaultTheme";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import About from "./Components/About/About";
import Profile from "./Components/Profile/Profile";
import Lessons from "./Components/Lessons/Lessons";
import Logout from "./Components/Logout/Logout";
import reportWebVitals from "./reportWebVitals";
import LessonProcess from "./Components/LessonProcess/LessonProcess";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route
              path="/profile/:userId"
              element={<Profile></Profile>}
            ></Route>
            <Route path="/lessons" element={<Lessons></Lessons>}></Route>
            <Route
              path="/lesson/:lessonId"
              element={<LessonProcess></LessonProcess>}
            ></Route>
            <Route path="/logout" element={<Logout></Logout>}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
