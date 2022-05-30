document.addEventListener("DOMContentLoaded", () => {
  
  let form = document.querySelector("form")
  form.addEventListener("submit", (e) =>{
    e.preventDefault()
    clearCard()
    loadPage(e.target.search_pokemon.value) //returns user input
    form.reset()
  })
    
    const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/'
 
    function loadPage(name) {
      fetch(pokeAPI + name)
      .then((res)=> res.json())
      .then((data)=> {
      // console.log(data)
      cardConstruct(data)
      })
      .catch(function(error){
        const modal = document.querySelector('div#modal')
        modal.className = ''
        setTimeout(function () {
          return modal.className = 'hidden'
        }, 3000)
      })
    }
    function cardConstruct(data){

    const cardDefault = `${data.sprites.other['official-artwork'].front_default}`
    
    const cardData = 
    `<div className ='pokemon' id='${data.name}'>
    <ul>
      <li>Name: ${data.name}</li>
      <li>Abilities:</li>
      <ul>
        <li>${data.abilities[0].ability.name}</li>
        <li>${data.abilities[1].ability.name}</li>
      </ul>
      <li>Height: ${data.height}</li>
      <li>Weight: ${+ data.weight}</li>
      <li>Stats:</li>
      <ul>
        <li>${data.stats[0].stat.name +': ' + data.stats[0].base_stat}</li>
        <li>${data.stats[1].stat.name +': ' + data.stats[1].base_stat}</li>
        <li>${data.stats[2].stat.name +': ' + data.stats[2].base_stat}</li>
        <li>${data.stats[3].stat.name +': ' + data.stats[3].base_stat}</li>
        <li>${data.stats[4].stat.name +': ' + data.stats[4].base_stat}</li>
        <li>${data.stats[5].stat.name +': ' + data.stats[5].base_stat}</li>
      </ul>
      </ul>
      </div>`;

      const card = document.createElement('div')
      card.className = 'pokemon'
      card.id = data.name
      pokecard.appendChild(card)
      const imgCon = document.createElement('img')
      imgCon.className = 'poke-pic'
      const pokeData = document.createElement('div')
      pokeData.className = 'poke-data'
      const cardFooter = document.createElement('div')
      cardFooter.className = 'footer'
      imgCon.src = cardDefault
      pokeData.innerHTML = cardData
      const catchPoke = document.createElement('button')
      catchPoke.className = 'button'
      catchPoke.innerText = 'Catch this Pokemon!'
      card.appendChild(imgCon)
      card.appendChild(pokeData)
      card.appendChild(cardFooter)
      cardFooter.appendChild(catchPoke)
      catchPoke.addEventListener('click', addToPokedex)
    }

    function clearCard(){
      pokecard.innerHTML = ''
    }

    function addToPokedex(e){
      let addName = e.target.parentNode.parentNode.id
      const miniContainer = document.createElement('div')
      pokedex.appendChild(miniContainer)
      const dexEntry = document.createElement('p')
      dexEntry.innerText = addName
      dexEntry.id = 'caught-' + addName
      miniContainer.appendChild(dexEntry)
      dexEntry.addEventListener('click', choosePokemon)
      pokedex.className = ''
      const deleteBTN = document.createElement('button')
      deleteBTN.innerText = 'x'
      deleteBTN.className = 'delete'
      miniContainer.appendChild(deleteBTN)
      deleteBTN.addEventListener('click', removeFromDex)
      // console.log(pokedex)
    }

    function choosePokemon(e){
      // console.log(e.target.parentNode)

    
      if(e.target.innerText[0] === '♥'){
        const makeArr = e.target.innerText.split(' ');
        e.target.innerText = makeArr[1]
        e.target.style.color = 'white'
         
       }else{
        const heartName = '♥ ' + e.target.innerText
        e.target.innerHTML = heartName
        e.target.style.color = 'red'
        }

    }

    function removeFromDex(e){
      
      e.target.parentNode.remove()
      runCheck()
      console.log(pokedex.innerHTML)
    }

    document.querySelector("#open-dex").addEventListener("click",(e)=>{
      if(pokedex.className === "hidden") {
        pokedex.className = ""
      }else {
        pokedex.className = "hidden"
      }
    })

    function runCheck(){
        // console.log(pokedex.firstChild.typeof)
        // console.log(pokedex.innerHTML.length)
        if(pokedex.innerHTML.length <= 4){
          pokedex.className = "hidden"
        }
        
      }
    // }

  const pokecard = document.querySelector("#pokecard")
  // const pokemon = document.getElementsByClassName('pokemon')
  const pokedex = document.querySelector('#pokedex')
  

  });
