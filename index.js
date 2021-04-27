window.onload = () => {
  let firstInput = document.querySelector(".textbox-in");
  focus(firstInput);
};
function focus(element) {
  element.focus();
}
function textboxTextChanged(e) {
  hideError(e);
}
function showError(input, message) {
  let parent = input.parentElement.parentElement;
  let icon = parent.querySelector(".textbox-error-icon");
  let error = parent.querySelector(".textbox-error");
  icon.style.opacity = "1";
  error.style.display = "block";
    input.style.borderColor = "var(--red-cr)";
  input.style.color = "var(--red-cr)";
  error.innerText = message;

}
function hideError(input) {
  let parent = input.parentElement.parentElement;
  let icon = parent.querySelector(".textbox-error-icon");
  let error = parent.querySelector(".textbox-error");
  icon.style.opacity = "0";
  input.style.removeProperty("border-color");
  input.style.removeProperty("color");
  error.style.display = "none";  
}
function hideErrorsOfInputs() {
  let inputs = document.querySelectorAll(".textbox-in");
  for (let i = 0; i < inputs.length; i++) {
    hideError(inputs[i]);
  }
}
function isEmpty(input) {
  if (input.value === "") return true;
  else return false;
}
function getIndecesOfEmptyInputs() {
  let indeces = [];
  let form = document.querySelector("form");
  let inputs = Array.from(form.querySelectorAll(".textbox-in"));
  for (let i = 0; i < inputs.length; i++) {
    if (isEmpty(inputs[i])) indeces.push(i);
  }
  return indeces;
}
function showErrorOnEmptyInputs() {
  let indeces = getIndecesOfEmptyInputs();
  let emptiesNumber = indeces.length;
  let inputs = document.querySelectorAll(".textbox-in");

  hideErrorsOfInputs();
  for (let i = 0; i < emptiesNumber; i++) {
    let index = indeces[i];
    let input = inputs[index];
    let placeholder = input.placeholder;
    let message = placeholder + " cannot be empty";
    showError(input, message);
  }
  if (emptiesNumber === 0) return false;  
  inputs[indeces[0]].focus();
}
function tryClicked() {}
function IsInvalidEmail() {
  let EmailInput = document.querySelector("#email-in");
  let value = EmailInput.value;
  let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (pattern.test(value)) return true;  
  let message = "Looks like this is not an email";
  showError(EmailInput, message);
  return false;
  
}
function FormSubmitted(e) {
  e.preventDefault();
  let empty = showErrorOnEmptyInputs();
  let email = IsInvalidEmail();
  if (email === true && empty === false) e.target.submit();
}
