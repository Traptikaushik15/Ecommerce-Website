export default function createAlert(type, message) {
  // Create the div element
  const alertDiv = document.createElement("div");

  // Set the text content
  alertDiv.textContent = message;

  // Apply styles
  alertDiv.style.position = "fixed";
  alertDiv.style.display = "flex";
  alertDiv.style.justifyContent = "center";
  alertDiv.style.alignItems = "center";
  alertDiv.style.top = "3em";
  alertDiv.style.right = "8em";
  alertDiv.style.height = "35px";
  alertDiv.style.padding = "10px";
  alertDiv.style.borderRadius = "5px";
  alertDiv.style.color = "#fff";
  alertDiv.style.zIndex = "1000000000000000";
  alertDiv.style.background = type === "danger" ? "#dc5252" : "#4caf50"; // Red for danger, green for success

  document.body.insertBefore(alertDiv, document.body.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}
