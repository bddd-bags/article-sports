import React, { useEffect, useState } from "react";
import { getData, deleteData } from "../../../actions/Article";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import Message from "../../../components/Message";
import { Card, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
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
							<div className="d-flex justify-content-between justify-content-sm-start ">
								<h1>Articles</h1>
								<Link className="d-sm-none" to={"/dashboard/articles/add"}>
									<Button size="sm" className={styles.newColorBtn}>
										Add
									</Button>
								</Link>
							</div>
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
								<Link
									className="d-none d-sm-block"
									to={"/dashboard/articles/add"}
								>
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
				const update = e.updatedAt.split("").splice(0, 10).join("");
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
									<Card.Title>
										<div className="d-block d-sm-none">
											{e.title.length > 30
												? e.title.substr(0, 30) + "...."
												: e.title}
										</div>
										<div className="d-none d-sm-block">
											{e.title.length > 88
												? e.title.substr(0, 88) + "...."
												: e.title}
										</div>
									</Card.Title>
								</div>
								<Card.Text className={styles.textJustify}>
									<div className="d-block d-sm-none">
										{e.description.length > 65
											? e.description.substr(0, 65) + "...."
											: e.description}
									</div>
									<div className="d-none d-sm-block">
										{e.description.length > 120
											? e.description.substr(0, 120) + "...."
											: e.description}
									</div>
								</Card.Text>
								<div className="d-flex align-items-end">
									<DropdownButton
										variant="outline-primary"
										title="Action"
										id="input-group-dropdown-1"
										size="sm"
									>
										<Link
											to={`/dashboard/articles/${e.slug}`}
											className={`${styles.dropdownItem}`}
										>
											Detail
										</Link>
										<Dropdown.Divider />
										<Link
											to={`/dashboard/articles/update/${e.slug}`}
											className={`${styles.dropdownItem}`}
										>
											Edit
										</Link>
										<Dropdown.Divider />
										<Dropdown.Item onClick={() => cbDelete(e.id)}>
											Delete
										</Dropdown.Item>
									</DropdownButton>
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
