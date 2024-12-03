function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.addEventListener(
      "click",
      () => (window.location.href = `/photographer.html?id=${id}`)
    );
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;

    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    location.className = "photographer-location";

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.className = "photographer-tagline";

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/jour`;
    priceElement.className = "photographer-price";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(taglineElement);
    article.appendChild(priceElement);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
