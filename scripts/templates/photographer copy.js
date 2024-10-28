function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement( 'article' );

    const img = document.createElement( 'img' );
    img.setAttribute("src", picture)
    img.classList.add('photographer-portrait'); // Ajoute la classe pour le style

    
    const a = document.createElement ('a');
    a.setAttribute("href", `photographe.html?id=${id}`)
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    h2.classList.add('photographer-name'); // Ajoute une classe
    a.appendChild(h2)
  
    // Création de l'élément p pour la localisation (ville, pays)
    const pLocation = document.createElement('p');
    pLocation.textContent = `${city}, ${country}`;
    pLocation.classList.add('photographer-location'); // Ajout de classe
   
   // Création de l'élément p pour la tagline (phrase d'accroche)
    const pTagline = document.createElement('p');
    pTagline.textContent = tagline;
    pTagline.classList.add('photographer-tagline'); // Ajout de classe

   // Création de l'élément p pour le prix par jour
    const pPrice = document.createElement('p');
    pPrice.textContent = `${price}€/jour`;
    pPrice.classList.add('photographer-price'); // Ajout de classe

    const link = document.createElement('a')
    link.href = `photographer.html?id=${id}`

   // Ajout des éléments img, h2, pLocation, pTagline, et pPrice à l'article
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(link)
    article.appendChild(pLocation);
    
    article.appendChild(pTagline);
    article.appendChild(pPrice);
         
       
    return article;
  }
       
  return { name, picture, getUserCardDOM };
}
