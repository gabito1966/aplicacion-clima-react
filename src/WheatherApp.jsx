import { useState } from "react"

export const WheatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '201517c6519a79a5112933113e9c9844'
    let difKelvin = 273.15


    const [ciudad, setCiudad] = useState('')
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) {
            fetchClima()
        }
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClima(data)
        } catch (error) {
            console.error('Ocurrio el siguiente problema: ', error)
        }
    }
    return (
        <div className="container">
            <h1>Aplicación de clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                />
                <button type="submit">Buscar ciudad</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>Ciudad: {dataClima.name}</h2>
                        <p>Pais: {dataClima.sys.country}</p>
                        <p>Temperatura: {(dataClima.main.temp - difKelvin).toFixed(1) + '°C'}</p>
                        <p>Humedad: {(dataClima.main.humidity) + '%'}</p>
                        <p>Condicion Metereologica: {dataClima.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}