import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./Index.module.css";
import { BsFillBookmarkCheckFill, BsUiRadios } from "react-icons/bs";
import { WiDaySunnyOvercast } from "react-icons/wi";
import { getData as getArticle } from "../../actions/Article/index";
import { getData as getCategory } from "../../actions/Category/index";

function Dashboard() {
	const [article, setArticle] = useState([]);
	const [category, setCategory] = useState([]);
	const [username] = useState(localStorage.getItem("username"));

	useEffect(() => {
		getArticle((res) => setArticle(res));
		getCategory((res) => setCategory(res));
	}, []);

	return (
		<>
			<div style={{ backgroundColor: "#ebebeb7a" }}>
				<NavbarComponent />
				<div className="container">
					<div
						className="row align-items-center py-5"
						style={{ minHeight: "calc(100vh - 70px)" }}
					>
						<div className="col-md-6 mb-4">
							<div className={`${styles.dashboardCard}`}>
								<div className="d-flex justify-content-around align-items-center">
									<BsFillBookmarkCheckFill size={100} color={"#27d956"} />
									<div>
										<h3 className="fw-bold">Article</h3>
										<p>Articles that you have uploaded</p>
										<h1 className="text-center">{article.length}</h1>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6 mb-4">
							<div className={`${styles.dashboardCard}`}>
								<div className="d-flex justify-content-around align-items-center">
									<BsUiRadios size={100} />
									<div>
										<h3 className="fw-bold">Categories</h3>
										<p>Number of categories</p>
										<h1 className="text-center">{category.length}</h1>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-12 mt-2">
							<div className={`${styles.dashboardCard}`}>
								<div className="d-flex align-items-center">
									<WiDaySunnyOvercast size={100} />
									<div className="ms-4">
										<h3>Hello {username}, Have a nice day!</h3>
									</div>
								</div>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
									consequat mauris vel tempus mattis. Sed eu laoreet tortor, ac
									porttitor augue. Quisque ligula lorem, rhoncus nec laoreet at,
									tincidunt vel enim. Phasellus non efficitur sapien, in rutrum
									libero. Donec id magna urna. In in ultrices nisi, ac maximus
									ipsum.
								</p>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Dashboard;
