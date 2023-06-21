import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {

  const [infoApi, setInfoApi] = useState()
  const [haserror, setHaserror] = useState(false)

  const getApi = () => { 
    axios
      .get(url)
      .then(res => {
        setInfoApi(res.data)
        setHaserror(false)
      })
      .catch(err => {
        console.log(err)
        setHaserror(true)
      })
  }
  return [infoApi, getApi, haserror, setInfoApi]
}

export default useFetch