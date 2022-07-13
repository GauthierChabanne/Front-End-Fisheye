//DOM Elements
const form = document.querySelector("#contact_form");
const firstNameInput = form.querySelector("#user_first_name");
const lastNameInput = form.querySelector("#user_last_name");
const emailInput = form.querySelector("#user_email");
const messageInput = form.querySelector("#user_message");
const userAnswers = {}

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    userAnswers.firstName = firstNameInput.value;
    userAnswers.lastName = lastNameInput.value;
    userAnswers.email = emailInput.value;
    userAnswers.message = messageInput.value;
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  userAnswers.firstName = firstNameInput.value;
  userAnswers.lastName = lastNameInput.value;
  userAnswers.email = emailInput.value;
  userAnswers.message = messageInput.value;
  console.log(userAnswers);
  closeModal()
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
})
