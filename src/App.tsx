import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import DashBoard from "./pages/DashBoard";
import { authFormAccess, navLoader, requireAuth } from "./utils/loader";
import MultipleChoiceCreate from "./pages/MultipleChoiceCreate";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} loader={navLoader} />
            <Route
                path="/auth"
                element={<Authentication />}
                loader={authFormAccess}
            />
            <Route
                path="/dashboard"
                element={<DashBoard />}
                loader={requireAuth}
            />
            <Route path="/collection/create" element={<MultipleChoiceCreate/>} loader={requireAuth}/>
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
