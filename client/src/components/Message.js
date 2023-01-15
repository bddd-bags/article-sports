import React from "react";

const Message = ({ title }) => {
	return (
		<>
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "200px" }}
			>
				<h2>{title}</h2>
			</div>
		</>
	);
};

export default Message;
