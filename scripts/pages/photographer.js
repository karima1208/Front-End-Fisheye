//Mettre le code JavaScript lié à la page photographer.html
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
let photographerData = [];
let currentMediaIndex = 0;
console.log(params);

const getPhotographerData = async () => {
  const res = await fetch("../../data/photographers.json");
  const data = await res.json();

  const photographer = data.photographers.find(
    (item) => item.id === parseInt(id)
  );
  const media = data.media.filter(
    (item) => item.photographerId === parseInt(id)
  );
  photographerData = media;
  console.log(media);
  generateTopPage(photographer, media);
};

const generateTopPage = (photographer, media) => {
  const photographHeader = document.querySelector(".photograph-header");
  const div = document.createElement("div");
  const name = document.createElement("h2");
  name.innerHTML = photographer.name;
  name.className = "photograph-name";
  const location = document.createElement("h3");
  location.innerHTML = `${photographer.city}, ${photographer.country}`;
  location.className = "photograph-location";
  const tagline = document.createElement("p");
  tagline.innerHTML = photographer.tagline;
  tagline.className = "photograph-tagline";
  const image = document.createElement("img");
  image.src = `../../assets/photographers/${photographer.portrait}`;
  image.className = "photograph-portrait";

  div.appendChild(name);
  div.appendChild(location);
  div.appendChild(tagline);
  photographHeader.insertBefore(div, photographHeader.firstChild);
  photographHeader.appendChild(image);

  const mainContainer = document.querySelector("#main");
  const divProjects = document.createElement("div");
  divProjects.className = "photograph-projects";
  mainContainer.appendChild(divProjects);

  const divFilter = document.createElement("div");
  divFilter.className = "photograph-filter";
  const divFilterTitle = document.createElement("div");
  divFilterTitle.innerHTML = "Trier par";
  const divProjectsList = document.createElement("div");
  divProjectsList.className = "photograph-projects-list";

  renderMedia(media, divProjectsList);
  divFilter.appendChild(divFilterTitle);
  divProjects.appendChild(divFilter);

  const select = document.createElement("select");
  select.innerHTML = `<option value="likes">Popularité</option><option value="date">Date</option><option value="title">Titre</option>`;
  select.className = "media-filter-select";
  divFilter.appendChild(select);

  // Écouteur pour appliquer le tri quand l'utilisateur change d'option
  select.addEventListener("change", () => {
    // Trie le tableau `media` en fonction de la sélection
    if (select.value === "likes") {
      media.sort((a, b) => b.likes - a.likes);
    } else if (select.value === "date") {
      media.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (select.value === "title") {
      media.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Vide `divProjectsList` pour le réinitialiser
    divProjectsList.innerHTML = "";

    // Réaffiche les éléments triés
    renderMedia(media, divProjectsList);
  });

  divProjects.appendChild(divProjectsList);
};
const renderMedia = (media, divProjectsList) => {
  media.forEach((element, i) => {
    const divProject = document.createElement("div");
    divProject.className = "photograph-project";
    divProject.addEventListener("click", () => openLightbox(i));

    const divProjectImage = document.createElement("img");
    divProjectImage.className = "photograph-project-img";
    divProjectImage.src = `../../assets/images/${element.photographerId}/${element.image}`;

    const divProjectVideo = document.createElement("video");
    divProjectVideo.ariaDisabled = true;
    divProjectVideo.addEventListener("click", () => openLightbox(i));
    divProjectVideo.controls = true;
    const divProjectVideoSource = document.createElement("source");
    divProjectVideo.className = "photograph-project-img";
    divProjectVideoSource.src = `../../assets/images/${element.photographerId}/${element.video}`;
    divProjectVideo.appendChild(divProjectVideoSource);

    const projectTitle = document.createElement("div");
    projectTitle.className = "media-info";
    const projectTitleText = document.createElement("div");
    projectTitleText.innerHTML = element.title;
    projectTitleText.className = "text-title";
    let likesCompte = element.likes;
    let fixCompte = element.likes;
    const projectTitleLikes = document.createElement("div");
    const projectLikesText = document.createElement("div");
    projectLikesText.innerHTML = likesCompte;
    projectTitleLikes.appendChild(projectLikesText);
    const projectLikesButton = document.createElement("button");
    projectLikesButton.className = "likes-button";
    projectLikesButton.id = element.id;
    projectLikesButton.innerHTML = "♡";
    projectLikesButton.addEventListener("click", () => {
      console.log("-----------");
      console.log(fixCompte);
      console.log(likesCompte);
      console.log("-----------");
      if (fixCompte !== likesCompte) {
        projectLikesText.innerHTML = fixCompte;
        likesCompte = fixCompte;
        projectLikesButton.className = "likes-button";
      } else {
        likesCompte = likesCompte + 1;
        projectLikesText.innerHTML = likesCompte;
        projectLikesButton.className = "likes-button-active";
      }
    });
    projectTitleLikes.appendChild(projectLikesButton);
    projectTitleLikes.className = "likes-style";

    projectTitle.appendChild(projectTitleText);
    projectTitle.appendChild(projectTitleLikes);
    if (element.image) {
      divProject.appendChild(divProjectImage);
    } else if (element.video) {
      divProject.appendChild(divProjectVideo);
    }

    divProject.appendChild(projectTitle);
    divProjectsList.appendChild(divProject);
  });
};
getPhotographerData();

//lightbox

// Fonction pour initialiser et configurer la lightbox
defineLightbox();
function defineLightbox() {
  // Création de l'élément lightbox
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.style.display = "none"; // La lightbox est masquée par défaut
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Fermer la lightbox">&times;</button>
            <div class="lightbox-media-container"></div>
            <button class="lightbox-prev" aria-label="Média précédent">&#8249;</button>
            <button class="lightbox-next" aria-label="Média suivant">&#8250;</button>
        </div>
    `;
  document.body.appendChild(lightbox); // Ajout de la lightbox au DOM

  // Ajout des écouteurs d'événements pour les boutons de la lightbox
  document
    .querySelector(".lightbox-close")
    .addEventListener("click", closeLightbox);
  document
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => navigateLightbox(-1));
  document
    .querySelector(".lightbox-next")
    .addEventListener("click", () => navigateLightbox(1));

  return lightbox;
}

// Variables pour suivre le média actuel et son index

let galleryMedia = []; // Liste des médias de la galerie

// Ouvrir la lightbox avec un média spécifique
function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.querySelector(".lightbox-content");
  lightboxContent.innerHTML = "";
  if (!lightbox) return; // Si la lightbox n'existe pas, on arrête

  currentMediaIndex = index; // Mise à jour de l'index du média actuel
  lightbox.style.display = "flex"; // Affichage de la lightbox
  const element = photographerData[currentMediaIndex];
  console.log(element);
  const divProjectImage = document.createElement("img");
  divProjectImage.className = "lightbox-media-container";
  divProjectImage.src = `../../assets/images/${element.photographerId}/${element.image}`;
  const divProjectVideo = document.createElement("video");
  divProjectVideo.controls = true;
  const divProjectVideoSource = document.createElement("source");
  divProjectVideo.className = "lightbox-media-container";
  divProjectVideoSource.src = `../../assets/images/${element.photographerId}/${element.video}`;
  divProjectVideo.appendChild(divProjectVideoSource);
  const lightboxNext = document.querySelector(".lightbox-next");
  lightboxNext.addEventListener("click", () => {
    let newIndex = index + 1;
    console.log("-------");
    console.log(newIndex);
    console.log("-------");
    if (newIndex > photographerData.length - 1) {
      openLightbox(0);
    } else {
      openLightbox(newIndex);
    }
  });
  if (element.image) {
    lightboxContent.appendChild(divProjectImage);
  } else if (element.video) {
    lightboxContent.appendChild(divProjectVideo);
  }
  updateLightboxContent(); // Mise à jour du contenu de la lightbox
}

// Fermer la lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.style.display = "none"; // Masquer la lightbox
  }
}

// Naviguer vers le média suivant ou précédent
function navigateLightbox(direction) {
  // Calcul du nouvel index en tenant compte des limites de la galerie
  currentMediaIndex =
    (currentMediaIndex + direction + galleryMedia.length) % galleryMedia.length;
  updateLightboxContent(); // Mise à jour du contenu de la lightbox
}

// Mettre à jour le contenu de la lightbox avec le média actuel
function updateLightboxContent() {
  /* const mediaContainer = document.querySelector(".photograph-project-img");
  if (!mediaContainer) return; // Si le conteneur est introuvable, on arrête

  const currentMedia = galleryMedia[currentMediaIndex]; // Média actuel
  mediaContainer.innerHTML = ""; // Vider le conteneur

  // Vérifier le type de média (image ou vidéo) et l'ajouter au conteneur
  if (currentMedia.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = currentMedia.src;
    img.alt = currentMedia.alt;
    mediaContainer.appendChild(img);
  } else if (currentMedia.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = currentMedia.src;
    video.controls = true; // Ajouter des contrôles pour la vidéo
    mediaContainer.appendChild(video);
  }*/
}

// Ajouter des écouteurs d'événements aux éléments médias
function attachMediaListeners() {
  // Récupérer tous les éléments médias avec la classe "media"
  galleryMedia = Array.from(document.querySelectorAll(".media"));
  galleryMedia.forEach((media, index) => {
    // Ajouter un écouteur pour ouvrir la lightbox au clic
    media.addEventListener("click", () => openLightbox(index));
  });
}

// Appeler la fonction pour ajouter les écouteurs une fois les médias rendus
attachMediaListeners();
