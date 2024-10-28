function photographerProfil(info){
    const photographerProfil = document.querySelector (".photograph-header") 

    photographerProfil.innerHTML= `

        <div class="photographer-info">
            <h1>${info.name}</h1>
            <p class="location">${info.city}, ${info.country}</p>
            <p class="tagline">${info.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <div class="photographer-portrait">
            <img src="assets/photographers/${info.portrait}" alt="Portrait de ${info.name}">
        </div>
`}
function mediaHtml (media){
    const {title, image, video, likes, photographerId, Date } = media
    console.log(title);

    let mediaElement;
    
    // Si c'est une image, on crée un élément <img>, sinon <video>
    if (image) {
        mediaElement = `<img src="assets/images/${photographerId}/${image}" alt="${title}" class="imagephoto">`;
    } else if (video) {
        mediaElement = `
            <video controls class="videophoto" width="200px" height="200px">
                <source src="assets/images/${photographerId}/${video}" type="video/mp4"  >
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        `;
    }
      // Ajoute un gestionnaire de clic pour chaque bouton "like"
      /*document.querySelectorAll('.like-button').forEach(button => {
        console.log (button)
        button.addEventListener('click', (event) => {
           
            const likesContainer = event.target.closest('.likes-container');
            const likeCountElement = likesContainer.querySelector('.like-count');
            let likeCount = parseInt(likeCountElement.textContent);

            // Incrémente le nombre de likes
            likeCount += 1;
            likeCountElement.textContent = likeCount;

            // Met à jour le total des likes
            updateTotalLikes();
        });
    });*/

    const mediacard = document.createElement("div")
    mediacard.className = "media-card"
    mediacard.innerHTML=(mediaElement)
    const mediainfo = document.createElement("div")
    mediainfo.className = "media-info"
    mediacard.appendChild(mediainfo)
    mediainfo.innerHTML= (title)
    const likesContainer = document.createElement("div")
    likesContainer.className = "likes-container"
    mediainfo.appendChild(likesContainer)
    console.log (mediacard)
   
    /*const mediaCard = `
    
       <div class="media-card"> 
        ${mediaElement}
            <div class="media-info">
                ${title}
                <div class="likes-container" data-id="${media.id}">
                     <p><span class="like-count">${likes}</span> <button id = "${media.id}" class="like-button">♥</button></p>
                </div>
            </div>
        </div>
    `;   */

    return mediacard;
}


function OrderMedia(media) {
    const order = document.getElementById("order");
    
    // Ajoute un événement "change" au sélecteur de tri
    // Tri des médias
    order.addEventListener("change", () => {
        if (order.value === "0") {
            media.sort((a, b) => b.likes - a.likes);
        } else if (order.value === "1") {
            media.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (order.value === "2") {
            media.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            console.log("Pas de tri");
        }

        // Met à jour l'affichage des médias triés
        document.querySelector('.media-container').innerHTML = "";
        media.forEach((mediaItem) => {
           /* const mediaCard = mediaHtml(mediaItem); */
            document.querySelector('.media-container').appendChild(mediaItem)
        });

        // Ajoute un gestionnaire de clic pour chaque bouton "like"
        document.querySelectorAll('.like-button').forEach(button => {
            console.log (button)
            button.addEventListener('click', (event) => {
               
                const likesContainer = event.target.closest('.likes-container');
                const likeCountElement = likesContainer.querySelector('.like-count');
                let likeCount = parseInt(likeCountElement.textContent);

                // Incrémente le nombre de likes
                likeCount += 1;
                likeCountElement.textContent = likeCount;

                // Met à jour le total des likes
                updateTotalLikes();
            });
        });
    });
    
}

    function updateTotalLikes() {
        const allLikesElements = document.querySelectorAll('.like-count');
        let totalLikes = 0;
    
        allLikesElements.forEach(likeElement => {
            totalLikes += parseInt(likeElement.textContent);
        });
    
        document.querySelector('.total-likes').textContent = totalLikes;
    }
    
 