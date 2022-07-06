    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        var photographers =
        fetch('/data/photographers.json', {
          method: 'GET',
        }).then(response => response.json())
        .then(data => photographers = data.photographers)

        // et bien retourner le tableau photographers seulement une fois
        return photographers
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        console.log("hello")
        photographers.forEach((photographer) => {
          console.log(photographer)
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };

    init();
