import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import news from "../images/news.png";

const NavbarComponent = () => {
	// let token = localStorage.getItem("access_token");
	const navigate = useNavigate();
	const [username] = useState(localStorage.getItem("username"));
	const [checkToken] = useState(localStorage.getItem("access_token"));

	useEffect(() => {
		if (!checkToken) {
			return navigate("/");
		}
	}, [checkToken, navigate]);

	const handleLogout = () => {
		localStorage.clear("access_token");
		localStorage.clear("username");
		navigate("/");
	};

	return (
		<Navbar
			className={`Poppins ${styles.boxShadowNavbar}`}
			bg="white"
			expand="lg"
			style={{ height: "70px" }}
		>
			<Container>
				<img src={news} className="me-2" alt="logo" style={{ width: "35px" }} />
				<Link to={"/dashboard"} style={{ textDecoration: "none" }}>
					<Navbar.Brand></Navbar.Brand>
					<Navbar.Brand className={`${styles.ltrSpacing}`}>
						Dashboard
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto me-2">
						{/* <Nav.Link href={"/dashboard/articles"}>
							<Link to={"/dashboard/articles"}>Article</Link>
						</Nav.Link> */}
						<Link
							className={`${styles.ltrSpacing} nav-link text-uppercase`}
							to={"/dashboard/articles"}
						>
							Article
						</Link>

						<Link
							className={`${styles.ltrSpacing} nav-link text-uppercase`}
							to={"/dashboard/categories"}
						>
							Category
						</Link>
						<NavDropdown
							title={username}
							className={`${styles.ltrSpacing} text-uppercase`}
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					{/* <Nav className="ms-auto"></Nav> */}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
