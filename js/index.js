console.log("YO")
document.addEventListener("DOMContentLoaded", function() {
    console.log("is the DOM loaded");
    console.log('DOMDOMDOMDOM LOADLOADLOAD')
    newMonsterForm()
    realPageTurner()
  });

const UrlBase = "http://localhost:3000/monsters"
function pageFetch(pagenumber){
    fetch(UrlBase + `/?_limit=50-&_page=${pagenumber}`).then(res => res.json()).then(monsters => monsters.forEach(monster => displayMonster(monster)))
}

function realPageTurner(){
    let pgNum = 1
    pageFetch(pgNum)
    const rightBtn = document.querySelector('#forward')
    const leftBtn = document.querySelector('#back')
    rightBtn.addEventListener('click', () => {
        pgNum ++
        console.log("FORWARD!", pgNum)
        
        pageFetch(pgNum)
    })
    leftBtn.addEventListener('click', () => {
        pgNum --
        console.log('BACK!', pgNum)
        if(pgNum <=0){ pgNum = 1; console.log('Cannnot go BACK any farther!', pgNum)}
        pageFetch(pgNum)
    })
}

function displayMonster(monster){
    const container = document.querySelector('#monster-container')
    const div = document.createElement('div')

    const h2 = document.createElement('h2')
    h2.innerText = monster.name 

    const h4 = document.createElement('h4')
    h4.innerText = `Age: ${monster.age}`

    const p = document.createElement('p')
    p.innerText = `Bio: ${monster.description}`

    div.append(h2, h4, p)
    container.append(div)
}

function newMonsterForm(){
    const creeMon = document.querySelector('#monster-container')
    const form = document.createElement('form')
    form.id = 'monster-form'

    const nameInput = document.createElement('input')
    nameInput.id = "name"
    nameInput.placeholder = "name..."
    const ageInput = document.createElement('input')
    ageInput.id = "age"
    ageInput.placeholder = "age..."
    const descInput = document.createElement('input')
    descInput.id = "description"
    descInput.placeholder = "description..."

    const button = document.createElement('button')
    button.innerText = "Create"

    form.append(nameInput, ageInput, descInput, button)
    creeMon.append(form)

    // making use of the above form
    form.addEventListener('submit', e => {
        e.preventDefault()
        // console.log(e.target[0].value, e.target[1].value, e.target[2].value)
        let newName = e.target[0].value
        let newAge = e.target[1].value
        let newDescription = e.target[2].value
        console.log(newName, newAge, newDescription)

        fetch(UrlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                name: newName,
                age: newAge,
                description: newDescription
            })
        })
        .then(res => res.json()).then(monster => displayMonster(monster))
    })
}