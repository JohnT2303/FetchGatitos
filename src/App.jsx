import { useEffect, useState } from 'react'
import './App.css'
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_URL = 'https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const threeFirstWord = fact.split(' ').slice(0, 3).join(' ')

        fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            setImageUrl(`https://cataas.com${url}`)
          })
      })
  }, [])
  return (
    <main>
      <h1>A cat once said:</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt='cat' />}
      </section>

    </main>
  )
}
