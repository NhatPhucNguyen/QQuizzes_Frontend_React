import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import DashBoard from "./pages/DashBoard";
import {
    authFormAccess,
    myQuizzesLoader,
    navLoader,
    questionsLoader,
    quizLoader,
    quizPlayLoader,
    requireAuth,
} from "./utils/loader";
import InitialContent from "./pages/DashBoard/InitialContent";
import MyQuizzes from "./pages/DashBoard/MyQuizzes";
import QuestionManagement from "./pages/QuestionManagement";
import QuestionList from "./pages/QuestionManagement/QuestionList";
import QuizPlay from "./pages/QuizPlay";
import QuizzesSearch from "./pages/DashBoard/QuizzesSearch";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} loader={navLoader} />
            <Route
                path="/auth"
                element={<Authentication />}
                loader={authFormAccess}
            />
            <Route path="/dashboard" loader={requireAuth}>
                <Route path="" element={<DashBoard />}>
                    <Route index element={<InitialContent />} />
                    <Route
                        path=":role/quizzes"
                        element={<MyQuizzes />}
                        loader={myQuizzesLoader}
                    />
                    <Route path="quizzes" element={<QuizzesSearch />} />
                </Route>
            </Route>
            <Route path="/admin/quizzes" loader={requireAuth}>
                <Route
                    path=":quizId"
                    element={<QuestionManagement />}
                    loader={quizLoader}
                    id="quiz"
                >
                    <Route
                        path="questions"
                        element={<QuestionList />}
                        loader={questionsLoader}
                        id="questions"
                    />
                </Route>
            </Route>
            <Route path="/play" loader={requireAuth}>
                <Route index element={<Navigate to={"/dashboard"} />} />
                <Route
                    path=":quizId"
                    element={<QuizPlay />}
                    loader={quizPlayLoader}
                />
            </Route>
            <Route path="*" element={<h1>Not found</h1>} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
