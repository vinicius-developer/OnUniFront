const url = 'http://127.0.0.1:8000/api/info/users/ong/list'
//const url = 'https://onuniapi.herokuapp.com/api/info/users/ong/list'
const headers = {
    'Authorization': `Bearer ${localStorage.token}`
}

async function listOngs(url, headers, page = '1') {
    await axios.get(url + "?page=" + page, { headers })
        .then(response => {
            console.log(response)
            clear()
            createDisplay(response.data)
            buttonNext = document.getElementById('next')
            if(response.data.next_page_url !== undefined) {
                buttonNext.value = response.data.next_page_url.split('=').slice(1, 2)
            } else {
                buttonNext.style.display = "none"
            }

            buttonLast = document.getElementById('last')
            buttonLast.value = buttonNext.value - 1
            console.log(buttonNext, buttonLast)

        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else {
                alert('Estamos com problemas técnicos em nosso sistema')
            }
        })
}

listOngs(url, headers)

function clear() {
    
    const list = document.getElementById('list')
    while(list.firstChild) {
        list.removeChild(list.lastChild)
    }
}

function createDisplay(response) {
    const data = response.data
    data.map((ong, ind) => {
        const list = document.getElementById('list')
        const createItem = document.createElement('article')
        createItem.classList = 'item-list  p-3 p-sm-3 p-lg-3 mb-5 mb-sm-5 mb-lg-5'
        list.appendChild(createItem)

        const item = document.getElementsByClassName('item-list')
        const createBoxPhotoOng = document.createElement('div')
        createBoxPhotoOng.classList = 'box-potho-ong'
        item[ind].appendChild(createBoxPhotoOng)

        const boxPhotoOng = document.getElementsByClassName('box-potho-ong')
        boxPhotoOng[ind].style.backgroundImage = `url('http://127.0.0.1:8000/storage/${ong.img}')`
        //boxPhotoOng[ind].style.backgroundImage = `url('https://onuniapi.herokuapp.com/storage/${ong.img}')`

        const createBoxContentOng = document.createElement('div')
        createBoxContentOng.classList = 'box-content-ong text-center text-sm-center text-md-right'
        item[ind].appendChild(createBoxContentOng)

        const boxContentOng = document.getElementsByClassName('box-content-ong')

        const subTitleElement = document.createElement('h2')
        const subTitleText = document.createTextNode(ong.nomeCausaSocial)
        subTitleElement.appendChild(subTitleText)

        boxContentOng[ind].appendChild(subTitleElement)

        const titleElement = document.createElement('h1')
        const titleText = document.createTextNode(ong.nomeFantasia)
        titleElement.appendChild(titleText)

        boxContentOng[ind].appendChild(titleElement)

        const textElement = document.createElement('p')
        const desc = cut(ong.descricao)
        const contentText = document.createTextNode(desc)
        textElement.appendChild(contentText)
        textElement.classList = 'pl-0 pl-sm-0 pl-lg-5 '

        boxContentOng[ind].appendChild(textElement)

        const boxButtonElment = document.createElement('div')
        const buttonElement = document.createElement('button')
        const valButton = document.createTextNode('Saber Mais')
        buttonElement.appendChild(valButton)
        buttonElement.classList = 'btn btn-outline-dark'
        buttonElement.setAttribute('id', 'info-ong')
        boxButtonElment.appendChild(buttonElement)
        boxButtonElment.classList = 'mb-5 mb-sm-5 mb-lg-5'

        boxContentOng[ind].appendChild(boxButtonElment)
    })
    function cut(string) {
        if (string[99] != undefined) {
            const newStr = string.substring(0, 120)
            return newStr + "..."
        } else {
            return string
        }
    }
}

document.getElementById('next').addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const page = document.getElementById('next').value
    listOngs(url, headers, page)
})

document.getElementById('last').addEventListener('click', () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    const page = document.getElementById('last').value
    listOngs(url, headers, page)
})








// http://127.0.0.1:8000/storage/pothoPerfilOng/fotoOngPadrao.png
// https://onuniapi.herokuapp.com/storage/pothoPerfilOng/fotoOngPadrao.png