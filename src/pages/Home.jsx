import { useRef } from "react"
import { setTrainerNameG } from "../store/slices/trainerName.slice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/home.css'

const Home = () => {

  const trainerNameRef = useRef()

  const navigate = useNavigate()

  const trainerName = useSelector(states => states.trainerName)

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
    navigate("/pokedex")
  }

  console.log(trainerName)

  return (
    <div className="home">
      <div className="home__title">
        <img src="../../public/img/Pokédex.svg" alt="logoPokedex" />
      </div>
      <h2 className="home__greetings">Hello trainer!</h2>
      <p className="home_pargraph">To get started, give me your trainer's name.</p>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="home__input" ref={trainerNameRef} placeholder="Min 3 characters please..." type="text" />
        <button className="home__btn">Catch them all!</button>
      </form>
      <footer className="home__footer">
        <img  className="home__belt" src="../../public/img/belt.svg" alt="" />
        <p className="personal__info">Sergio Andrés Riatiga Ibáñez, sergioriatiga@gmail.com, <a href="https://github.com/SergioRiatiga" target="_blank">github</a>.</p>
      
      </footer>
    </div>
  )
}

export default Home