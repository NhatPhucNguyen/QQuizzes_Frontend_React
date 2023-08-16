import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
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
    requireAuth,
} from "./utils/loader";
import InitialContent from "./pages/DashBoard/InitialContent";
import MyQuizzes from "./pages/DashBoard/MyQuizzes";
import QuestionManagement from "./pages/QuestionManagement";
import QuestionList from "./pages/QuestionManagement/QuestionList";
import QuizPlay from "./pages/QuizPlay";
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
                        path="myQuizzes"
                        element={<MyQuizzes />}
                        loader={myQuizzesLoader}
                    />
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
                <Route path=":quizId" element={<QuizPlay />} loader={questionsLoader}/>
            </Route>
            <Route path="*" element={<h1>Not found</h1>} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
