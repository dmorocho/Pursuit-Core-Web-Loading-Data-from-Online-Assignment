
document.addEventListener("DOMContentLoaded",()=>{

    let div1 = document.querySelector("#Pokemon1") 
    let div2 = document.querySelector("#Pokemon2")
    let pokemonArr = []

const addChara = async (div) => {

    
    div.innerHTML = ""
    let ul = document.createElement("ul")
    let img = document.createElement("img")


    let num = Math.floor(Math.random() * 807)

    try{
  
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
        let data = res.data  
        //NAME
        let name = data.name
        let h3Name = document.createElement("h3")
        h3Name.innerText = name
        h3Name.id = name
        div.appendChild(h3Name)
        pokemonArr.push(name)
        //IMAGE
        let src = data.sprites.front_default
        img.src=src
        div.appendChild(img)
        //HP
        let HP = data.stats[5]["base_stat"]
        let liHP = document.createElement("li")
        liHP.innerText = `HP: ${HP}`
        div.appendChild(liHP)

        //MOVE
        let moves = data.moves
        let liMove = document.createElement("li")
        liMove.innerText = "MOVES:"
        ul.appendChild(liMove)
        for(let i = 0; i <=4; i ++){

            let randNum = Math.floor(Math.random() * (moves.length-1))
            let moveName = moves[randNum].move.name

            let moveData = await axios.get(moves[randNum].move.url)
            let movePP = moveData.data.pp

            let li = document.createElement("li")
            li.innerText = `${moveName}:  ${movePP}`
            ul.appendChild(li)
            
        } 
        div.appendChild(ul)

        console.log("hi")
        
    } 
    catch(err) {
        console.log(err)

       
    }

}

//Get Pokemon and Display
let getbtn = document.querySelector("#GetPokemon")
getbtn.addEventListener("click",()=>{

addChara(div1)
addChara(div2)

})
const battleFunction = () =>{
let winner = pokemonArr.splice(Math.floor(Math.random()*2), 1).toString();
let loser = pokemonArr[0]
let h3 = document.querySelector("#results")
h3.innerText = `The winner is ... ${winner}`
let div = document.querySelector("#battle")
let li = document.createElement("li")
li.innerText = `${winner} beat ${loser}`

pokemonArr = []

}



let battlebtn = document.querySelector("#Battle")

battlebtn.addEventListener("click",(e)=>{


    battleFunction(div1,div2);

   
    
})



})