import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import DashBoard from "./pages/DashBoard/DashBoard";
import {
    authFormAccess,
    myQuizzesLoader,
    navLoader,
    quizLoader,
    requireAuth,
} from "./utils/loader";
import MultipleChoiceCreate from "./pages/MultipleChoiceCreate";
import InitialContent from "./pages/DashBoard/InitialContent";
import MyQuizzes from "./pages/DashBoard/MyQuizzes";
import QuestionManagement from "./pages/QuestionManagement";
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
            <Route path="admin/quizzes/:quizId">
                <Route index element={<QuestionManagement />} />
                <Route
                    path="create"
                    element={<MultipleChoiceCreate />}
                    loader={quizLoader}
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
