//DOM Elements
const modal = document.getElementById("contact_modal");
const form = document.querySelector("#contact_form");
const firstNameInput = form.querySelector("#user_first_name");
const lastNameInput = form.querySelector("#user_last_name");
const emailInput = form.querySelector("#user_email");
const messageInput = form.querySelector("#user_message");
const userAnswers = {}

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
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

document.addEventListener("keydown", function(e) {
 if (e.key === 'Escape') {
  closeModal();
  const modal = document.querySelector("#media_modal")
  modal.style.display = "none";
 }
})
