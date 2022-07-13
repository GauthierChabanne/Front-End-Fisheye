//Mettre le code JavaScript lié à la page photographer.html
const params = (new URL(document.location)).searchParams;
const id = params.get('id');

async function getPhotographers() {
  const photographers = fetch('/data/photographers.json', { method: 'GET', })
    .then(response => response.json())
    .then(data => data.photographers)

  return photographers
}

async function getPhotographer() {
  const photographers = await getPhotographers();

  photographers.forEach(photographer => {
    if(photographer.id == id) {
      rightPhotographer = photographer;
    }
  })
  return rightPhotographer;
}

async function getMedia() {
  const media = fetch('/data/photographers.json', { method: 'GET', })
    .then(response => response.json())
    .then(data => data.media)

  return media
}

async function getPhotographerMedia() {
  const media = await getMedia();
  const photographerMedia = [];

  media.forEach(mediaPiece => {
    if(mediaPiece.photographerId == id) {
      photographerMedia.push(mediaPiece);
    }
  })

  return photographerMedia
}

async function displayData(photographer, media) {
  const photographerInfosSection =  document.querySelector(".photograph-infos");
  const photographerPictureSection = document.querySelector(".photograph-picture");
  const photographerModel = photographerFactory(photographer);
  const userCardDOM = photographerModel.getSpecificUserCardDOM();
  const modalPhotographerName = document.querySelector("#photographer_name");
  modalPhotographerName.textContent = photographerModel.name
  photographerInfosSection.appendChild(userCardDOM.photographerInfosSection);
  photographerPictureSection.appendChild(userCardDOM.image)

  const mediaSection = document.querySelector(".media-section");
  let photographerTotalLikes = 0
  media.forEach((mediaPiece) => {
    const mediaPieceModel = mediaFactory(mediaPiece);
    const mediaPieceCardDOM = mediaPieceModel.getMediaCardDOM();
    mediaSection.appendChild(mediaPieceCardDOM);
    photographerTotalLikes += parseInt(mediaPieceModel.likes);
  })

  const photoTotalLikesDiv = document.querySelector(".photo_total_likes");
  const photographerDailyPriceDiv = document.querySelector(".photographer_daily_price");
  const photoTotalLikesNumber = document.querySelector(".photo_total_likes_number");
  const photographerTotalLikesHeart = document.createElement("i");
  photographerTotalLikesHeart.setAttribute("class", "fa-solid fa-heart");
  photoTotalLikesNumber.textContent = photographerTotalLikes;
  photoTotalLikesDiv.appendChild(photographerTotalLikesHeart);
  photographerDailyPriceDiv.textContent = photographerModel.price + " € / jour"
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  const photographerMedia = await getPhotographerMedia();
  displayData(photographer, photographerMedia)
  const selectInput = document.querySelector("#tri_select");
  const allMedia = document.querySelectorAll(".photographer_media");
  const allMediaArray = Array.from(allMedia);
  const mediaSection = document.querySelector(".media-section");

  selectInput.addEventListener("change", function () {
    if (selectInput.value === "Popularité") {
      allMediaArray.sort(popularitySort);
    } else if (selectInput.value === "Date") {
      allMediaArray.sort(dateSort);
    } else if (selectInput.value === "Titre") {
      allMediaArray.sort(titleSort);
    }
    mediaSection.innerHTML = ""
    allMediaArray.forEach(media => {
      mediaSection.append(media);
    })
  })
};

//functions for Sorting
function popularitySort(a, b) {
  const aLikesNumberDiv = a.querySelector(".photo_likes_number");
  const aLikesNumber = parseInt(aLikesNumberDiv.textContent);
  const bLikesNumberDiv = b.querySelector(".photo_likes_number");
  const bLikesNumber = parseInt(bLikesNumberDiv.textContent);

  if (aLikesNumber < bLikesNumber) {
    return 1;
  }
  if (aLikesNumber > bLikesNumber) {
    return -1
  }
  return 0;
}

function dateSort(a, b) {
  const aDate = new Date(a.dataset.date);
  const bDate = new Date(b.dataset.date);

  if (aDate < bDate) {
    return 1;
  }
  if (aDate > bDate) {
    return -1
  }
  return 0;
}

function titleSort(a, b) {
  const aTitleDiv = a.querySelector(".photo_title")
  const aTitle = aTitleDiv.textContent
  const bTitleDiv = b.querySelector(".photo_title")
  const bTitle = bTitleDiv.textContent

  if (aTitle < bTitle) {
    return -1;
  }
  if (aTitle > bTitle) {
    return 1
  }
  return 0;
}

//functions for the likes

function addLike(photoLikes) {
  photoLikes.classList.add("strong");
  const number = photoLikes.querySelector(".photo_likes_number");
  const previousNumber = number.textContent;
  number.textContent = parseInt(previousNumber) + 1;
  const heart = photoLikes.querySelector(".fa-heart")
  heart.setAttribute("class", "fa-solid fa-heart");
  const totalLikesNumber = document.querySelector(".photo_total_likes_number")
  const previousTotalNumber = totalLikesNumber.textContent;
  totalLikesNumber.textContent = parseInt(previousTotalNumber) + 1;
  photoLikes.setAttribute("onclick", "removeLike(this)")
}

function removeLike(photoLikes) {
  photoLikes.classList.remove("strong");
  const number = photoLikes.querySelector(".photo_likes_number");
  const previousNumber = number.textContent;
  number.textContent = parseInt(previousNumber) - 1;
  const heart = photoLikes.querySelector(".fa-heart")
  heart.setAttribute("class", "fa-regular fa-heart");
  const totalLikesNumber = document.querySelector(".photo_total_likes_number")
  const previousTotalNumber = totalLikesNumber.textContent;
  totalLikesNumber.textContent = parseInt(previousTotalNumber) - 1;
  photoLikes.setAttribute("onclick", "addLike(this)")
}

init();
