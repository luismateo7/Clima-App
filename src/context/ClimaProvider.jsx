import { useState, createContext } from "react";
import axios from "axios";

const ClimaContext = createContext()

const ClimaProvider = ({children})=>{

    const [clima, setClima ] = useState({})
    const [ cargando, setCargando ] = useState(false)
    const [ noResultado, setNoResultado ] = useState(false)

    const [ busqueda, setBusqueda ] = useState({
        ciudad: '',
        pais: ''
    })

    const datosBusqueda = e =>{
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const consultarClima = async datos =>{
        setCargando(true)
        setNoResultado(false)
        setClima({})
        try {
            const { ciudad, pais } = datos
            const appId = import.meta.env.VITE_API_KEY

            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`
            
            const { data } = await axios(url)
            const { lat, lon } = data[0]

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const { data: dataClima } = await axios(urlClima)
            setClima(dataClima)
            
        } catch (error) {
            setNoResultado(true)
        } finally{
            setCargando(false)
        }
    }

    return(
        <ClimaContext.Provider 
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                clima,
                cargando,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export{
    ClimaProvider
}

export default ClimaContext