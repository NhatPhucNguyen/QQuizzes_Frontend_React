import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import DashBoard from "./pages/DashBoard";
import { navLoader, requireAuth } from "./utils/loader";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} loader={navLoader} />
            <Route
                path="/auth"
                element={<Authentication />}
                loader={requireAuth}
            />
            <Route path="/dashboard" element={<DashBoard />} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
