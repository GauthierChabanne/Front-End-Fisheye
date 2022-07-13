function mediaFactory(data) {
  const {id, photographerId, title, image, video, likes, date, price} = data;

  const picture = `assets/images/${image}`;
  const pictureVideo = `assets/images/${video}`

  function getMediaCardDOM() {
    const photo = document.createElement('article');
    photo.setAttribute("class", "photographer_media")
    let photoMedia = ""

    if (image !== undefined) {
      photoMedia = document.createElement('img');
      photoMedia.setAttribute("src", picture);
      photoMedia.setAttribute("alt", " ");
    } else {
      photoMedia = document.createElement("video");
      photoMedia.setAttribute("alt", " ")
      photoMediaSource = document.createElement("source");
      photoMediaSource.setAttribute("src", pictureVideo);
      photoMediaSource.setAttribute("type", "video/mp4");
      photoMedia.setAttribute("controls", "controls");
      photoMedia.appendChild(photoMediaSource)
    }

    photoMedia.setAttribute("alt", title + ", closeup view");
    const photoInfos = document.createElement('div');
    photoInfos.setAttribute("class", "photo_infos");
    const photoTitle = document.createElement('p');
    photoTitle.textContent = title
    photoTitle.setAttribute("class", "photo_title");
    const photoLikes = document.createElement("div");
    photoLikes.setAttribute("class", "photo_likes");
    photoLikes.setAttribute("onclick", "addLike(this)")
    const photoLikesNumber = document.createElement("p");
    photoLikesNumber.textContent = likes;
    photoLikesNumber.setAttribute("class", "photo_likes_number");
    const photoLikesHeart = document.createElement("i");
    photoLikesHeart.setAttribute("class", "fa-regular fa-heart");
    photoLikesHeart.setAttribute("aria-label", "likes");
    photoLikes.appendChild(photoLikesNumber);
    photoLikes.appendChild(photoLikesHeart);
    photoInfos.appendChild(photoTitle);
    photoInfos.appendChild(photoLikes);
    photo.appendChild(photoMedia);
    photo.appendChild(photoInfos);
    return (photo)

  }
  return {id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}
}
