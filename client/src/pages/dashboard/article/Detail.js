import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import styles from "./Index.module.css";
import { findOne } from "../../../actions/Article";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLeftCircle } from "react-icons/ai";

const Detail = () => {
	const BASE_URL = "http://localhost:3000";
	const { slug } = useParams();
	const [article, setArticle] = useState({});

	useEffect(() => {
		findOne(slug, (res) => setArticle(res));
	}, [slug]);

	const dateUp = !article.createdAt
		? ""
		: article.createdAt.split("").splice(0, 10).join("");

	console.log(article.user);

	return (
		<>
			<div className={`${styles.root}`}>
				<Navbar />
				<div
					className={`mt-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<div className={`py-3`}>
						<h1>{article.title}</h1>
						<div className="text-muted d-flex justify-content-between py-2">
							<p className="text-lowercase">
								{!article.user ? "" : article.user.username}
								<span className="fw-bold mx-2">&#183;</span>
								created {dateUp}
							</p>
							<p>{!article.category ? "" : article.category.name}</p>
						</div>
						<img
							src={`${BASE_URL}/assets/images/${article.img}`}
							alt="img"
							style={{
								maxHeight: "480px",
								objectFit: "cover",
								objectPosition: "center",
							}}
							className="w-100 mb-3"
						/>
						<div
							className={`pt-3 ${styles.textJustify}`}
							style={{ textIndent: "50px" }}
						>
							<p style={{ letterSpacing: "0.7px" }}>{article.description}</p>
						</div>
						<div className="d-flex">
							<Link
								to={"/dashboard/articles"}
								style={{ textDecoration: "none" }}
							>
								<p className="d-flex align-items-center">
									<span className="me-2">
										<AiOutlineLeftCircle size={25} />
									</span>
									<span style={{ borderBottom: "1px solid blue" }}>Back</span>
								</p>
							</Link>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Detail;
