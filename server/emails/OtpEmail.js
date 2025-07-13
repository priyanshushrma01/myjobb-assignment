const React = require("react");

function OtpEmail({ otp }) {
  return React.createElement(
    "div",
    { style: { fontFamily: "sans-serif", maxWidth: 400, margin: "0 auto", background: "#f9fafb", padding: 24, borderRadius: 8, border: "1px solid #e5e7eb" } },
    React.createElement("h2", { style: { color: "#111827", fontSize: 24, marginBottom: 12 } }, "Your OTP Code"),
    React.createElement(
      "div",
      { style: { fontSize: 32, fontWeight: "bold", background: "#e0e7ff", color: "#3730a3", padding: "12px 0", borderRadius: 6, textAlign: "center", letterSpacing: 4, marginBottom: 16 } },
      otp
    ),
    React.createElement("p", { style: { color: "#4b5563", fontSize: 16, marginBottom: 8 } }, "Enter this code to verify your email address. This code will expire in 10 minutes."),
    React.createElement("p", { style: { color: "#9ca3af", fontSize: 12 } }, "If you did not request this, please ignore this email.")
  );
}

module.exports = OtpEmail;
