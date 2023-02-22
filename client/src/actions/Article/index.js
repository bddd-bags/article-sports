import axios from "axios";
import Swal from "sweetalert2";

const URL = process.env.REACT_APP_API_KEY || "http://localhost:3000/api";

const getData = async (cbData, title) => {
	try {
		const token = localStorage.getItem("access_token");

		if (!title) {
			const result = await axios.get(`${URL}/articles?`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			cbData(result.data.data);
		} else {
			const result = await axios.get(`${URL}/articles?Title=${title}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			cbData(result.data.data);
		}
	} catch (error) {
		console.log(error);
	}
};

const postData = async (data, img, cbPost) => {
	try {
		const token = localStorage.getItem("access_token");

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("category_id", data.category_id);
		formData.append("img", img);
		console.log(formData);
		await axios.post(`${URL}/articles`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return cbPost(true);
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error.response.data.message,
		});
	}
};

const deleteData = (id, cbDelete) => {
	try {
		const token = localStorage.getItem("access_token");

		Swal.fire({
			title: "Do you want to delete the Article?",
			showCancelButton: true,
			confirmButtonText: "Delete",
			confirmButtonColor: "#d33",
		}).then(async (result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				await axios.delete(`${URL}/articles/${id}`, {
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
	console.log(id);
};

const findOne = async (slug, cbData) => {
	try {
		const token = localStorage.getItem("access_token");

		const result = await axios.get(`${URL}/articles/${slug}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		cbData(result.data.data);
	} catch (error) {
		console.log(error);
	}
};

const updateData = async (data, img, id, cbUpdate) => {
	try {
		const token = localStorage.getItem("access_token");

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("category_id", data.category_id);
		formData.append("img", img);

		await axios.put(`${URL}/articles/${id}`, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		return cbUpdate(true);
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error.response.data.message,
		});
	}
};

export { getData, postData, deleteData, findOne, updateData };
