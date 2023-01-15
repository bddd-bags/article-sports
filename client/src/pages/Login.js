import React, { useState, useEffect } from "react";
import styles from "./LoginRegister.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { Login as LoginHandler } from "../actions/User";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import LoginRegisterComponent from "../components/LoginRegister";

function Login() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const [token] = useState(localStorage.getItem("access_token"));
	const URL = process.env.REACT_APP_API_KEY || "http://localhost:3000/api";

	useEffect(() => {
		if (Boolean(token)) {
			return navigate("/dashboard");
		}
	}, [token, navigate]);

	const loginClick = async () => {
		try {
			const result = await axios.post(`${URL}/login`, form);
			const access_token = result.data.access_token;
			const payload = jwtDecode(access_token);
			localStorage.setItem("access_token", access_token);
			localStorage.setItem("username", payload.user.username);
			navigate("/dashboard");
		} catch (error) {
			console.log(error, URL);
			Swal.fire({
				icon: "error",
				text: error.response.data.message.toUpperCase(),
			});
		}
	};

	const loginElement = () => {
		return (
			<>
				{/* <Form onClick={loginClick}> */}
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label className="fw-bold">Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
				<div className="pt-4 mt-3">
					<Button
						className={`w-100 ${styles.newColorBtn}`}
						onClick={loginClick}
						variant="success"
						type="submit"
					>
						Login
					</Button>
				</div>
				{/* </Form> */}
			</>
		);
	};

	return (
		<>
			<LoginRegisterComponent el={loginElement()} name={"Log in"} />
		</>
	);
}

export default Login;
