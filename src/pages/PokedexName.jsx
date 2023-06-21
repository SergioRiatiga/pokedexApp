import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/pokedexName.css'

const PokedexName = () => {

  const {name} = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [pokemon, getPokemonByName, hasError] = useFetch(url)

  useEffect(() => {
    getPokemonByName()
  }, [name])

  return (
    <div>
      {
        hasError?
        <h1>❌The Pokémon "<span>{name} </span>" dosen't exist</h1> :
        (
          <div className="pokedexName">
            <header className="pokedexName__header">
              <div className="pokedexName__header-logo">
              <img src="../../images/Pokédex.svg" alt="logo pokedex" />
              </div>
              <div className="pokedexName__header-backgroundLogo">
              <img className="pokedexName__header-backgroundLogo-img"src="../../images/belt2.svg" alt="" />
              </div>
            </header>
            <section className={`cardInfo ${pokemon?.types[0].type.name}`}>
                <div className={`cardInfo__header bg-${pokemon?.types[0].type.name}`}>
                  <img className="cardInfo__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
                </div>
                <div className="cardInfo__idBox">
                <h2 className="cardInfo__id">{`#${pokemon?.id}`} </h2>
                </div>
                <div className="cardInfo__nameBox">
                  <h2 className="cardInfo__name">{pokemon?.name} </h2>
                  <hr className="cardInfo__name-hr"/>
                </div>
                <ul className="cardInfo__listPhysical">
                  <li className="cardInfo__listPhysical-item">
                    <span className="cardInfo__listPhysical-label">Weight</span>
                    <span className="cardInfo__listPhysical-value">{pokemon?.weight} </span>
                  </li>
                  <li className="cardInfo__listPhysical-item">
                    <span className="cardInfo__listPhysical-label">Height</span>
                    <span className="cardInfo__listPhysical-value">{pokemon?.height} </span>
                  </li>
                </ul>
                <section className="cardInfo__typeAbility">
                  <div  className="cardInfo__typeAbility-type">
                    <h2 className="cardInfo__typeAbility-typeTitle">Type</h2>
                    <ul className="cardInfo__typeAbility-typeList">
                      {
                        pokemon?.types.map(typeInfo => (
                          <li className={`cardInfo__typeAbility-typeList-item bg-btn-${pokemon?.types[0].type.name}`} key={typeInfo.type.url}> {typeInfo.type.name} </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="cardInfo__typeAbility-ability">
                    <h2 className="cardInfo__typeAbility-abilityTitle">Abilities</h2>
                    <ul className="cardInfo__typeAbility-abilityList">
                      {
                        pokemon?.abilities.map(abilityInfo => (
                          <li className="cardInfo__typeAbility-abilityList-item" key={abilityInfo.ability.url}> {abilityInfo.ability.name} </li>
                        ))
                      }
                    </ul>
                  </div>
                </section>
                <div className="stats">
                  <div className="stats__titleBox">
                    <h2 className="stats__title">Stats</h2>
                    <hr className="stats__title-hr"/>
                  </div>
                  <ul className="stats__list">
                    {
                      pokemon?.stats.map(statInfo => (
                        <li className="stats__listItems" key={statInfo.stat.url}>
                          <div className="stats__listItems-box">
                            <span className="stats__listItems-label">{statInfo.stat.name} </span>
                            <span className="stats__listItems-value">{statInfo.base_stat}/150 </span>
                          </div>
                          <div>
                            <progress className="stats__bar" value={statInfo.base_stat} max={150}/>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
            </section>
            <section className="movements">
              <div className="movements__titleBox">
              <h2 className="movements__title">Movements</h2>
              <hr className="movements__title-hr"/>
              </div>
              
              <ul className="movements__list">
                {
                  pokemon?.moves.map(moveInfo => (
                    <li className="movements__item" key={moveInfo.move.url}>
                      <span className="movements__item-span">{moveInfo.move.name} </span>
                    </li>
                  ))
                }
              </ul>
            </section>
          </div>
        )
      } 
    </div>
  )
}

export default PokedexName