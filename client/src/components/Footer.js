import React from "react";

const Footer = () => {
	return (
		<>
			<div
				className="mt-3 text-white"
				style={{
					backgroundColor: "#2ec497",
					boxShadow:
						"box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;",
				}}
			>
				<div
					className="container d-flex justify-content-between align-items-center"
					style={{ minHeight: "80px" }}
				>
					<p
						className="mb-0"
						style={{ letterSpacing: "0.6px", fontSize: "15px" }}
					>
						&copy; 2023 Inc. All Rights Reserved
					</p>
					<p
						className="mb-0 fw-bold"
						style={{ letterSpacing: "0.6px", fontSize: "15px" }}
					>
						Privacy Policy | Terms of Services | Code of Conduct
					</p>
				</div>
			</div>
		</>
	);
};

export default Footer;
