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
    `

}
function mediaHtml (media){
    const {title, image, video, likes, photographerId } = media
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
    
    const mediaCard = `
    <div class="media-card">
       <div class="media-card"> 
        ${mediaElement}
        <div class="media-info">
            ${title}
            <div class="likes-container">
                <p>${likes} <span class="likes">♥</span></p>
            </div>
        </div>
    </div>
    `;

    return(mediaCard)
    
} 
