import axios from "axios";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_API_KEY || "http://localhost:3000/api";

const getData = async (cb) => {
	try {
		const token = localStorage.getItem("access_token");
		const result = await axios.get(`${URL}/categories`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		cb(result.data.data);
	} catch (error) {
		console.log(error);
	}
};

const postData = async (name, cbPost) => {
	try {
		const token = localStorage.getItem("access_token");
		await axios.post(
			`${URL}/categories`,
			{ name },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		cbPost(true);
	} catch (error) {
		console.log(error);
	}
};

const findOne = async (id, cb) => {
	try {
		const token = localStorage.getItem("access_token");

		const result = await axios.get(`${URL}/categories/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		cb(result.data.data);
	} catch (error) {
		console.log(error);
	}
};

const updateData = async (id, data, cb) => {
	try {
		const token = localStorage.getItem("access_token");
		await axios.put(`${URL}/categories/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return cb(true);
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async (id, cbDelete) => {
	try {
		const token = localStorage.getItem("access_token");

		Swal.fire({
			title: "Do you want to delete the Category?",
			showCancelButton: true,
			confirmButtonText: "Delete",
			confirmButtonColor: "#d33",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await axios.delete(`${URL}/categories/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				cbDelete(true);
				Swal.fire("Success deleted!", "", "success");
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export { getData, postData, findOne, updateData, deleteData };
