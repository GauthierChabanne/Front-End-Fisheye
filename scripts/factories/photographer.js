function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute('id', id)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt="Photo de profil de " + name;
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h4 = document.createElement('h4');
        h4.textContent = city + ", " + country;
        const p1 = document.createElement('p');
        p1.textContent = tagline;
        const p2 = document.createElement('p');
        p2.textContent = price + "€/jour";
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p1);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
