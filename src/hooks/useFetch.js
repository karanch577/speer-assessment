import React, { useEffect, useState } from 'react'
import { BASE_URL, CORS_PROXY_URL, API_REQUEST_ORIGIN } from '../constants'

function useFetch(url, refetch) {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const getData = async () => {
      setLoading(true)
        try {
            const proxyUrl = new URL(CORS_PROXY_URL)
            const apiUrlWithProxy = new URL(BASE_URL + url, proxyUrl)

            const response = await fetch(apiUrlWithProxy.href, {
                headers: {
                  'Origin': API_REQUEST_ORIGIN,
                },
              });
          
              const data = await response.json();
              setData(data);
        } catch (error) {
            console.log("Error in fetching Data ")
            setError(error)
        } finally {
          setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [refetch])
  
  // setLoading is alse return because it can be use in display spinner in call of api call on event handler 
  // in the api call we will update the refetch - which will call the getData() and finally set the loading to false
  // api call in event handler ==> setLoading to true ==> updated refetch ==> setLoading to false in getData()
  return {data, error, loading, setLoading}
}

export default useFetch