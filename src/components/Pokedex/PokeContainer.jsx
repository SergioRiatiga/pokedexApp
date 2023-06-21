import PokeCard from "./PokeCard"
import './styles/pokeContainer.css'

const PokeContainer = ({pokemons, pagina, porPagina}) => {

  return (
    <div className="pokecontainer">
      {
        pokemons?.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
          .map(pokemon => (
          <PokeCard
            key={pokemon.url}
            url={pokemon.url}
          />
        ))
      }
    </div>
  )
}

export default PokeContainer