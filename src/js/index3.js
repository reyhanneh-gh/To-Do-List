// ---------------toggle menu-----------------
let n = document.getElementById('navBtn')
let _close = document.getElementById('closeBtn')
let _nav = document.getElementById('nav')
n.addEventListener('click', () => {
    _nav.style.left = '0px'
    _nav.style.transition = '1s'
})
_close.addEventListener('click', () => {
    _nav.style.left = '-400px'
    _close.style.transform = 'rotate(180deg)'
    _close.style.transition = '1s'
    _nav.style.transition = '1s'
})
// -------------------trash--------------------
let t = document.querySelectorAll('.trash')
let _binclose = document.getElementById('bincls')
let _bin = document.getElementById('bin')
_bin.style.display = 'none'
t.forEach(item => {
    item.addEventListener('click', () => {
        _bin.style.display = 'flex'
    })
})
_binclose.addEventListener('click', () => {
    _bin.style.display = 'none'
    _binclose.style.transform = 'rotate(180deg)'
    _binclose.style.transition = '1s'
    _binclose.style.cursor = 'pointer'
})

// ------------------to do--------------------
let tsklist = document.querySelectorAll('.tsklist>ul')
let add1 = document.querySelectorAll('.add1')
let _weekDatabase = []
let weekDeletedTasks = []
let weekCompletedTasks = []
let weekStorage = JSON.parse(localStorage.getItem('weekTask'))
let weekDeletedStorage = JSON.parse(localStorage.getItem('weekDeletedTasks'))
let weekCompletedStorage = JSON.parse(localStorage.getItem('weekCompletedTasks'))

if (weekStorage) {
    _weekDatabase = [...weekStorage]
}
if (weekDeletedStorage) {
    weekDeletedTasks = [...weekDeletedStorage]
}
if (weekCompletedStorage) {
    weekCompletedTasks = [...weekCompletedStorage]
}

_weekDatabase.map((obj) => {
    addtsk(obj.text, tsklist[obj.day], obj.day)
})

add1.forEach((clck, index) => {
    clck.addEventListener('click', () => {
        const tskInp = document.createElement('input')
        const tskBtn = document.createElement('button')

        tskInp.style.display = 'flex'
        tskBtn.style.display = 'flex'
        clck.style.display = 'none'

        const val = tsklist[index]

        tskInp.placeholder = 'Enter a Task...'
        tskInp.style.width = '80%'
        tskBtn.innerText = 'Done'
        tskBtn.style.marginLeft = '20px'
        tskBtn.style.width = 'fit-content'
        tskBtn.style.backgroundColor = '#8ab8a8'
        tskBtn.style.cursor = 'pointer'

        val.appendChild(tskInp)
        val.appendChild(tskBtn)

        tskBtn.addEventListener('click', () => {
            let tsk = tskInp.value
            if (tsk === "") {
                alert('please enter a task!')
            } else {
                addtsk(tsk, val, index)
                _weekDatabase.push({ text: tsk, day: index })
                localStorage.setItem('weekTask', JSON.stringify(_weekDatabase))
                tskInp.value = ""
                tskInp.focus()
                tskInp.style.display = 'none'
                tskBtn.style.display = 'none'
                clck.style.display = 'flex'
            }
        })
    })
})

