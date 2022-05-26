import { type } from "../customjs/type.js";
let welcome = document.querySelector('[data-type="yes"]');
let sectionOne = document.querySelector(".inner-wrapper");
let speed = 150;
let count = 0;
let checkarr = 0;
type.element = welcome;

document.addEventListener("DOMContentLoaded", (e) => {
	// let words = "welcome to my portfolio";
	type.writeOnly(welcomeText);
	setTimeout(() => {
		sectionOne.classList.add("anim");
	}, 1000);
});
$("div.dot").on("click", (e) => {
	location.href = location.origin;
	console.log("click");
});
