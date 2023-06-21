import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './styles/pokedex.css'
import Paginacion from "../components/Paginacion/Paginacion"


const Pokedex = () => {

  const [selectValue, setSelectValue] = useState('all-pokemons')
  
  const trainerName = useSelector(states => states.trainerName)

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=1281&offset=0'
  const [ pokemons, getAllPokemons, hasError, setPokemons]= useFetch(url)

  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [ types, getAllTypes] = useFetch(urlTypes)

  useEffect(() => {
    if (selectValue === 'all-pokemons') {
      getAllPokemons()
    } else {
      axios
        .get(selectValue)
        .then(res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
          }
          setPokemons(data)
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])
  

  useEffect(() => {
    getAllTypes()
  }, [])

  const searchPokemon = useRef()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const inputvalue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputvalue}`)
  }

  const handleChangeType = e => {
    e.preventDefault()
    setSelectValue(e.target.value)
  }
  

  const [pagina, setPagina] = useState(2)
  const [porPagina, setPorPagina] = useState(16)
  const maximo = pokemons?.results.length / porPagina

  return (
    <div className="pokedex">
      <header className="pokedex__header">
        <div className="pokedex__logo">
        <img src="../../public/Pokédex.svg" alt="logo pokedex" />
        </div>
        <div className="pokedex__backgroundLogo">
        <img className="pokedex__backgroundLogo-img"src="../../public/belt2.jpg" alt="" />
        </div>
      </header>
      <p className="pokedex__welcome">
        <span className="pokedex__welcome-red">Welcome {trainerName}!,</span> 
        <span> here you can find your favorite pokémon.</span></p>
      <form className="pokedex__searchForm" onSubmit={handleSubmit}>
        <input  className="pokedex__searchform-input" ref={searchPokemon} placeholder="Pokemon's name..." type="text" />
        <button className="pokedex__searchForm-btn">Search</button>
      </form>
      <select className="pokedex__select" onChange={handleChangeType}>
        <option className="pokedex__select-option" value="all-pokemons">All pokémons</option>
        {
          types?.results.map(typeInfo => (
            <option 
              value={typeInfo.url}
              key={typeInfo.url}
            >{typeInfo.name} </option>
          ))
        }
      </select>
      <div className="gridCards">
      <PokeContainer pokemons = {pokemons?.results} pagina={pagina} porPagina={porPagina}/>
      </div>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  )
}

export default Pokedex