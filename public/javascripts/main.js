import service from "./api.js";
const geocoder = new google.maps.Geocoder();

const martinique = {
    lat: 14.6, 
    lng: -60.95 
  };
  
  const markers = []
  
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: martinique
  });

  let center = {
    lat: undefined,
    lng: undefined
  }; 

  function getShops() {
    service.get("/shopping/shops/api")
     .then(response => {
        console.log(response.data);
        response.data.forEach((element, i) => {
            console.log('element =',element.address.address1)
            let geoAddress  = element.address.address1 + element.address.city + element.address.departement
            console.log(geoAddress)
            geocoder.geocode({address : geoAddress}, function (results, status) {
                if (status === 'OK') {

                  map.setCenter(results[0].geometry.location);
                  let dot = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                  });
                  document.getElementById('latitude').value = results[0].geometry.location.lat();
                  document.getElementById('longitude').value = results[0].geometry.location.lng();
                }
              }
            )
        });
        })
        .catch(error => console.log(error));
    //    placeShops(response.data.shops);
     }
getShops();