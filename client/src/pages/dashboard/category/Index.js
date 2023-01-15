import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table, Badge } from "react-bootstrap";
import Navbar from "../../../components/Navbar";
import Message from "../../../components/Message";
import Footer from "../../../components/Footer";
import styles from "./Index.module.css";
import { getData, deleteData } from "../../../actions/Category/index";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleteCheck, setDeleteCheck] = useState(false);

	useEffect(() => {
		getData((res) => setCategories(res));
		setLoading(false);
		if (deleteCheck) {
			return setDeleteCheck(false);
		}
	}, [deleteCheck]);

	const deleteHandler = (id) => {
		deleteData(id, (res) => setDeleteCheck(res));
	};

	return (
		<div className={`${styles.root}`}>
			<Navbar />
			<div
				className={`my-4 ${styles.sectionArticle}`}
				style={{ minHeight: "80vh" }}
			>
				<div className="row">
					<div className="col-12">
						<h1>Categories</h1>
						<p>List of Categories</p>
					</div>
					<div className="col-12">
						<Card className={styles.shadowCard}>
							<Card.Header>
								<div className="d-flex justify-content-end">
									<Link to={"/dashboard/categories/add"}>
										<Button size="sm" className={`${styles.newColorBtn}`}>
											Add
										</Button>
									</Link>
								</div>
							</Card.Header>
							<Card.Body>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th style={{ width: "10%", textAlign: "center" }}>No</th>
											<th style={{ width: "70%" }}>Name</th>
											<th style={{ width: "20%" }}>Action</th>
										</tr>
									</thead>
									<tbody>
										{loading ? (
											<Message title={"Loading"} />
										) : (
											categories.map((e, i) => {
												return (
													<tr key={i}>
														<td className="text-center">{++i}</td>
														<td>{e.name}</td>
														<td>
															<div className="d-flex justify-content-center">
																<Link
																	to={`/dashboard/categories/update/${e.id}`}
																>
																	<Badge className="mx-1" bg="warning">
																		Edit
																	</Badge>
																</Link>
																<Link>
																	<Badge
																		onClick={() => deleteHandler(e.id)}
																		className="mx-1"
																		bg="danger"
																	>
																		Delete
																	</Badge>
																</Link>
															</div>
														</td>
													</tr>
												);
											})
										)}
									</tbody>
								</Table>
							</Card.Body>
						</Card>

						<div className="row"></div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Category;
