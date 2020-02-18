const orderButton = document.getElementById("order-button");
const item_id = document.querySelector("[data-item-id]").getAttribute("data-item-id");
const shop_id = document.querySelector("[data-shop-id]").getAttribute("data-shop-id");
const quantity_input = document.getElementById("quantity")

orderButton.onclick = function() {
  const quantity = quantity_input.value
  console.log(quantity_input);
  axios.post(`/shopping/add-to-basket/${shop_id}/${item_id}`,{quantity}, {withCredentials: true})
    .then(dbRes => console.log(dbRes));
};
