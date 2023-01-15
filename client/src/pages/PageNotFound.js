import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<>
			<div
				className="w-100 d-flex justify-content-center align-items-center"
				style={{ minHeight: "100vh" }}
			>
				<div className="text-center">
					<h3>PAGE_NOT_FOUND!</h3>
					<p>
						Back to home <Link to={"/dashboard"}>Home</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;
