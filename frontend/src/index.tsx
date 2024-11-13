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
import L1NewWord from "./Components/LessonProcess/AllLessons/Lesson1/L1NewWord";
import L1FillWord from "./Components/LessonProcess/AllLessons/Lesson1/L1FillWord";
import Verify from "./Components/Register/Verify/Verify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound></NotFound>}></Route>
          <Route path="/not-found" element={<NotFound></NotFound>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/verify/:verifyId" element={<Verify></Verify>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
          <Route path="/lessons" element={<Lessons></Lessons>}></Route>
          <Route
            path="/lesson/1/1"
            element={<L1NewWord lessonId={1} exerciseId={1}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/2"
            element={<L1NewWord lessonId={1} exerciseId={2}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/3"
            element={<L1NewWord lessonId={1} exerciseId={3}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/4"
            element={<L1NewWord lessonId={1} exerciseId={4}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/5"
            element={<L1NewWord lessonId={1} exerciseId={5}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/6"
            element={<L1NewWord lessonId={1} exerciseId={6}></L1NewWord>}
          ></Route>
          <Route
            path="/lesson/1/7"
            element={<L1FillWord lessonId={1} exerciseId={7}></L1FillWord>}
          ></Route>
          <Route
            path="/lesson/1/8"
            element={
              <L1FillWord
                lessonId={1}
                exerciseId={8}
                isLastExercise
              ></L1FillWord>
            }
          ></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
