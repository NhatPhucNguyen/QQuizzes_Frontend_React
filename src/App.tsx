import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Authentication />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
