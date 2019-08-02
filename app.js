window.addEventListener('load', ()=> { 
    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temp-description");
    let temperatureDegree = document.querySelector(".temp-degree");
    let locationTimexone= document.querySelector(".location-timezone");
    if(navigator.geolocation) { 
       navigator.geolocation.getCurrentPosition(position=> { 
           long=position.coords.longitude;
           lat=position.coords.latitude;
           const proxy='http://cors-anywhere.herokuapp.com/';
           const api= `${proxy}https://api.darksky.net/forecast/8c17efe282de3dd67150b53deb3ae059/${lat},${long}`;
           fetch(api)
           .then(data => {
               return data.json();
           }) 
           .then(response => { 
               
                const { temperature,summary, icon}=response.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent= summary;
                //locationTimexone.textContent=response.timezone;
                setIcons(icon,document.querySelector(".icon"));
           })    
        });
       
    }
    function setIcons (icon,iconId) {
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcon]);

        
    }
});