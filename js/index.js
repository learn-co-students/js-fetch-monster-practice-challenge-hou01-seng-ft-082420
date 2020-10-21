const URLBase = "http://localhost:3000/monsters"
// "http://localhost:3000/monsters/?_limit=50&_page=1"
document.addEventListener('DOMContentLoaded', () => {
    console.log('HTML is loaded!')

    // let pageNum = 1
    // getMonsters()

    // function getMonsters(a) {
    //     const monsterContainer = document.querySelector("#monster-container")
    //     monsterContainer.innerHTML = ""
    //     fetch(`http://localhost:3000/monsters/?_limit=50&_page=${a}`).then(res => res.json()).then(monsters => monsters.forEach(monster => createMonsterCard(monster)));
    // }

    fetch("http://localhost:3000/monsters/?_limit=50&_page=1").then(res => res.json()).then(monsters => monsters.forEach(monster => createMonsterCard(monster)));
    
    
    function createMonsterCard(monster) {
        //grabbing container
        const monsterContainer = document.querySelector("#monster-container")
        const monsterCard = document.createElement('div')
        //name, age, description
        const h2 = document.createElement('h2')
        h2.innerText = monster.name

        const h4 = document.createElement('h4')
        h4.innerText = monster.age

        const p = document.createElement('p')
        p.innerText = monster.description

        //append section for card
        monsterCard.append(h2, h4, p)
        monsterContainer.append(monsterCard)
    }

    // function createMonster() {

        const createMonsterDiv = document.querySelector("#create-monster")
        //make monster form
            const monsterForm = document.createElement('form')
            // console.log(createMonsterDiv)
            const name = document.createElement('input')
            name.type = "text"
            name.placeholder = "Name"
            name.id = "name"

            const age = document.createElement('input')
            age.type = "text"
            age.placeholder = "Age"
            age.id = "age"

            const description = document.createElement('input')
            description.type = "text"
            description.placeholder = "Description"
            description.id = "description"

            const submit = document.createElement('button')
            submit.innerText = "Create Monster"
            //eventlistener for form
            //const monsterForm = document.createElement('form')
            monsterForm.addEventListener('submit', e => {
                e.preventDefault()

                let name = document.querySelector('#name').value
                let age = document.querySelector('#age')
                let description = document.querySelector('#description')

                let postOptions = {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        age: age,
                        description: description
                    })
                }
                fetch("http://localhost:3000/monsters/?_limit=50&_page=2", postOptions)
                .then(res => res.json())
                .then(monster => createMonsterCard(monster))
                e.target.reset()
            })

        //forward button
        const forwardBtn = document.querySelector('#forward')
        forwardBtn.addEventListener('click', e => {
            fetch("http://localhost:3000/monsters/?_limit=50&_page=2")
            .then(res => res.json())
            .then(monsters => {
                let monsterContainer = document.querySelector('#monster-container')
                monsterContainer.innerText = ""
                monsters.forEach(monster => createMonsterCard(monster))
            })
        })
            
            //append section for form
            monsterForm.append(name, age, description, submit)
            createMonsterDiv.append(monsterForm)
            
    // }




});//end of DOMContentLoaded