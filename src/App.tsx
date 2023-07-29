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
    myCollectionsLoader,
    navLoader,
    requireAuth,
} from "./utils/loader";
import MultipleChoiceCreate from "./pages/MultipleChoiceCreate";
import InitialContent from "./components/InitialContent";
import MyCollection from "./components/MyCollection";
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
                        path="myCollection"
                        element={<MyCollection />}
                        loader={myCollectionsLoader}
                    />
                </Route>
            </Route>
            <Route
                path={"admin/collection/:collectionName/create/"}
                element={<MultipleChoiceCreate />}
                loader={collectionLoader}
            />
            <Route path="*" element={<h1>Not found</h1>} />
        </>
    )
);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
