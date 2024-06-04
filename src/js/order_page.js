const ORDER_DETAILS = sessionStorage.getItem("orderDetails");
const ORDER_IMG = document.querySelector(".header__order__img");
const ORDER_NAME = document.querySelector(".header__order__name");

if (ORDER_DETAILS) {
  ORDER_IMG.src = JSON.parse(ORDER_DETAILS).image;
  ORDER_NAME.innerText = JSON.parse(ORDER_DETAILS).description;
}

function handleNewOrderButton() {
  sessionStorage.removeItem("orderDetails");
  window.location.href = "index.html";   
}