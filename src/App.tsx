import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication, { authLoader } from "./pages/Authentication";
import { navLoader } from "./components/Navbar/ButtonContainer";
import DashBoard from "./pages/DashBoard";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} loader={navLoader} />
            <Route
                path="/auth"
                element={<Authentication />}
                loader={authLoader}
            />
            <Route path="/dashboard" element={<DashBoard />} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
