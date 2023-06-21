import React, { useState } from 'react'
import './styles/paginacion.css'

const Paginacion = ({pagina, setPagina, maximo}) => {
  const [input, setInput] = useState(1)

  const nextPage = () => {
    setInput(pagina + 1)
    setPagina(pagina + 1)
  }

  const backPage = () => {
    setInput(pagina - 1)
    setPagina(pagina - 1)
  }

  return (
    <div className='btns'>
      <button className='btnmove' onClick={backPage}><i className='bx bx-left-arrow' ></i></button>
      <input  className = 'count' name='page' autoComplete='off' value={input} type="text" />
      <p className='paginacion__p'>of   {Math.ceil(maximo)}</p>
      <button className='btnmove' onClick={nextPage}><i className='bx bx-right-arrow'></i></button>
    </div>
  )
}

export default Paginacion