const React = require("react");

function ConfirmationEmail({ email }) {
  return React.createElement(
    "div",
    { style: { fontFamily: "sans-serif", maxWidth: 400, margin: "0 auto", background: "#f0fdf4", padding: 24, borderRadius: 8, border: "1px solid #bbf7d0" } },
    React.createElement("h2", { style: { color: "#166534", fontSize: 24, marginBottom: 12 } }, "Login Successful"),
    React.createElement("p", { style: { color: "#166534", fontSize: 18, marginBottom: 8 } }, `Hi ${email},`),
    React.createElement("p", { style: { color: "#4b5563", fontSize: 16, marginBottom: 8 } }, "Your login was successful. Welcome to the myjobb Dashboard!"),
    React.createElement("p", { style: { color: "#9ca3af", fontSize: 12 } }, "If this wasn't you, please contact support immediately.")
  );
}

module.exports = ConfirmationEmail;
