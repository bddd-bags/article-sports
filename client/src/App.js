import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Article from "./pages/dashboard/article/Index";
import Dashboard from "./pages/dashboard/Index";
import AddArticle from "./pages/dashboard/article/Add";
import UpdateArticle from "./pages/dashboard/article/Update";
import Category from "./pages/dashboard/category/Index";
import AddCategory from "./pages/dashboard/category/Add";
import UpdateCategory from "./pages/dashboard/category/Update";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<>
			<div className="App">
				<Routes>
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/articles" element={<Article />} />
					<Route
						path="/dashboard/articles/update/:slug"
						element={<UpdateArticle />}
					/>
					<Route path="/dashboard/articles/add" element={<AddArticle />} />
					<Route path="/dashboard/categories" element={<Category />} />
					<Route path="/dashboard/categories/add" element={<AddCategory />} />
					<Route
						path="/dashboard/categories/update/:id"
						element={<UpdateCategory />}
					/>
					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