function addtsk(tsk, val, index) {
    let task = document.createElement('li');
    task.classList.add('task')
    task.style.width = '80%'
    task.innerHTML = `
            <h5>${tsk}</h5>
            <input id="editInp" type="text">
            <button class="ebtn">Edit</button>
            <div>
                <span data-state='off' class="material-symbols-outlined checkmark">circle</span>
                <span class="material-symbols-outlined editBtn">edit_document</span>
                <span class="material-symbols-outlined delBtn">delete</span> 
            </div>
        `

    task.style.display = 'flex'
    task.style.alignItems = 'center'
    task.style.justifyContent = 'space-between'
    task.style.position = 'relative'
    task.querySelector('div').style.display = 'flex'
    task.querySelector('div').style.alignItems = 'center'
    task.querySelector('div').style.gap = '10px'
    task.querySelector('input').style.visibility = 'hidden'
    task.querySelector('input').style.width = '80%'
    task.querySelector('input').style.height = '100%'
    task.querySelector('input').style.borderRadius = '10px'
    task.querySelector('input').style.backgroundColor = '#fdf5bf'
    task.querySelector('input').style.position = 'absolute'
    task.querySelector('input').style.left = '0px'
    task.querySelector('input').style.display = 'flex'
    task.querySelector('input').style.alignItems = 'center'
    task.querySelector('input').style.padding = '10px'
    task.querySelector('button').style.position = 'absolute'
    task.querySelector('button').style.top = '50%'
    task.querySelector('button').style.right = '30px'
    task.querySelector('button').style.transform = 'translateY(-50%)'
    task.querySelector('button').style.backgroundColor = '#8ab8a8'
    task.querySelector('button').style.width = 'fit-content'
    task.querySelector('button').style.height = 'fit-content'
    task.querySelector('button').style.display = 'flex'
    task.querySelector('button').style.placeContent = 'center'
    task.querySelector('button').style.paddingInline = '10px'
    task.querySelector('button').style.borderRadius = '10px'
    task.querySelector('button').style.color = 'white'
    task.querySelector('button').style.cursor = 'pointer'
    task.querySelector('button').style.visibility = 'hidden'
    task.querySelectorAll('div > span').forEach(item => {
        item.style.color = '#8ab8a8'
    })
    task.querySelectorAll('div > span').forEach(item => {
        item.style.cursor = 'pointer'
    })

    val.appendChild(task)

    // ------------------delete--------------------
    let delBtn = task.querySelector('.delBtn')
    let dellist = document.querySelector('#bin>aside>div>ul')

    if (weekDeletedTasks.includes(tsk)) {
        dellist.appendChild(task)
        delBtn.innerText = 'undo'
        delBtn.classList.remove('delBtn')
        delBtn.classList.add('restoreBtn')
        delBtn.previousElementSibling.previousElementSibling.style.display = 'none'
        delBtn.previousElementSibling.style.display = 'none'
    }

    delBtn.addEventListener('click', () => {
        if (delBtn.classList.contains('delBtn')) {
            dellist.appendChild(task)
            delBtn.innerText = 'undo'
            delBtn.classList.remove('delBtn')
            delBtn.classList.add('restoreBtn')
            delBtn.previousElementSibling.previousElementSibling.style.display = 'none'
            delBtn.previousElementSibling.style.display = 'none'
            weekDeletedTasks.push(tsk)
            localStorage.setItem('weekDeletedTasks', JSON.stringify(weekDeletedTasks))
        } else {
            val.appendChild(task)
            delBtn.innerText = 'delete'
            delBtn.classList.remove('restoreBtn')
            delBtn.classList.add('delBtn')
            delBtn.previousElementSibling.previousElementSibling.style.display = 'flex'
            delBtn.previousElementSibling.style.display = 'flex'
            weekDeletedTasks = weekDeletedTasks.filter(item => item !== tsk)
            localStorage.setItem('weekDeletedTasks', JSON.stringify(weekDeletedTasks))
        }
    })

    // ------------------edit-----------------------
    let editBtn = task.querySelector('.editBtn')
    let h5 = task.querySelector('h5')
    task.querySelector('input').value = tsk
    let innerBtn = task.querySelector('button')

    editBtn.addEventListener('click', () => {
        task.querySelector('input').style.visibility = 'visible'
        task.querySelector('button').style.visibility = 'visible'
        innerBtn.addEventListener('click', () => {
            h5.innerText = task.querySelector('input').value
            task.querySelector('input').style.visibility = 'hidden'
            task.querySelector('button').style.visibility = 'hidden'
            let taskIndex = _weekDatabase.findIndex(obj => obj.text === tsk && obj.day === index)
            if (taskIndex !== -1) {
                _weekDatabase[taskIndex].text = h5.innerText
                localStorage.setItem('weekTask', JSON.stringify(_weekDatabase))
            }
        })
    })

    // ------------------check----------------------
    let c = task.querySelector('.checkmark')
    if (weekCompletedTasks.includes(tsk)) {
        c.innerHTML = `<span class="material-symbols-outlined">check_circle</span>`
        c.style.color = 'rgb(4, 177, 85)'
        h5.innerHTML = `<del>${h5.innerText}</del>`
        c.dataset.state = 'on'
    }

    c.addEventListener('click', () => {
        if (c.dataset.state === 'off') {
            if (!weekCompletedTasks.includes(tsk)) {
                weekCompletedTasks.push(tsk)
            }
            localStorage.setItem('weekCompletedTasks', JSON.stringify(weekCompletedTasks))
            c.innerHTML = `<span class="material-symbols-outlined">check_circle</span>`
            c.style.color = 'rgb(4, 177, 85)'
            h5.innerHTML = `<del>${h5.innerText}</del>`
            c.dataset.state = 'on'
        } else {
            c.innerHTML = `<span class="material-symbols-outlined">circle</span>`
            c.style.color = 'rgb(253, 245, 191)'
            h5.innerHTML = h5.innerText
            c.dataset.state = 'off'
            weekCompletedTasks = weekCompletedTasks.filter(item => item !== tsk)
            localStorage.setItem('weekCompletedTasks', JSON.stringify(weekCompletedTasks))
        }
    })
}