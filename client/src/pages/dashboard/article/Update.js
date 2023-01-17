import React, { useState, useEffect } from "react";
import styles from "./Index.module.css";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate, useParams, Link } from "react-router-dom";
import { findOne, updateData } from "../../../actions/Article/index";
import { getData as getDataCategories } from "../../../actions/Category/index";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

function Update() {
	const { slug } = useParams();
	const [article, setArticle] = useState({});
	const [img, setImg] = useState({});
	const [categories, setCategories] = useState([]);
	const [update, setUpdate] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getDataCategories((res) => setCategories(res));
	}, []);

	useEffect(() => {
		if (update) {
			navigate("/dashboard/articles");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Article has been updated!",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}, [update, navigate]);

	useEffect(() => {
		findOne(slug, (res) => setArticle(res));
	}, [slug]);

	const handleSubmit = (e) => {
		updateData(article, img, article.id, (res) => setUpdate(res));

		e.preventDefault();
	};

	return (
		<>
			<div className={styles.root}>
				<Navbar />
				<section
					className={` my-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<h1>Update Articles</h1>
					<div
						className="bg-white p-3 my-3"
						style={{
							borderRadius: "5px",
							boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
						}}
					>
						<Form onSubmit={handleSubmit}>
							<Form.Group as={Col} className="mb-3" controlId="formGridTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control
									onChange={(e) =>
										setArticle({ ...article, title: e.target.value })
									}
									type="text"
									size="sm"
									value={article.title}
									placeholder="Enter title"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formGridDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									onChange={(e) =>
										setArticle({ ...article, description: e.target.value })
									}
									style={{ height: "100px" }}
									value={article.description}
									size="sm"
									placeholder="Description"
								/>
							</Form.Group>

							<Row className="mb-3">
								<Form.Group as={Col} controlId="formGridState">
									<Form.Label>Category</Form.Label>
									<Form.Select
										size="sm"
										onChange={(e) => {
											setArticle({ ...article, category_id: e.target.value });
										}}
										defaultValue={article.category_id}
									>
										{!categories.length ? (
											<option>...</option>
										) : (
											categories.map((e, i) => {
												if (+e.id === +article.category_id) {
													return (
														<option key={i} value={e.id} selected>
															{e.name}
														</option>
													);
												} else {
													return (
														<option key={i} value={e.id}>
															{e.name}
														</option>
													);
												}
											})
										)}
									</Form.Select>
								</Form.Group>
								<Form.Group controlId="formFileSm" as={Col} className="mb-3">
									<Form.Label size="sm">Image</Form.Label>
									<Form.Control
										onChange={(e) => setImg(e.target.files[0])}
										type="file"
										size="sm"
									/>
								</Form.Group>
							</Row>

							<div className="d-flex justify-content-end">
								<Link to={"/dashboard/articles"}>
									<Button size="sm" variant="secondary" className="mx-2">
										Back
									</Button>
								</Link>
								<Button
									size="sm"
									className={`${styles.newColorBtn} mx-2`}
									type="submit"
								>
									Update
								</Button>
							</div>
						</Form>
					</div>
				</section>
				<Footer />
			</div>
		</>
	);
}

export default Update;
