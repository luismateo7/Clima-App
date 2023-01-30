import Formulario from "./Formulario"
import Clima from "./Clima"
import Loading from "./Loading"
import useClima from "../hooks/useClima"

export default function AppClima() {

  const { clima, cargando, noResultado } = useClima()

  return (
    <main className="dos-columnas">
        <Formulario />

        {cargando ? <Loading /> :
        clima?.name ? <Clima /> :
        noResultado ? <p>No hay resultados</p> :
        <p>El clima se va mostrar aquí</p>}
    </main>
  )
}
