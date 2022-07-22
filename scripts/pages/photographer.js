//Mettre le code JavaScript lié à la page photographer.html
const params = (new URL(document.location)).searchParams;
const id = params.get('id');

// function to parse the json to get the photographers data
async function getPhotographers() {
  const photographers = fetch('data/photographers.json', { method: 'GET', })
    .then(response => response.json())
    .then(data => data.photographers)

  return photographers
}

// function to get the right photographer data
async function getPhotographer() {
  const photographers = await getPhotographers();

  photographers.forEach(photographer => {
    if(photographer.id == id) {
      rightPhotographer = photographer;
    }
  })
  return rightPhotographer;
}

// function to parse the json to get the media data
async function getMedia() {
  const media = fetch('data/photographers.json', { method: 'GET', })
    .then(response => response.json())
    .then(data => data.media)

  return media
}

// function to get the media of the right photographer data
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
  photographerDailyPriceDiv.textContent = photographerModel.price + " € / jour";
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  const photographerMedia = await getPhotographerMedia();
  displayData(photographer, photographerMedia)
  const selectInput = document.querySelector("#tri_select");
  const allMedia = document.querySelectorAll(".photo_link");
  const allMediaArray = Array.from(allMedia);
  const mediaSection = document.querySelector(".media-section");

// To like or dislike a picture while using the L key
allMediaArray.forEach((media) => {
    media.addEventListener("keydown", function(event) {
      if (event.key === "l") {
        const heartLike = media.querySelector(".photo_likes");
        heartLike.click();
      }
    })
  })

  // To sort the media depending on the select
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

  const slider = document.querySelector(".slider");
  const mediaModal = document.querySelector("#media_modal");

  // To show the specific media in the caroussel when clicking on it
  allMediaArray.forEach((media) => {
    media.addEventListener("click", function (e) {
      e.stopPropagation();
      let pictureImage = "";

      if (this.querySelector("img") !== null) {
        pictureImage = this.querySelector("img").cloneNode(true);
      } else {
        pictureImage = this.querySelector("video").cloneNode(true);
        pictureImage.setAttribute("autoplay", "autoplay");
      }

      const pictureText = this.querySelector(".photo_title").cloneNode(true);

      const newSlide = document.createElement("article");
      newSlide.setAttribute("class", "carousel_media slide");
      newSlide.appendChild(pictureImage);
      newSlide.appendChild(pictureText);


      if (slider.children.length > 0) {
        const slide = document.querySelector(".slide");
        slider.removeChild(slide);
        slider.appendChild(newSlide);
      } else {
        slider.appendChild(newSlide);
      }
      mediaModal.style.display = "block";
    })
  })

  // select slide buttons
  const nextSlide = document.querySelector(".btn-next");
  const prevSlide = document.querySelector(".btn-prev");
  const maxIndex = allMediaArray.length - 1;

  // Function to navigate to the next media
  nextSlide.addEventListener("click", function () {
    const slide = document.querySelector(".slide");
    let slideImage = "";

    if (slide.querySelector("img") !== null) {
      slideImage = slide.querySelector("img");
    } else {
      slideImage = slide.querySelector("video");
    }

    const originalPictureIndex = allMediaArray.findIndex(element => element.dataset.id === slideImage.dataset.id);
    let nextPictureIndex = 0

    if (originalPictureIndex + 1 > maxIndex) {
      nextPictureIndex = 0
    } else {
      nextPictureIndex = originalPictureIndex + 1
    }

    let pictureImage = "";

    if (allMediaArray[nextPictureIndex].querySelector("img") !== null) {
      pictureImage = allMediaArray[nextPictureIndex].querySelector("img").cloneNode(true);
    } else {
      pictureImage = allMediaArray[nextPictureIndex].querySelector("video").cloneNode(true);
      pictureImage.setAttribute("autoplay", "autoplay");
    }

    const pictureText = allMediaArray[nextPictureIndex].querySelector(".photo_title").cloneNode(true);

    const newSlide = document.createElement("article");
    newSlide.setAttribute("class", "carousel_media slide");
    newSlide.appendChild(pictureImage);
    newSlide.appendChild(pictureText);

    slider.removeChild(slide);
    slider.appendChild(newSlide);
  });

  // Function to navigate to the previous media
  prevSlide.addEventListener("click", function () {
    const slide = document.querySelector(".slide");
    let slideImage = "";

    if (slide.querySelector("img") !== null) {
      slideImage = slide.querySelector("img");
    } else {
      slideImage = slide.querySelector("video");
    }

    const originalPictureIndex = allMediaArray.findIndex(element => element.dataset.id === slideImage.dataset.id);
    let previousPictureIndex = 0

    if (originalPictureIndex - 1 < 0) {
      previousPictureIndex = maxIndex
    } else {
      previousPictureIndex = originalPictureIndex - 1
    }

    let pictureImage = "";

    if (allMediaArray[previousPictureIndex].querySelector("img") !== null) {
      pictureImage = allMediaArray[previousPictureIndex].querySelector("img").cloneNode(true);
    } else {
      pictureImage = allMediaArray[previousPictureIndex].querySelector("video").cloneNode(true);
      pictureImage.setAttribute("autoplay", "autoplay");
    }

    const pictureText = allMediaArray[previousPictureIndex].querySelector(".photo_title").cloneNode(true);

    const newSlide = document.createElement("article");
    newSlide.setAttribute("class", "carousel_media slide");
    newSlide.appendChild(pictureImage);
    newSlide.appendChild(pictureText);

    slider.removeChild(slide);
    slider.appendChild(newSlide);
  });

  //add Event listener for navigation in modal with buttons

  window.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
      nextSlide.click();
    } else if (event.key === "ArrowLeft") {
      prevSlide.click();
    }
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

//function for the likes

function like(photoLikes, event) {
  event.stopPropagation();
  const number = photoLikes.querySelector(".photo_likes_number");
  const previousNumber = number.textContent;
  const heart = photoLikes.querySelector(".fa-heart");
  const TypeOfHeart = heart.getAttribute("class")
  const totalLikesNumber = document.querySelector(".photo_total_likes_number");
  const previousTotalNumber = totalLikesNumber.textContent;

  if (TypeOfHeart === "fa-regular fa-heart") {
    photoLikes.classList.add("strong");
    number.textContent = parseInt(previousNumber) + 1;
    heart.setAttribute("class", "fa-solid fa-heart");
    totalLikesNumber.textContent = parseInt(previousTotalNumber) + 1;

  } else if (TypeOfHeart === "fa-solid fa-heart") {
    photoLikes.classList.remove("strong");
    number.textContent = parseInt(previousNumber) - 1;
    heart.setAttribute("class", "fa-regular fa-heart");
    totalLikesNumber.textContent = parseInt(previousTotalNumber) - 1;
  }
}


//function to close the caroussel Modal
function closeCarousselModal() {
  const modal = document.querySelector("#media_modal");
  modal.style.display = "none";
}

init();
