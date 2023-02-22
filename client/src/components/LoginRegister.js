import React from "react";
import styles from "./LoginRegister.module.css";
import news from "../images/news.png";
import { Link } from "react-router-dom";

const LoginRegisterComponent = ({ el, name }) => {
	return (
		<>
			<div>
				<div className="row m-0" style={{ minHeight: "100vh", width: "100%" }}>
					<div
						className="col-md-5 p-0"
						style={{ backgroundColor: "#33d6a5" }}
					></div>
					<div className="col-md-7 p-0"></div>
					<div className={`${styles.login}`}>
						<div className={`${styles.loginCardBox} container my-5`}>
							<div className="row">
								<div className="col-md-5 d-none d-md-block">
									<div
										className="d-flex align-items-center flex-wrap"
										style={{ minHeight: "75vh" }}
									>
										<div className="w-100 pe-md-4">
											<div className="text-center mb-4">
												<img
													className={`${styles.newsImage}`}
													src={news}
													alt="logo"
												/>
											</div>
											<div className="text-center">
												<h2 className="fw-bold mb-2">Article Sports</h2>
												<p className="px-4 mx-2">
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit, sed do eiusmod tempor incididunt ut labore et
													dolore magna aliqua.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-7 bg-white">
									<div className="w-100">
										<div className="">
											<p className="text-end px-4 pt-2 mb-0">
												{name !== "Register" ? (
													<Link to={"/register"}>Register?</Link>
												) : (
													<Link to={"/"}>Login?</Link>
												)}
											</p>
										</div>
										<div
											className="row align-items-center justify-content-center pe-md-4"
											style={{ minHeight: "calc(70vh - 40px)" }}
										>
											<div className="col-md-8">
												<h4 className="text-center fw-bold mb-3">{name}</h4>
												{/* <Form onClick={loginClick}> */}
												{el}
												{/* </Form> */}
											</div>
										</div>
										<div style={{ height: "40px" }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginRegisterComponent;
