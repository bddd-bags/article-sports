import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../../../actions/Article";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Message from "../../../components/Message";
import { Card, Button, Badge, Form } from "react-bootstrap";
import styles from "./Index.module.css";

function Article() {
	const BASE_URL = "http://localhost:3000";
	const [article, setArticle] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleteCheck, setDeleteCheck] = useState(false);
	const [search, setSearch] = useState("");
	const [filterData, setFilterData] = useState([]);

	useEffect(() => {
		if (search) {
			const filterArticle = article.filter((e) => {
				let title = e.title.toUpperCase();
				if (title.includes(search.toUpperCase())) return e;
				return null;
			});

			return setFilterData(filterArticle);
		}

		getData((res) => setArticle(res));
		setLoading(false);

		if (deleteCheck) {
			return setDeleteCheck(false);
		}
	}, [deleteCheck, filterData, search]);

	const deleteHandler = (id) => {
		deleteData(id, (res) => setDeleteCheck(res));
	};

	const searchHandler = (e) => {
		getData((res) => setArticle(res), search);

		e.preventDefault();
	};

	return (
		<>
			<div className={`${styles.root}`}>
				<Navbar />
				<div
					className={`mt-4 ${styles.sectionArticle}`}
					style={{ minHeight: "80vh" }}
				>
					<div className="row">
						<div className="col-12">
							<h1>Articles</h1>
							<p>List of Articles</p>
						</div>
						<div className="col-12">
							<hr className="mt-0" />
							<div className="d-flex justify-content-between mb-3">
								<div className="d-flex">
									<Form.Control
										type="search"
										placeholder="Search"
										className="me-2"
										aria-label="Search"
										size="sm"
										onChange={(e) => setSearch(e.target.value)}
									/>
									<Button
										variant="outline-success"
										onClick={searchHandler}
										size="sm"
									>
										Search
									</Button>
								</div>
								<Link to={"/dashboard/articles/add"}>
									<Button size="sm" className={styles.newColorBtn}>
										Add
									</Button>
								</Link>
							</div>
							{/* <hr /> */}

							<div className="row">
								{loading ? (
									<Message title={"Loading"} />
								) : !article.length ? (
									<Message title={"No article"} />
								) : !!search ? (
									!!search && !filterData.length ? (
										<Message title={"Article not found!"} />
									) : (
										<Data
											data={filterData}
											BASE_URL={BASE_URL}
											cbDelete={deleteHandler}
										/>
									)
								) : (
									<Data
										data={article}
										BASE_URL={BASE_URL}
										cbDelete={deleteHandler}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

const Data = ({ data, BASE_URL, cbDelete }) => {
	return (
		<>
			{data?.map((e) => {
				const update = e.updatedAt.split("").splice(0, 9).join("");
				console.log(update);
				return (
					<div key={e.id} className={`col-md-12 mb-4 px-0`}>
						<Card
							className={`d-flex flex-row ${styles.shadowCard}`}
							style={{ border: "none", borderRadius: "20px" }}
						>
							<div className={`${styles.imageCard} d-flex align-items-center`}>
								<Card.Img
									style={{
										borderRadius: "20px",
										maxHeight: "175px",
									}}
									src={`${BASE_URL}/assets/images/${e.img}`}
								/>
							</div>
							<Card.Body className="w-100 row align-items-between">
								<div>
									<small className="text-muted">Last updated at {update}</small>
									<Card.Title>{e.title}</Card.Title>
								</div>
								<Card.Text>
									{e.description.length > 120
										? e.description.substr(0, 120) + "...."
										: e.description}
								</Card.Text>
								<div className="d-flex align-items-center">
									<Link to={`/dashboard/articles/update/${e.slug}`}>
										<Badge bg="warning" className="p-2 me-2">
											Edit
										</Badge>
									</Link>
									<Badge
										bg="danger"
										onClick={() => cbDelete(e.id)}
										className="p-2 me-2"
									>
										Delete
									</Badge>
								</div>
							</Card.Body>
						</Card>
					</div>
				);
			})}
		</>
	);
};

export default Article;
