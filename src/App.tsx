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
    collectionLoader,
    navLoader,
    requireAuth,
} from "./utils/loader";
import MultipleChoiceCreate from "./pages/MultipleChoiceCreate";
import InitialContent from "./components/InitialContent";
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
                </Route>
                <Route
                    path={"collection/:collectionName/create/"}
                    element={<MultipleChoiceCreate />}
                    loader={collectionLoader}
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
