const currentUrl = window.location.href;
const url = new URL(currentUrl);
const params = new URLSearchParams(url.search);
const id = params.get('id'); 
console.log (id);

// Sélectionner le conteneur où l'on va afficher les données du photographe
const container = document.querySelector('.photographer-container');


// Charger les données des photographes
fetch('../../data/photographers.json')
    .then(response => response.json())
    .then(data => {
        console.log("Données chargées : ", data);
        
        // Trouver le photographe correspondant à l'ID
        const photographer = data.photographers.find(p => p.id == id);
        
        // Vérifier si le photographe a été trouvé
        if (photographer) {
            console.log("Photographe trouvé : ", photographer);
            
            // Appeler la fonction photographerTemplate avec les données du photographe
            const photographerCard = photographerProfil(photographer);
            const medialiste = data.media.filter(media => media.photographerId == id)
            console.log(medialiste);
            medialiste.forEach ((media)=> {
            
            const mediaCard = mediaHtml(media); 
            document.querySelector('.media-container').innerHTML+=mediaCard
            });
        
            //document.querySelector('.photographer-container').appendChild(photographerCard.getUserCardDOM());
        
        } else {
            console.error('Photographe non trouvé avec l\'ID :', id);
        }
    })
    .catch(error => console.error('Erreur lors de la récupération des données :', error));

