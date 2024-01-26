import { QueryClient, QueryClientProvider } from "react-query";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ModalProvider from "./context/ModalContext";
import Authentication from "./pages/Authentication";
import DashBoard from "./pages/DashBoard";
import InitialContent from "./pages/DashBoard/InitialContent";
import MyQuizzes from "./pages/DashBoard/MyQuizzes";
import QuizzesSearch from "./pages/DashBoard/QuizzesSearch";
import Home from "./pages/Home";
import QuestionManagement from "./pages/QuestionManagement";
import QuestionList from "./pages/QuestionManagement/QuestionList";
import QuizPlay from "./pages/QuizPlay";
import {
    authFormAccess,
    navLoader,
    questionsLoader,
    quizLoader,
    quizPlayLoader,
    requireAuth,
} from "./utils/loader";
import NotFound from "./pages/NotFound";
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
                <Route
                    path=""
                    element={
                        <ModalProvider>
                            <DashBoard />
                        </ModalProvider>
                    }
                >
                    <Route index element={<InitialContent />} />
                    <Route path="admin/quizzes" element={<MyQuizzes />} />
                    <Route path="quizzes" element={<QuizzesSearch />} />
                </Route>
            </Route>
            <Route
                path="/admin/quizzes"
                loader={requireAuth}
                errorElement={<NotFound />}
            >
                <Route index element={<Navigate to={"questions"} />} />
                <Route
                    path=":quizId"
                    element={
                        <ModalProvider>
                            <QuestionManagement />
                        </ModalProvider>
                    }
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
            <Route path="*" element={<NotFound />} />
        </>
    )
);
const client = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
