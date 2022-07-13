function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute("href", "photographer.html?id=" + id)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", " ");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute("aria-label", name);
        const p = document.createElement('p');
        p.setAttribute("class", "photographer_infos");
        const photographerCity = document.createElement('span');
        photographerCity.textContent = city + ", " + country;
        photographerCity.setAttribute("class", "photographer_city");
        const photographerTagline = document.createElement('span');
        photographerTagline.textContent = tagline;
        photographerTagline.setAttribute("class", "photographer_tagline")
        const photographerPrice = document.createElement('span');
        photographerPrice.textContent = price + "€/jour";
        photographerPrice.setAttribute("class", "photographer_price")
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        p.appendChild(photographerCity);
        p.appendChild(photographerTagline);
        p.appendChild(photographerPrice);
        article.append(p);
        return (article);
    }

    function getSpecificUserCardDOM() {
      const photographerInfosSection = document.createElement('article');
      const photographerInfosName = document.createElement('h1');
      photographerInfosName.textContent = name;
      const photographerOtherInfos = document.createElement('p');
      photographerOtherInfos.setAttribute("class", "photographer_other_infos")
      const spanCity = document.createElement('span');
      spanCity.textContent = city + ", " + country;
      spanCity.setAttribute("class", "photographer_city")
      const spanTagline = document.createElement('span');
      spanTagline.textContent = tagline;
      spanTagline.setAttribute("class", "photographer_tagline");
      photographerOtherInfos.appendChild(spanCity);
      photographerOtherInfos.appendChild(spanTagline);
      photographerInfosSection.appendChild(photographerInfosName);
      photographerInfosSection.appendChild(photographerOtherInfos);

      const image = document.createElement('img');
      image.setAttribute("src", picture);
      image.setAttribute("alt", name);

      return {photographerInfosSection, image}
    }

  return { name, id, picture, city, country, tagline, price, portrait, getUserCardDOM, getSpecificUserCardDOM }
}
