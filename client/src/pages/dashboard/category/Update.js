import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "./Index.module.css";
import { Button, Form, Col } from "react-bootstrap";
import { findOne, updateData } from "../../../actions/Category/index";
import Swal from "sweetalert2";

const Update = () => {
	const { id } = useParams();
	const [form, setForm] = useState({});
	const [update, setUpdate] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		findOne(id, (res) => setForm(res));
		if (update) {
			navigate("/dashboard/categories");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Category has been updated!",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}, [id, update, navigate]);

	const handleOnSubmit = (e) => {
		updateData(id, form, (res) => setUpdate(res));
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
					<h1>Update Category</h1>
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
									onChange={(e) => setForm({ ...form, name: e.target.value })}
									value={form.name}
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
};

export default Update;
