import React, { useState } from "react";
import LoginRegisterComponent from "../components/LoginRegister";
import { Form, Button } from "react-bootstrap";
import styles from "./LoginRegister.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const URL = process.env.REACT_APP_API_KEY || "http://localhost:3000/api";

	const registerClik = async () => {
		try {
			// console.log(form);
			await axios.post(`${URL}/register`, form);

			Swal.fire({
				icon: "success",
				text: "Successfully created a new account!",
				confirmButtonText: "OK",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/");
				}
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				text: error.response.data.message.toUpperCase(),
			});
		}
	};

	const registerElement = () => {
		return (
			<>
				{/* <Form onClick={loginClick}> */}
				<Form.Group className="mb-3" controlId="formBasicUsername">
					<Form.Label className="fw-bold">Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter username"
						onChange={(e) => setForm({ ...form, username: e.target.value })}
					/>
				</Form.Group>
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
				<div className="pt-3">
					<Button
						className={`w-100 ${styles.newColorBtn}`}
						onClick={registerClik}
						variant="success"
						type="submit"
					>
						Register
					</Button>
				</div>
				{/* </Form> */}
			</>
		);
	};
	return (
		<>
			<LoginRegisterComponent el={registerElement()} name={"Register"} />
		</>
	);
};

export default Register;
