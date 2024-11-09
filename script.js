async function getWeather() {
    const location = document.getElementById('location').value;
    const apiKeyGeo = '662a65df53864241ab637c775c6489dc';
    const apiKeyWeather = 'f36feb2287b2f431e6ec639abdda8493';

    try {
        // Étape 1 : Récupérer les coordonnées géographiques
        const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKeyGeo}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        const { lat, lng } = geoData.results[0].geometry;

        // Étape 2 : Obtenir la météo en utilisant les coordonnées
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKeyWeather}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // Afficher le résultat
        document.getElementById('result').innerHTML = `
            <h2>Météo à ${location}</h2>
            <p>Température : ${weatherData.main.temp}°C</p>
            <p>Conditions : ${weatherData.weather[0].description}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerHTML = `<p>Erreur : ${error.message}</p>`;
    }
}