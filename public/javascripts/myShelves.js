// const imageFile = document.getElementById("file-input");
const category = document.getElementById("category");
const description = document.getElementById("description");
const productImage = document.getElementById("product-image");
const imageFile = document.getElementById("file-input");
const price = document.getElementById("price");
const name = document.getElementById("name");
 const deleteBtn = document.querySelector(".deletebtn")
 const dltbuttons = document.querySelectorAll(".delete-btn")
 const editbuttons = document.querySelectorAll(".edit-btn")
 const formEdit = document.querySelector(".edit-content");
 const shopId = document.querySelector("[data-shop-id]").getAttribute("data-shop-id")
 var id;

 import service from "./api.js";
 
var trucAdelete ;
var trucAedit;

dltbuttons.forEach(btn => {
  btn.onclick = function (event){
    document.getElementById('delete-modal').style.display='block'
    trucAdelete = event.target.closest(".block")
    id = event.target.getAttribute("data-item-id")
  }});

deleteBtn.onclick = function(event) {
  service.get(`/myshop/delete-item/${shopId}/${id}`)
    .then(shop => {trucAdelete.parentElement.removeChild(trucAdelete);
      document.getElementById('delete-modal').style.display='none'})
    }
function displayFormWithInfos (infosToDisplay) {
  productImage.src = infosToDisplay.data.image
  name.value = infosToDisplay.data.name;
  description.value = infosToDisplay.data.description;
  price.value = infosToDisplay.data.price
}

function displayNewInfos (trucAedit, infosToDisplay) {
  const infoToEdit = trucAedit.querySelector('.infos-placeholder');
  infoToEdit.querySelector(".display-name").innerHTML = `Item : ${infosToDisplay.data.name}`
  infoToEdit.querySelector(".display-description").innerHTML = `Description : ${infosToDisplay.data.description}`
  infoToEdit.querySelector(".display-price").innerHTML = `Price : ${infosToDisplay.data.price}`
}
imageFile.onchange = () => {
  if(imageFile.files[0]){
    const tmpUrl = URL.createObjectURL(imageFile.files[0]);
    console.log(imageFile.files[0])
    productImage.src = tmpUrl;
  }
}

editbuttons.forEach(btn => {
  btn.onclick = function (event){
    id = event.target.getAttribute("data-item-id")
    trucAedit = event.target.closest(".block")
    service.get(`/myshop/get-item-info/${shopId}/${id}`)
    .then(infos => { 
      document.getElementById('edit-modal').style.display='block';
      displayFormWithInfos(infos)
    }) 
  }});

  formEdit.onsubmit = function(event) {
    event.preventDefault();
    console.log(price);
    console.log(price.value)
    const newInfos = {description : description.value, name: name.value, price: price.value }
      service.post(`/myshop/edit-item/${shopId}/${id}`, {newInfos}).then(infos=> {
        displayNewInfos(trucAedit, infos);
        document.getElementById('edit-modal').style.display='none'
      });
    };
