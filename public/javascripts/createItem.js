const imageFile = document.getElementById("file-input");
const productImage = document.getElementById("product-image");

imageFile.onchange = () => {
    if(imageFile.files[0]){
      const tmpUrl = URL.createObjectURL(imageFile.files[0]);
      console.log(tmpUrl)
      console.log(imageFile.files[0])
      productImage.src = tmpUrl;
    }
  }
