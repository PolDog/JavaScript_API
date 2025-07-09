
const apiKey = "lzcuL2lTNG3pAyfKa7NtOYwpnUfoIeg8XCg6DEW20_Y";
const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}`;

const authorEl = document.querySelector(".author");
const photoImg = document.querySelector(".photo");
const likeBtn = document.querySelector(".likeBtn");
const likeCountEl = document.querySelector(".likeCount");

async function fetchPhotos() {
	try {
		const response = await fetch(url);
		const photos = await response.json();
		return photos;
	} catch (err) {
		console.log("ошибка загрузки фото ",err);
		const errorPhoto = {
			user: {
				first_name: "Ошибка",
				last_name: "Фото",
			},
			urls: {
				small: "./img/product0.png",
			},
			alt_description: "Ошибка",
		};
		return errorPhoto;
	}
}
async function loadPhoto() {
	const photo = await fetchPhotos();
	// console.log(photo);
	authorEl.textContent = photo.user.first_name + " " + photo.user.last_name;
	photoImg.src = photo.urls.small;
	photoImg.alt = photo.alt_description;

	console.log(photo);
}
likeBtn.addEventListener("click", function (e) {
	let count = parseInt(likeCountEl.textContent);
	count += 1;
	likeCountEl.textContent = count;
});
loadPhoto();
