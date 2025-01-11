import { createRoot } from "react-dom/client";
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
import L1NewWord from "./Components/LessonProcess/AllLessons/NewWord";
import L1FillWord from "./Components/LessonProcess/AllLessons/FillWord";
import Verify from "./Components/Register/Verify/Verify";
import DeleteAccount from "./Components/DeleteAccount/DeleteAccount";
import Admin from "./Components/Admin/Admin";
import AdminPanel from "./Components/Admin/AdminPanel/AdminPanel";
import LessonExercise from "./Components/LessonProcess/AllLessons/LessonExercise";
import SubpagesEdit from "./Components/Admin/AdminPanel/Subpages/SubpagesEdit";
import SubpagesAdd from "./Components/Admin/AdminPanel/Subpages/SubpagesAdd";
import LessonsEdit from "./Components/Admin/AdminPanel/Lessons/LessonsEdit";
import ExerciseCreator from "./Components/Admin/AdminPanel/Lessons/ExerciseCreator";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="*" element={<NotFound></NotFound>}></Route>
          <Route path="/not-found" element={<NotFound></NotFound>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/verify/:verifyId" element={<Verify></Verify>}></Route>
          <Route
            path="/delete-account/:deleteId"
            element={<DeleteAccount></DeleteAccount>}
          ></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/profile/:userId" element={<Profile></Profile>}></Route>
          <Route path="/lessons" element={<Lessons></Lessons>}></Route>
          <Route
            path="/lesson/:lessonId/:exerciseId"
            element={<LessonExercise></LessonExercise>}
          ></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
          <Route
            path="/admin/panel"
            element={<AdminPanel></AdminPanel>}
          ></Route>
          <Route
            path="/admin/panel/subpages/edit"
            element={<SubpagesEdit></SubpagesEdit>}
          ></Route>
          <Route
            path="/admin/panel/subpages/add"
            element={<SubpagesAdd></SubpagesAdd>}
          ></Route>
          <Route
            path="/admin/panel/lessons/edit/:lessonId"
            element={<LessonsEdit></LessonsEdit>}
          ></Route>
          <Route
            path="/admin/panel/lessons/creator/:lessonId/:exerciseId"
            element={<ExerciseCreator></ExerciseCreator>}
          ></Route>
          <Route path="/logout" element={<Logout></Logout>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
