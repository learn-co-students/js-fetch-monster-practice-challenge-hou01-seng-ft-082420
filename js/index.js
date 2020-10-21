document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
    .then(response => response.json())
    .then(monster => monster.forEach(monster => renderMonster(monster)))

    let monsterDiv = document.querySelector('#create-monster')
    let monsterForm = document.createElement('form')
   
    //form event listener
    monsterForm.addEventListener("submit", e => {
        e.preventDefault()

        let name = document.querySelector('#name').value
        console.log(name)
        let age = document.querySelector('#age').value
        let description = document.querySelector('#bio').value

        let postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name,
                age,
                description
            })
        }

        fetch("http://localhost:3000/monsters/?_limit=50&_page=2", postOptions)
        .then(response => response.json())
        // .then(response => console.log(response))
        .then(monster => renderMonster(monster))
    })

    //form elements
    let newName = document.createElement('input')
    newName.placeholder = "name"
    newName.id = "name"

    let newAge = document.createElement('input')
    newAge.placeholder = "age"
    newAge.id = "age"

    let newBio = document.createElement('input')
    newBio.placeholder = "description"
    newBio.id = "bio"

    let submitButton = document.createElement('button')
    submitButton.type = "submit"
    submitButton.innerText = "Create Monster"

    monsterForm.append(newName, newAge, newBio, submitButton)
    monsterDiv.append(monsterForm)

    //forwardButton
    forwardButton = document.querySelector('#forward')
    forwardButton.addEventListener('click', () => {
    fetch("http://localhost:3000/monsters/?_limit=50&_page=2")
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(monsters => {
        let monsterContainer = document.querySelector('#monster-container')
        monsterContainer.innerText = ""
        monsters.forEach(monster => renderMonster(monster))
        // console.log(monster)
    })
    
})
})

//create div elements
const renderMonster = monster => {

    // name: "Chronos", age: 4005.302453418598,
    // description: "Effulgence eldritch shunned foetid.",
    // id: 1}

    let monsterContainer = document.querySelector('#monster-container')
    let monsterCard = document.createElement('div')

    let name = document.createElement('h2')
    name.innerText = monster.name

    let age = document.createElement('h4')
    age.innerText = `Age: ${monster.age}`

    let bio = document.createElement('p')
    bio.innerText = `Bio: ${monster.description}`

    monsterCard.append(name, age, bio)
    monsterContainer.append(monsterCard)

}

