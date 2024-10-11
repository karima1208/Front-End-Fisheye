async function getPhotographers() {
    // Remplace l'exemple de données par la requête fetch vers ton fichier JSON
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    
    // Affiche les données dans la console pour vérification
    console.log('Photographers data:', data);
    
    // Retourne les photographes depuis les données récupérées
    return data;
}

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
