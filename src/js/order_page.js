const orderDetails = sessionStorage.getItem("orderDetails");
const orderImg = document.querySelector(".header__order__img");
const orderName = document.querySelector(".header__order__name");

console.log("hello", orderDetails);

if (orderDetails) {
  orderImg.src = JSON.parse(orderDetails).image;
  orderName.innerText = JSON.parse(orderDetails).description;
}
