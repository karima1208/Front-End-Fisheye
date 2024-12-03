function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  // Appelle la fonction pour ajouter les champs au formulaire
  initializeContactForm();
  createOverlay();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  // Supprime l'overlay
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.remove();
  }
}

function initializeContactForm() {
  const form = document.querySelector("#contact_modal form"); // Sélectionne le formulaire dans la modal

  // Créer un champ pour "Nom"
  const divNom = document.createElement("div");
  const labelNom = document.createElement("label");
  labelNom.textContent = "Nom";
  const inputNom = document.createElement("input");
  inputNom.setAttribute("name", "nom");
  inputNom.setAttribute("type", "text");
  divNom.appendChild(labelNom);
  divNom.appendChild(inputNom);

  // Créer un champ pour "Email"
  const divEmail = document.createElement("div");
  const labelEmail = document.createElement("label");
  labelEmail.textContent = "Email";
  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("name", "email");
  inputEmail.setAttribute("type", "email");
  divEmail.appendChild(labelEmail);
  divEmail.appendChild(inputEmail);

  // Créer un champ pour "Message"
  const divMessage = document.createElement("div");
  const labelMessage = document.createElement("label");
  labelMessage.textContent = "Message";
  const textareaMessage = document.createElement("textarea");
  textareaMessage.setAttribute("name", "message");
  textareaMessage.setAttribute("type", "text");
  textareaMessage.className = "textareaMessage";
  divMessage.appendChild(labelMessage);
  divMessage.appendChild(textareaMessage);

  // Ajouter les nouveaux champs dans le formulaire
  form.insertBefore(divNom, form.querySelector(".contact_button"));
  form.insertBefore(divEmail, form.querySelector(".contact_button"));
  form.insertBefore(divMessage, form.querySelector(".contact_button"));
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);
}
