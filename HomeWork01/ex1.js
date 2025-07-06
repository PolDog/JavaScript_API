const sessionsData = [
	{
		name: "Занятие 1",
		time: "12:00",
		maxAmountPerson: 10,
		currentAmountPerson: 0,
	},
	{
		name: "Занятие 2",
		time: "12:00",
		maxAmountPerson: 10,
		currentAmountPerson: 10,
	},
	{
		name: "Занятие 3",
		time: "12:00",
		maxAmountPerson: 10,
		currentAmountPerson: 9,
	},
];
const sessionsList = document.querySelector(".sessionsList");
if (localStorage.getItem("sessions")) {
	sessionsList.innerHTML = localStorage.getItem("sessions");
} else {
	sessionsData.forEach((session) => {
		const sessionItem = createSession(session);
		sessionsList.append(sessionItem);
	});
}
const container = document.querySelector(".container");

function createSession(session) {
	console.log(session);
	const sessionItem = document.createElement("li");
	sessionItem.classList.add("sessionItem");

	const sessionName = document.createElement("h2");
	sessionName.classList.add("sessionName", "line");
	sessionName.textContent = session.name;

	const sessionTime = document.createElement("p");
	sessionTime.classList.add("sessionTime");
	sessionTime.textContent = session.time;

	const maxAmountPerson = document.createElement("div");
	maxAmountPerson.classList.add("info");

	const maxAmountPersonText = document.createElement("p");
	maxAmountPersonText.textContent = "Максимальное число участников:";

	const maxAmountPersonValue = document.createElement("p");
	maxAmountPersonValue.classList.add("maxAmountPersonValue");
	maxAmountPersonValue.textContent = session.maxAmountPerson;

	maxAmountPerson.append(maxAmountPersonText);
	maxAmountPerson.append(maxAmountPersonValue);

	const currentAmountPerson = document.createElement("div");
	currentAmountPerson.classList.add("info");
	const currentAmountPersonText = document.createElement("p");
	currentAmountPersonText.textContent = "Текущее число участников:";
	const currentAmountPersonValue = document.createElement("p");
	currentAmountPersonValue.classList.add("currentAmountPersonValue");
	currentAmountPersonValue.textContent = session.currentAmountPerson;
	currentAmountPerson.append(currentAmountPersonText);
	currentAmountPerson.append(currentAmountPersonValue);

	const buttonBlock = document.createElement("div");
	buttonBlock.classList.add("buttonBlock");
	let recordButton = document.createElement("button");
	recordButton.classList.add("btn", "record");
	recordButton.textContent = "Записаться";
	recordButton = checkMaxPerson(recordButton, currentAmountPersonValue, maxAmountPersonValue);

	let cancelButton = document.createElement("button");
	cancelButton.classList.add("btn", "cancel");
	cancelButton.textContent = "Отменить запись";
	cancelButton = checkMinPerson(cancelButton, currentAmountPersonValue);

	buttonBlock.append(recordButton);
	buttonBlock.append(cancelButton);

	sessionItem.append(sessionName);
	sessionItem.append(sessionTime);
	sessionItem.append(maxAmountPerson);
	sessionItem.append(currentAmountPerson);
	sessionItem.append(buttonBlock);

	return sessionItem;
}

function checkMinPerson(button, current) {
	if (parseInt(current.textContent) === 0) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
	return button;
}
function checkMaxPerson(button, current, max) {
	if (parseInt(current.textContent) >= parseInt(max.textContent)) {
		button.disabled = true;
	} else {
		button.disabled = false;
	}
	return button;
}

sessionsList.addEventListener("click", (e) => {
	const sessionItem = e.target.closest("li");
	const currentAmountPersonValue = sessionItem.querySelector(".currentAmountPersonValue");
	const maxAmountPersonValue = sessionItem.querySelector(".maxAmountPersonValue");
	let recordButton = sessionItem.querySelector(".record");
	let cancelButton = sessionItem.querySelector(".cancel");
	if (e.target.textContent == "Отменить запись") {
		currentAmountPersonValue.textContent = parseInt(currentAmountPersonValue.textContent) - 1;
	}
	if (e.target.textContent == "Записаться") {
		currentAmountPersonValue.textContent = parseInt(currentAmountPersonValue.textContent) + 1;
	}
	cancelButton = checkMinPerson(cancelButton, currentAmountPersonValue);
	recordButton = checkMaxPerson(recordButton, currentAmountPersonValue, maxAmountPersonValue);
	localStorage.setItem("sessions", sessionsList.innerHTML);
});
