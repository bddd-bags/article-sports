import React from "react";
import NavbarComponent from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "./Index.module.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { postData } from "../../../actions/Article/index";
import { getData as getDataCategories } from "../../../actions/Category/index";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Add = () => {
	const [form, setForm] = useState({
		title: "",
		description: "",
		category_id: 0,
	});
	const [img, setImg] = useState({});
	const [post, setPost] = useState(false);
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getDataCategories((res) => setCategories(res));
	}, []);

	useEffect(() => {
		if (post) {
			navigate("/dashboard/articles");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Article has been saved!",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}, [post, navigate]);

	const handleSubmit = (e) => {
		postData(form, img, (res) => setPost(res));
		e.preventDefault();
	};

	return (
		<>
			<div className={styles.root}>
				<NavbarComponent />
				<section
					className={` my-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<h1>Add new Articles</h1>
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
									onChange={(e) => setForm({ ...form, title: e.target.value })}
									type="text"
									size="sm"
									placeholder="Enter title"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formGridDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									onChange={(e) =>
										setForm({ ...form, description: e.target.value })
									}
									style={{ height: "100px" }}
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
											setForm({ ...form, category_id: e.target.value });
										}}
										// value={form.category_id}
										defaultValue={form.category_id}
									>
										{!categories.length ? (
											<option>...</option>
										) : (
											categories.map((e, i) => {
												return (
													<option key={i} value={e.id}>
														{e.name}
													</option>
												);
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
									Submit
								</Button>
							</div>
						</Form>
					</div>
				</section>
				<Footer />
			</div>
		</>
	);
};

export default Add;
