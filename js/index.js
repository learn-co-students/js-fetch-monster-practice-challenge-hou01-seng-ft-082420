let page = 1

document.addEventListener("DOMContentLoaded", function(e){
getMonsters(page)
createMonsterForm()
nextPage()
})

function createMonster(monster){
    const container = document.querySelector('#monster-container')
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.innerHTML = monster.name
    const h4 = document.createElement('h4')
    h4.innerHTML= monster.age
    const p = document.createElement('p')
    p.innerHTML = monster.description
    div.append(h2,h4,p)
    container.append(div)
}

function getMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(response){
        return response.json()
    })
    .then(function(obj){
        for (const monster of obj){
            createMonster(monster)
        }
    })
}

function createMonsterForm(){
    spot = document.querySelector('#create-monster')
    form = document.createElement('form')

    const name = document.createElement('input')
    name.type = "text"
    name.placeholder = "Name"
    name.id = "monster-name"
    const age = document.createElement('input')
    age.type = "text"
    age.placeholder = "how old you is?"
    age.id = "monster-age"
    const descrip = document.createElement('input')
    descrip.type = "text"
    descrip.placeholder = "What this dude do?"
    descrip.id = "monster-descrip"
    const submitBtn = document.createElement('button')
    submitBtn.innerHTML = 'Create dat boiiii'

    spot.append(form)
    form.append(name, age, descrip, submitBtn)

    form.addEventListener('submit', function(e){
        e.preventDefault()
        console.log('clicked')
        const name = document.querySelector('#monster-name').value
        const age = document.querySelector('#monster-age').value
        const descrip = document.querySelector('#monster-descrip').value
        const newMonster = {
            name: name,
            age: age,
            description: descrip,
        }
        createMonster(newMonster)

        return fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body: JSON.stringify({
            name: name,
            age: age,
            description: descrip
            })
        })

    })


}

function nextPage(){
    nextBtn = document.querySelector('#forward')
    nextBtn.addEventListener('click', function(e){
    page ++
    refresh = document.querySelector('#monster-container')
    refresh.innerHTML = null
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(function(response){
        return response.json()
    })
    .then(function(obj){
        for (const monster of obj){
            createMonster(monster)
        }
    })
})
}