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
let _favdatabase = []
let tskInp = document.getElementById('tsk')
let tskBtn = document.getElementById('addtsk')
let tsklist = document.querySelector('#tsklist>ul')
let myfavStorage = JSON.parse(localStorage.getItem('favTask'))
let _deletedTasks = []
let deletedStorage = JSON.parse(localStorage.getItem('deletedTasks'))
let Ctask = []
let CtaskStorage = JSON.parse(localStorage.getItem('completedTasks'))

if (CtaskStorage) {
    Ctask = [...CtaskStorage]
}
if (deletedStorage) {
    _deletedTasks = [...deletedStorage]
}
if (myfavStorage) {
    _favdatabase = [...myfavStorage]
}
_favdatabase.map((val) => {
    addtsk(val)
})


function addtsk(tsk) {
    let task = document.createElement('li')
    task.classList.add('task')
    task.innerHTML =
        ` <h5>${tsk}</h5>
            <input id="editInp" type="text">
            <button class"ebtn">Edit</button>
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
    task.querySelector('input').style.width = '100%'
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
        item.style.color = '#fdf5bf'
    })
    task.querySelectorAll('div > span').forEach(item => {
        item.style.cursor = 'pointer'
    })

    // ------------------delete--------------------
    let delBtn = task.querySelector('.delBtn')
    let dellist = document.querySelector('#bin>aside>div>ul')

    if (_deletedTasks.includes(tsk)) {

        dellist.appendChild(task)
        delBtn.innerText = 'undo'
        delBtn.classList.remove('delBtn')
        delBtn.classList.add('restoreBtn')
        delBtn.previousElementSibling.previousElementSibling.style.display = 'none'
        delBtn.previousElementSibling.style.display = 'none'
    } else {
        tsklist.appendChild(task)
    }

    delBtn.addEventListener('click', () => {
        if (delBtn.classList.contains('delBtn')) {
            dellist.appendChild(task)
            delBtn.innerText = 'undo'
            delBtn.classList.remove('delBtn')
            delBtn.classList.add('restoreBtn')
            delBtn.previousElementSibling.previousElementSibling.style.display = 'none'
            delBtn.previousElementSibling.style.display = 'none'
            _deletedTasks.push(task.querySelector('h5').innerText)
            localStorage.setItem('deletedTasks', JSON.stringify(_deletedTasks))
        } else {
            tsklist.appendChild(task)
            delBtn.innerText = 'delete'
            delBtn.classList.remove('restoreBtn')
            delBtn.classList.add('delBtn')
            delBtn.previousElementSibling.previousElementSibling.style.display = 'flex'
            delBtn.previousElementSibling.style.display = 'flex'
            let restoredText = task.querySelector('h5').innerText
            _deletedTasks = _deletedTasks.filter(item => item !== restoredText)
            localStorage.setItem('deletedTasks', JSON.stringify(_deletedTasks))
        }
    })
    // ------------------edit-----------------------
    let editBtn = task.querySelector('.editBtn')
    let h5 = task.querySelector('h5')
    let input = task.querySelector('input')
    let innerBtn = task.querySelector('button')

    input.value = h5.innerText
    editBtn.addEventListener('click', () => {
        input.style.visibility = 'visible'
        innerBtn.style.visibility = 'visible'
        innerBtn.onclick = () => {
            h5.innerText = input.value
            input.style.visibility = 'hidden'
            innerBtn.style.visibility = 'hidden'
            // Update localStorage
            let index = _favdatabase.indexOf(tsk)
            if (index !== -1) {
                _favdatabase[index] = input.value
                localStorage.setItem('favTask', JSON.stringify(_favdatabase))
            }

        }
    })

    // ------------------check----------------------
    let c = task.querySelector('.checkmark')

    if (Ctask.includes(tsk)) {
        c.innerHTML = `<span class="material-symbols-outlined">check_circle</span>`
        c.style.color = 'rgb(4, 177, 85)'
        h5.innerHTML = `<del>${h5.innerText}</del>`
        c.dataset.state = 'on'
    }

    c.addEventListener('click', () => {
        if (c.dataset.state === 'off') {
            if (!Ctask.includes(task.querySelector('h5').innerText)) {
                Ctask.push(task.querySelector('h5').innerText)
            }
            localStorage.setItem('completedTasks', JSON.stringify(Ctask))
            c.innerHTML = `<span class="material-symbols-outlined">check_circle</span>`
            c.style.color = 'rgb(4, 177, 85)'
            h5.innerHTML = `<del>${h5.innerText}</del>`
            c.dataset.state = 'on'
        } else {
            c.innerHTML = `<span class="material-symbols-outlined">circle</span>`
            c.style.color = 'rgb(253, 245, 191)'
            h5.innerHTML = h5.innerText
            c.dataset.state = 'off'
            Ctask = Ctask.filter(item => item !== task.querySelector('h5').innerText)
            localStorage.setItem('completedTasks', JSON.stringify(Ctask))
        }
        // ------------popup after 3 checks---------------
        let task3 = document.querySelectorAll('#tsklist>ul>li')
        let checknum = 0

        task3.forEach((item) => {
            let ch = item.querySelector('.checkmark')
            if (ch.dataset.state === 'on') {
                checknum++
            }
        })

        let pop = document.getElementById('popup')
        if (checknum === 3) {
            setTimeout(() => {
                pop.classList.remove('hidden')
                pop.classList.add('flex')
            }, 1000)
        } else {
            pop.classList.add('hidden')
            pop.classList.remove('flex')
        }
        let popcls = document.getElementById('popClose')
        popcls.addEventListener('click', () => {
            pop.style.display = 'none'
        })
    })

}

tskBtn.addEventListener('click', () => {
    let tsk = tskInp.value
    if (tsk === "") {
        alert('please enter a task!')
    } else {
        addtsk(tsk)
        _favdatabase.push(tsk)
        localStorage.setItem('favTask', JSON.stringify(_favdatabase))
        tskInp.value = ""
        tskInp.focus()
    }
})

// ------------------search--------------------
tskSearch.addEventListener('keyup', (e) => {
    let searchVal = e.target.value
    let tempH5 = document.querySelectorAll('.task>h5')
    tempH5.forEach((val) => {
        if (val.innerText.indexOf(searchVal) >= 0) {
            val.parentElement.style.display = 'flex'

        } else if (val.innerText === '') {
            val.parentElement.style.display = 'none'
        }
        else {
            val.parentElement.style.display = 'none'

        }
    })

})