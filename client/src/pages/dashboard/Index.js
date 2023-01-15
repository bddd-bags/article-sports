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
										<h3>Article</h3>
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
										<h3>Categories</h3>
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
									<div className="ms-3">
										<h3>Hello {username}, Have a nice day!</h3>
										{/* <p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Integer dignissim felis ac turpis fermentum, sed consequat
										velit pharetra. Maecenas commodo cursus augue sit amet
										vulputate. Cras ut urna sed felis pellentesque viverra.
										Aliquam erat volutpat. Sed a pellentesque sem. Nam sed
										ligula aliquam, cursus felis vitae, sollicitudin ipsum.
										Praesent maximus luctus purus at porta. Phasellus et justo
										sed leo gravida luctus. In ullamcorper purus non neque
										tincidunt, vel ultrices nibh auctor. Quisque eget laoreet
										nisi, et lobortis leo. Proin semper nunc mauris, a maximus
										sem commodo in. Phasellus sapien eros, laoreet eget
										consectetur a, laoreet non mauris. Lorem ipsum dolor sit
										amet, consectetur adipiscing elit. Vestibulum sit amet
										fermentum odio. Donec non velit non augue ullamcorper
										imperdiet a nec ante. Vestibulum et massa at est gravida
										consectetur id vitae nisl. Sed fringilla, libero a ultrices
										accumsan, nibh lacus molestie orci, non ultrices velit elit
										ac ex. Quisque vel ligula nibh. Morbi eleifend tristique
										risus, vitae interdum est vehicula ut. Nullam in dolor
										turpis. Nullam libero ex, feugiat nec volutpat vitae, rutrum
										eget mauris. Sed pellentesque blandit elementum. Donec eu
										nunc vulputate, fermentum nisl a, fermentum arcu. Orci
										varius natoque penatibus et magnis dis parturient montes,
										nascetur ridiculus mus. Sed accumsan massa lectus, at
										placerat nulla vulputate sit amet. Aenean a posuere dolor,
										vel aliquam elit. Etiam est felis, blandit a felis non,
										facilisis vulputate sem. Sed sit amet laoreet nibh. Proin
										vitae egestas dui. Nullam nec sem aliquam, interdum sem sit
										amet, congue nibh. Cras ullamcorper ultrices lacus, eget
										finibus est fermentum a. Phasellus ut nisl at quam euismod
										finibus. Cras et gravida libero. Duis tempor placerat augue
										id gravida. Sed enim purus, sodales quis suscipit eget,
										fermentum in velit. Suspendisse suscipit suscipit imperdiet.
										Aenean ut dui vitae risus sodales sollicitudin. Praesent
										facilisis eget lacus quis congue. In vel lacinia lacus.
										Nulla tincidunt dui erat, id ultrices nulla porta sit amet.
										Nullam pulvinar neque a elementum posuere. Donec aliquet in
										felis eget tristique. Donec convallis nibh metus, ut
										interdum dolor iaculis eu. Proin et dui et turpis rutrum
										placerat. Phasellus lacinia, augue et efficitur tempus,
										justo metus molestie orci, id sodales diam erat lacinia sem.
										Quisque dictum tellus at augue dignissim, non fermentum eros
										sagittis. Maecenas viverra vitae sapien sed pulvinar.
										Quisque finibus mi eget augue dignissim, at sodales ante
										aliquam.
									</p> */}
									</div>
								</div>
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
