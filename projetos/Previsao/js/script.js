document.addEventListener('DOMContentLoaded', function() {
    // coordenadas para sao paulo,rio de janeiro, salvador 
    const cities = [
        { name: 'São Paulo', lat: -23.55, lon: -46.63 },
        { name: 'Rio de Janeiro', lat: -22.91, lon: -43.17 },
        { name: 'Salvador', lat: -12.97, lon: -38.51 }
    ];

   
    const weatherCards = document.getElementById('weather-cards'); // Container para os cards de clima 

    cities.forEach(city => { //arrow function para iterar sobre as cidades

        fetchWheatherData(city); // Chama a função para cada cidade
    });


    async function fetchWheatherData(city) { // Função para buscar dados do clima 
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        try {
            const response = await fetch(url); // Faz a requisição para a API
            if (!response.ok) { // Boa prática: checar se a requisição falhou
                throw new Error(`Erro HTTP: ${response.status}`); // Lança um erro se a resposta não for OK
            }
            const data = await response.json(); // Converte a resposta para JSON
            createWeatherCard(city.name, data); // Chama a função para criar o card de clima
        } catch (error) {
            console.error(`Erro ao buscar dados para ${city.name}:`, error); // Log de erro
            weatherCards.innerHTML += `<p>Nao foi possivel carregar os dados de ${city.name}.</p>`;
        }

    }

    function createWeatherCard(cityName, data) { // Função para criar o card de clima 

        const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code } = data.current; // Desestruturação dos dados atuais

        const weatherInfo = getWeatherInfo(weather_code); 

        const card = `
        <div class="card">
            <h2>${cityName}</h2> 
            <div class="weather-icon">${weatherInfo.icon}</div> 
            <div class="temperature">${temperature_2m}°C</div> 
            <div class="description">${weatherInfo.description}</div> 
            <div class="details">
                <p>Umidade: ${relative_humidity_2m}%</p> 
                <p>Vento: ${wind_speed_10m} km/h</p> 
            </div>
        </div>`; // Template do card de clima

        weatherCards.innerHTML += card; // Adiciona o card ao container
    }

    function getWeatherInfo(code) {
        // Mapeamento básico dos códigos WMO (usados pela Open-Meteo) para ícones e descrições
        const wmoCodes = {
            0: { icon: '☀️', description: 'Céu limpo' },
            1: { icon: '🌤️', description: 'Principalmente limpo' },
            2: { icon: '⛅', description: 'Parcialmente nublado' },
            3: { icon: '☁️', description: 'Nublado' },
            45: { icon: '🌫️', description: 'Nevoeiro' },
            51: { icon: '🌧️', description: 'Garoa leve' },
            53: { icon: '🌧️', description: 'Garoa moderada' },
            55: { icon: '🌧️', description: 'Garoa densa' },
            61: { icon: '🌧️', description: 'Chuva leve' },
            63: { icon: '🌧️', description: 'Chuva moderada' },
            65: { icon: '🌧️', description: 'Chuva forte' },
            95: { icon: '⛈️', description: 'Trovoada' },
            // pode adicionar mais 
        };
        // Retorna o objeto (ícone e descrição) ou um padrão caso o código não esteja mapeado
        return wmoCodes[code] || { icon: '', description: 'Dados indisponíveis' };
    }

});