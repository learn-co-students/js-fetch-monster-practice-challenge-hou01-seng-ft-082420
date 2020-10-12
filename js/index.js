const URL_PREFIX='http://localhost:3000/'

let page = 1

const fetchMonsters = (a) =>{
    fetch(URL_PREFIX + `monsters/?_limit=50&_page=${a}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => createMonsterCard(monster)) )
}

function createMonsterCard(monster) {

    const monContainer = document.getElementById('monster-container')

    const div = document.createElement("div")
    div.setAttribute("monsterId", monster.id)

    const h2 = document.createElement('h2')
    h2.classList.add("monster-name")
    h2.innerText = monster.name

    const h4 = document.createElement('h4')
    h4.classList.add("monster-age")
    h4.innerText = monster.age

    const p = document.createElement('p')
    p.classList.add("monster-description")
    p.innerText = monster.description
    
    div.append(h2, h4, p)
    monContainer.append(div)
}

function createMonsterForm() {
    // create fetch() helpers
    const monstersURL = URL_PREFIX + 'monsters'
    
    const createMon = document.getElementById('create-monster')
    
    //build Create Monster form
    const monFormCont = document.createElement('div')
    monFormCont.id = 'monster-form-container'
    
    const form = document.createElement('form')
    form.id = 'create-monster-form'
    
    const nameField = document.createElement('input')
    nameField.id = 'monster-name'
    nameField.type = "text"
    nameField.name = "name"
    nameField.placeholder = 'Name'
    
    const ageField = document.createElement('input')
    ageField.id = 'monster-age'
    ageField.type = "text"
    ageField.name = "age"
    ageField.placeholder = 'Age'
    
    const descField = document.createElement('input')
    descField.id = 'monster-description'
    descField.type = "text"
    descField.name = 'description'
    descField.placeholder = 'Description'
    
    const subBtn = document.createElement('input')
    subBtn.type = "submit"
    subBtn.value = "Create Monster"
    
    form.append(nameField, ageField, descField, subBtn)
    monFormCont.append(form)
    createMon.append(monFormCont)
    
    form.addEventListener("submit", function(e){
        e.preventDefault()
        console.log(`Form Submitted! Timestamp: ${e.timeStamp}`)
        // console.log(e.target.description.value)
        let monName = e.target.name.value
        let monAge = e.target.age.value
        let monDesc = e.target.description.value
        const newMon = {
            name: monName,
            age: monAge,
            description: monDesc
        }
        const configMon = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newMon)
        }
        fetch(monstersURL, configMon)
        .then(res => res.json())
        .then(monster => createMonsterCard(monster))
    })
}

function changePage(){
    const backBtn = document.getElementById('back')
    const fwrdBtn = document.getElementById('forward')
    const monContainer = document.getElementById('monster-container')

    backBtn.addEventListener("click", function(e){
        page--
        if (page < 1) {
            alert("There ain't not monsters here!")
            page = 1
        }
        monContainer.innerHTML = ""
        fetchMonsters(page)
        console.log("We moving backward!")
    })

    fwrdBtn.addEventListener("click", function(e){
        page++
        monContainer.innerHTML = ""
        fetchMonsters(page)
        console.log("We moving forward!")
    })
}

document.addEventListener("DOMContentLoaded", function(e){
    console.log("Hello Aleks")
    fetchMonsters()
    createMonsterForm()
    changePage()
});

