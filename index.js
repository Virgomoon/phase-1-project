document.addEventListener("DOMContentLoaded", () => {
  
  fetch("http://localhost:3000/pokemon")
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data)

    data.forEach(item => console.log(item))

    data.forEach(item => firstConstruct(item))

    pokedex.className = "hidden"
  })
  

  let form = document.querySelector("form")
  form.addEventListener("submit", (e) =>{
    e.preventDefault()
    clearCard()
    loadPage(e.target.search_pokemon.value) //returns user input
    form.reset()
  })
    
    const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/'

    let newObj
 
    function loadPage(name) {
      fetch(pokeAPI + name)
      .then((res)=> res.json())
      .then((data)=> {
        console.log(data)
      cardConstruct(data)
      newObj = makeObj(data)
      console.log(newObj)
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
    `<div className ='pokemon' id='${data.id}'>
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
      card.name = data.name
      card.id = data.id
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
      imgCon.addEventListener("dblclick", (e)=>{
        e.target.requestFullscreen()
      })
    }

    function clearCard(){
      pokecard.innerHTML = ''
    }

    function addToPokedex(e){
      let addName = e.target.parentNode.parentNode.name
      const miniContainer = document.createElement('div')
      pokedex.appendChild(miniContainer)
      const dexEntry = document.createElement('p')
      dexEntry.innerText = addName
      dexEntry.name = 'caught-' + addName
      dexEntry.id = e.target.parentNode.parentNode.id
      miniContainer.appendChild(dexEntry)
      miniContainer.className = "unliked"
      dexEntry.addEventListener('click', choosePokemon)
      pokedex.className = ''
      const deleteBTN = document.createElement('button')
      deleteBTN.innerText = 'x'
      deleteBTN.className = 'delete'
      miniContainer.appendChild(deleteBTN)
      deleteBTN.addEventListener('click', removeFromDex)
      submitData(newObj)
    }
    
    function choosePokemon(e){
      if(e.target.innerText[0] === '♥'){
        const makeArr = e.target.innerText.split(' ');
        e.target.innerText = makeArr[1]
        e.target.style.color = 'white'
        e.target.parentNode.className = "unliked"
        
      }else{
        const heartName = '♥ ' + e.target.innerText
        e.target.innerHTML = heartName
        e.target.style.color = 'red'
        e.target.parentNode.className = "liked"
      }
    }
    
    function removeFromDex(e){

      e.target.parentNode.remove()
      runCheck()
      removeData(e.target.parentNode.firstChild.id)

    }

    document.querySelector("#open-dex").addEventListener("click",(e)=>{
      if(pokedex.className === "hidden") {
        pokedex.className = ""
      }else {
        pokedex.className = "hidden"
      }
    })

    function runCheck(){

        if(pokedex.innerHTML.length <= 5){
          pokedex.className = "hidden"
        }
        
      }

      function firstConstruct(obj) {
        let addName = obj.Name
        const miniContainer = document.createElement('div')
        pokedex.appendChild(miniContainer)
        const dexEntry = document.createElement('p')
        dexEntry.innerText = addName
        dexEntry.name = 'caught-' + addName
        dexEntry.id = obj.id
        miniContainer.appendChild(dexEntry)
        miniContainer.className = "unliked"
        dexEntry.addEventListener('click', choosePokemon)
        pokedex.className = ''
        const deleteBTN = document.createElement('button')
        deleteBTN.innerText = 'x'
        deleteBTN.className = 'delete'
        miniContainer.appendChild(deleteBTN)
        deleteBTN.addEventListener('click', removeFromDex)
      }

      function makeObj(data){
        return {
          "Img": [data.sprites.other['official-artwork'].front_default, data.sprites.front_default, data.sprites.other.dream_world.front_default, data.sprites.other.home.front_default],
          "Name": data.name, 
          "Abilities": [
            data.abilities[0].ability.name,
            data.abilities[1].ability.name
          ],
          "Height": data.height,
          "Weight": data.weight,
          "stats": data.stats,
          "id": data.id,
     
      }
    }

    function submitData(obj) {
      return fetch("http://localhost:3000/pokemon",{
          method: "POST",
          headers: {
              "Content-type": "application/json",
              Accept: "application/json",
          },
          body: JSON.stringify(obj)
      })
    }

    function removeData(obj) {
      return fetch("http:localhost:3000/pokemon/" + obj,{
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
      }
      })
    }

  const pokecard = document.querySelector("#pokecard")
  const pokedex = document.querySelector('#pokedex')
  

  });
