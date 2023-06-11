import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./protectedRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import User from "./pages/User";
import Dashboard from "./layout/Dashboard";
import FrontPage from "./pages/FrontPage";

const App = () => {
	return (
		<BrowserRouter>
			<ToastContainer
				transition={Zoom}
				autoClose={2000}
				position={"top-right"}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				draggable={false}
				pauseOnHover
				theme="dark"
			></ToastContainer>
			<Routes>
				<Route path="/" element={<FrontPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard/*" element={<Dashboard />} />
				</Route>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
