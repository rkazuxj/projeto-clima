let cidades = [
    {nome: 'São Paulo', lat: -23.55, lon: -46.63},
    {nome: 'Rio de Janeiro', lat: -22.90, lon: -43.20},
    {nome: 'Salvador', lat: -12.97, lon: -38.50},
    {nome: 'Curitiba', lat: -25.42, lon: -49.27},
    {nome: 'Fortaleza', lat: -3.71, lon: -38.52},
    {nome: 'Manaus', lat: -3.10, lon: -60.02}
]

const div = document.querySelector('#weather-cards')

cidades.forEach(cidade => {
    fetchTempo(cidade)
})

async function fetchTempo(cidade){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cidade.lat}&longitude=${cidade.lon}&current=temperature_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`

    const response = await fetch(url)
    const json = await response.json()
    montaCard(cidade.nome, json)
}

function montaCard(cidade, json){
    console.log(json)
    div.innerHTML += `<div class='card'>
                        <h2>${cidade}</h2>
                        <div class='weather-icon'>
                            ${getIcon(json.current.weather_code)}
                        </div>
                        <div class='temperature'>
                            ${json.current.temperature_2m}°C
                        </div>
                        <div class='description'>
                            ${getDesc(json.current.weather_code)}
                        </div>
                      </div>`
}

function getIcon(code){
    switch(code){
        case 0: return '☀️'  
        case 1: return '🌤️' 
        case 2: return '⛅'   
        case 3: return '☁️'   
        case 45:
        case 48: return '🌫️'    
        case 51:
        case 53:
        case 55: return '🌦️' 
        case 56:
        case 57: return '🌧️'  
        case 61:
        case 63:
        case 65: return '🌧️'
        case 66:
        case 67: return '🌧️❄️' 
        case 71:
        case 73:
        case 75: return '🌨️' 
        case 77: return '🌨️'
        case 80:
        case 81:
        case 82: return '🌧️' 
        case 85:
        case 86: return '🌨️'    
        case 95: return '⛈️'   
        case 96:
        case 99: return '⛈️🌨️'
        default: return '❓'     
    }
}

function getDesc(code){
    switch(code){
        case 0: return 'Céu limpo'
        case 1: return 'Poucas nuvens'
        case 2: return 'Parcialmente nublado'
        case 3: return 'Nublado'
        case 45:
        case 48: return 'Neblina'
        case 51:
        case 53:
        case 55: return 'Chuvisco'
        case 56:
        case 57: return 'Chuvisco congelante'
        case 61:
        case 63:
        case 65: return 'Chuva'
        case 66:
        case 67: return 'Chuva congelante'
        case 71:
        case 73:
        case 75: return 'Neve'
        case 77: return 'Grãos de neve'
        case 80:
        case 81:
        case 82: return 'Pancadas de chuva'
        case 85:
        case 86: return 'Pancadas de neve'
        case 95: return 'Trovoada'
        case 96:
        case 99: return 'Trovoada com granizo'
        default: return 'Condição desconhecida'
    }
}