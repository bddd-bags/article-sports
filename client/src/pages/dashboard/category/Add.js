import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Form, Col, Button } from "react-bootstrap";
import styles from "./Index.module.css";
import { postData } from "../../../actions/Category";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Add = () => {
	const [name, setName] = useState("");
	const [post, setPost] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (post) {
			navigate("/dashboard/categories");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Category has been saved!",
				showConfirmButton: false,
				timer: 1500,
			});
			setPost(false);
		}
	}, [post, navigate]);

	const handleOnSubmit = (e) => {
		postData(name, (res) => setPost(res));
		e.preventDefault();
	};

	return (
		<>
			<div className={`${styles.root}`}>
				<Navbar />
				<section
					className={` mt-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<h1>Add new Categories</h1>
					<div
						className="bg-white p-3 my-3"
						style={{
							borderRadius: "5px",
							boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
						}}
					>
						<Form onSubmit={handleOnSubmit}>
							<Form.Group as={Col} className="mb-3" controlId="formGridTitle">
								<Form.Label>Name</Form.Label>
								<Form.Control
									onChange={(e) => setName(e.target.value)}
									type="text"
									size="sm"
									placeholder="Enter Name"
								/>
							</Form.Group>

							<div className="d-flex justify-content-end">
								<Link to={"/dashboard/categories"}>
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
