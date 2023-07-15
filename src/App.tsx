import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Authentication, { authLoader } from "./pages/Authentication";
import { navLoader } from "./components/Navbar/ButtonContainer";
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} loader={navLoader} />
            <Route
                path="/auth"
                element={<Authentication />}
                loader={authLoader}
            />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
