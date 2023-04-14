//Déf VARIABLES
const ApiKey = '63b86ccc6d55c58d81196cac6a504f01'



//Méthode 1---------------------------------------------------------------------------
function getMeteo() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${ApiKey}&lang=fr&units=metric`
    fetch(url)
    .then(r => r.json())
    .then(data => {
        console.log(data);
        let ville = 'Ville : ' + data.name + ', ' + data.sys.country;
        let temperature = data.main.temp + ' °C';
        let pressure = data.main.pressure + ' hPa';
        return pressure
    })
    // .catch()
}
// getMeteo()








//Méthode 2 : test promise--------------------------------------------------------------------------- 
function getMeteoo(url) {
    return new Promise((resolve, reject) => {
        let request = fetch(url, {method: 'GET'})
        console.log(request)

        request.addEventListener("load", function(){ //KO
        if(request.status === 200) {
          resolve(console.log('test', request.status));
        }
        else {
          reject("Erreur du serveur : " + request.status);
        }
      }, false);
 
    });
  }

async function miseAJour() {
try {
    const json = await getMeteo(url);
} catch(msg) {
}
}
// miseAJour();















//Méthode 3 : fonction async + await---------------------------------------------------------------------------
document.querySelector('#bouton_ok').addEventListener('click', () => refreshMeteo()) //on appelle comme ceci une fonction dans un addEventListener (explication au pb sur formulaire)

async function refreshMeteo() {

    //1) Récupération lat et lon----------------------------------
    const cityName = document.getElementById('city_input').value
    // console.log(cityName)
    // const urlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${ApiKey}`
    // const fetchResultGeo = await fetch(urlCity)
    // const dataGeo = await fetchResultGeo.json()
    // // console.log(fetchResultGeo)
    // console.log(dataGeo)
    // let lat = 0 //init lat
    // let lon = 0 //init lon
    // if (fetchResultGeo.status === 200) {
    //     lat = dataGeo[0].lat
    //     lon = dataGeo[0].lon
    //     console.log(lat)
    //     console.log(lon)
    // } else {
    //     msg = 'Nom de ville inconnu, réessayer'
    //     document.getElementById('city').innerHTML = msg
    //     // console.log('KO : Réponse =' + fetchResultGeo.status)
    //     return //pour stopper programme
    // }

    //2) Récupération Météo----------------------------------
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&lang=fr&units=metric`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${ApiKey}&lang=fr&units=metric`
    const fetchResult = await fetch(url)
    const data = await fetchResult.json()
    // console.log(fetchResult)
    console.log(data)

    if (fetchResult.status === 200) { //FAIRE PLUTOT si pb stop sinon action
        //affihage dans le HTML
        document.getElementById('city').innerHTML = '<h2>' + data.name + ', ' + data.sys.country + '<h2/>'
        const description = data.weather[0].description
        document.getElementById('description').innerHTML =  description[0].toUpperCase() + description.slice(1)
        document.getElementById('temperature').innerHTML = 'Température : ' + data.main.temp + ' °C'
        document.getElementById('pressure').innerHTML = 'Pression : ' + data.main.pressure + ' hPa'
        document.getElementById('img_meteo').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    } else {
        msg = 'Nom de ville inconnu, réessayer'
        document.getElementById('city').innerHTML = msg
        // console.log('KO : Réponse =' + fetchResult.status)
        // throw new Error('erreur')
    }

}




//comportement page
//bouton
const button_ok = document.querySelector("#bouton_ok")
document.querySelector("#city_input").addEventListener('input', () => {
    const city_input = document.getElementById("city_input").value
    if(city_input.length >= 1) {
        button_ok.disabled = false
    } else {
        button_ok.disabled = true
    }
})




