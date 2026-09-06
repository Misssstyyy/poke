  import { useState } from 'react'
  import './App.css'
  function App() {
      const [data, setData] = useState(null)
      const [weight, setWeight] = useState(null)
      const [type, setType] = useState(null)
      const [name, setName] = useState('')
      const [sprite, setSprite] = useState(null)
      const [hue, setHue] = useState(0)
const[beta,setBeta] = useState(null)
const[alpha,setAlpha] = useState(null)
    async function card(name){
      
      const pokemonName = name.trim().toLowerCase()

      if (!pokemonName) {
        setData(null)
        setWeight(null)
        setType(null)
        setSprite(null)
        return
      }

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        if (!res.ok) {
          setData(null)
          setWeight(null)
          setType(null)
          setSprite(null)
          return
        }

        const data = await res.json()
        setData(data)
        setWeight(data.weight)
        setType(data.types[0].type.name)
        setSprite(data.sprites.other.home.front_default)
        setHue(Math.floor(Math.random() * 360))
      } catch {
        setData(null)
        setWeight(null)
        setType(null)
        setSprite(null)
      }
  }
  
  async function EV(name) {
  const cleanName = name.trim().toLowerCase()  // ← add this
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${cleanName}/`)
          const beta = await res.json()
          setBeta(beta)
          const fetchy =  beta.evolution_chain.url
          const ress =  await fetch(fetchy)
          const alpha = await ress.json()
          setAlpha(alpha)

          function findNextEvolution(node) {
            if (node.species.name === cleanName  ) {
              return node.evolves_to?.[0]?.species?.name
            }

            for (const evolution of node.evolves_to ?? []) {
              const nextEvolution = findNextEvolution(evolution)
              if (nextEvolution) return nextEvolution
            }
          }

          const nextEvolution = findNextEvolution(alpha.chain)
          if (nextEvolution) {
            card(nextEvolution)
            setName(nextEvolution)
            console.log(nextEvolution)
          } else {
            console.log(`${cleanName} has no further evolution`)
          }
  }
      return (<> 
    
    <h1>Pokemon Cards Generator</h1>
    <input type="text" placeholder='Enter The Pokemon&apos; s name' value={name} onChange={(e) => { setName(e.target.value); card(e.target.value); }}></input>
    {data &&(    <div className='card' style={{
  '--first':  `hsl(${hue}, 80%, 30%)`,
  '--second': `hsl(${hue}, 70%, 50%)`,
  '--third':  `hsl(${hue}, 60%, 20%)`,
}}>
  <div className='top'>
    <p className='name'>{data?.name}     </p>
    <p className='hp'> HP: {data?.stats[0].base_stat}</p> 
    </div>
    <img src={sprite} ></img>
    <p>Weight: {weight/10} kg</p>
    <p>Type: {type}</p>
    <button type="button" onClick={() => EV(name)}>Evolve !</button>
    </div>)}
    
    </>)
    
  } 
  export default App
