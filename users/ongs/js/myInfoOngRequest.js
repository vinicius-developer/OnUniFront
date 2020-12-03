async function meInfoOngRequest() {
    const urlMe = 'http://127.0.0.1:8000/api/ong/auth/me'
    //const url =  `https://onuniapi.herokuapp.com/api/ong/auth/me`

    const headers = defineHeaders();

    axios.get(urlMe, { headers })
        .then(response => {
            createDisplayOng(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function telephoneMeInfoRequest() {
    const urlTelephone = 'http://127.0.0.1:8000/api/info/objects/telephone/me/list'
    //const urlTelephone =  `https://onuniapi.herokuapp.com/api/info/objects/telephone/me/list`

    const headers = defineHeaders();

    axios.get(urlTelephone, { headers })
        .then(response => {
            createDiplayTel(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function endMeInfoRequest() {
    const urlEnd = 'http://127.0.0.1:8000/api/info/objects/address/me/list'
    //const urlTelephone =  `https://onuniapi.herokuapp.com/api/info/objects/address/me/list`

    const headers = defineHeaders()

    axios.get(urlEnd, { headers })
        .then(response => {
            createDisplayEnd(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function listMeContentRequest(page = 1) {
    const urlList = `http://127.0.0.1:8000/api/ong/wishlist/index`
    //const urlList = `https://onuniapi.herokuapp.com/api/ong/wishlist/index`

    const headers = defineHeaders()


    await axios.get(`${urlList}?page=${page}`, { headers })
        .then(response => {
            createDisplayList(response.data.data)
            buttonNext = document.getElementById('next')
            buttonLast = document.getElementById('last')

            if (page >= 1 && page <= response.data.last_page) {
                buttonNext.value = parseInt(page) + 1
                buttonLast.value = parseInt(page) - 1
            }

            if (page < response.data.last_page) {
                buttonNext.style.display = 'block'
            } else {
                buttonNext.style.display = 'none'
            }

            if (page > 1) {
                buttonLast.style.display = 'block'
            } else {
                buttonLast.style.display = 'none'
            }
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function changePhotoPerfil(image) {
    const urlChangeImage = 'http://127.0.0.1:8000/api/ong/change/image'
    //const urlChangeImage = 'https://onuniapi.herokuapp.com/api/ong/change/image'

    const headers = defineHeaders()

    headers['Content-Type'] = 'multipart/form-data'

    const formdata = new FormData()

    formdata.append('photo', image)

    axios.post(urlChangeImage, formdata, { headers })
        .then(response => {
            document.getElementById('changePhotoModal').classList.add('anulation')
        })
        .catch(error => {
            console.log(error.response)
            if (error.response.status === 422) {
                createMessageErrorPhoto(error.response.data.errors.photo)
            } else if (error.response.status === 500) {
                alert('estamos com problemas em nosso sistema')
            } else {
                errorRedirect(error.response.status)
            }

        })
}

function createDisplayOng(data) {
    const ong = data[0]

    document.getElementsByClassName('box-potho-ong')[0].style.backgroundImage = `url('http://127.0.0.1:8000/storage/${ong.img}')`
    //document.getElementsByClassName('box-potho-ong')[0].style.backgroundImage = `url('https://onuniapi.herokuapp.com/storage/${ong.img}')`

    const boxTextTitle = document.querySelector('.box-title')
    const boxTitleElement = document.createElement('h1')
    const textTitlePricipal = document.createTextNode(ong.nomeFantasia)

    boxTitleElement.appendChild(textTitlePricipal)

    boxTextTitle.appendChild(boxTitleElement)

    const changeNameOngButton = document.createElement('button')
    changeNameOngButton.classList = ('d-none')
    changeNameOngButton.setAttribute('onclick', `actionOpenLate('#changeTitleModal')`)

    boxTextTitle.appendChild(changeNameOngButton);

    const textDescricao = document.createTextNode(ong.descricao)
    document.getElementsByClassName('box-descricao')[0].childNodes[3].appendChild(textDescricao)

    const textEmail = document.createTextNode("E-mail: " + ong.email)
    const textCausaSocial = document.createTextNode("Causa Social: " + ong.nomeCausaSocial)
    const boxInfoElement = document.getElementsByClassName('box-info')

    boxInfoElement[0].childNodes[3].appendChild(textEmail)
    boxInfoElement[0].childNodes[5].appendChild(textCausaSocial)
}

function createDiplayTel(data) {
    data.map((item) => {
        const boxTelElement = document.getElementsByClassName('box-tel')[0]

        const telElement = document.createElement('p')
        const telText = document.createTextNode(item['numTel'])

        telElement.appendChild(telText)
        telElement.classList = 'text-white text-center font-weight-bold'

        boxTelElement.insertBefore(telElement, boxTelElement.childNodes[1].nextSibling)
    })
}

function createDisplayEnd(data) {
    const end = data[0]
    const keys = Object.keys(end)
    const values = Object.values(end)

    const boxEndElement = document.getElementsByClassName('box-end')[0]

    for (let i = 0; i < keys.length; i++) {
        if (values[i]) {
            const endElement = document.createElement('p')
            const endText = document.createTextNode(`${keys[i]}: ${values[i]}`)

            endElement.appendChild(endText)
            endElement.classList = 'font-weight-bold'
            boxEndElement.appendChild(endElement)
        }
    }
}

function createDisplayList(item) {
    if (item.length > 0) {
        item.map((item) => {
            const boxItemsElement = document.getElementById('box-items')

            const listElement = document.createElement('ul')

            const itemElement = document.createElement('li')

            const nameItemsElement = document.createElement('h4')
            const nameItemsText = document.createTextNode(`${item['nomeItem']}`)

            nameItemsElement.appendChild(nameItemsText)

            const linkLojaElement = document.createElement('a')
            const textLink = document.createTextNode(`Loja: ${item['nomeFantasiaLoja']}`)

            linkLojaElement.setAttribute('href', item['linkLoja'])
            linkLojaElement.setAttribute('target', '_blank')
            linkLojaElement.appendChild(textLink)
            linkLojaElement.classList = 'font-weight-bold'


            itemElement.appendChild(nameItemsElement)
            itemElement.appendChild(linkLojaElement)


            listElement.appendChild(itemElement)
            boxItemsElement.appendChild(listElement)
        })
    } else {
        document.getElementById('list').style.display = 'none'
    }
}

function createMessageErrorPhoto(message) {
    const boxError = document.getElementById('messageErrorModalPhoto')

    const errorElement = document.createElement('p')
    const textElement = document.createTextNode(message[0])

    errorElement.appendChild(textElement)

    boxError.appendChild(errorElement)
}

function clear(items) {
    while (items.firstChild) {
        items.removeChild(items.lastChild)
    }
}

document.getElementById('next').addEventListener('click', () => {
    const items = document.getElementById('box-items')
    clear(items)
    listMeContentRequest(document.getElementById('next').value)
})

document.getElementById('last').addEventListener('click', () => {
    const items = document.getElementById('box-items')
    clear(items)
    listMeContentRequest(document.getElementById('last').value)
})

document.getElementById('sendPhoto').addEventListener('click', () => {
    const image = document.getElementById('photoModal').files[0]
    changePhotoPerfil(image)
})



actionClose('#closePhotoModal', 'click', '#changePhotoModal')

actionOpen('#changeImageModal', 'click', '#changePhotoModal')

actionClose('.box-one .box-potho-ong', 'mouseout', '.box-one .box-potho-ong button')

actionOpen('.box-one .box-potho-ong', 'mouseover', '.box-one .box-potho-ong button')

actionClose('.box-one .box-title', 'mouseout', '.box-one .box-title button')

actionOpen('.box-one .box-title', 'mouseover', '.box-one .box-title button')

actionClose('#closeTitleModal', 'click', '#changeTitleModal')

function actionOpenLate(id) {
    open(id)
}

function actionClose(selector, action, obj) {
    document.querySelector(selector).addEventListener(action, () => {
        close(obj)
    })
}

function actionOpen(selector, action, obj) {
    document.querySelector(selector).addEventListener(action, () => {
        open(obj)
    })
}

function close(id) {
    const modal = document.querySelector(id)
    modal.classList.add('d-none')
}

function open(id) {
    const modal = document.querySelector(id)
    modal.classList.remove('d-none')
}




meInfoOngRequest()
telephoneMeInfoRequest()
endMeInfoRequest()
listMeContentRequest()

function errorRedirect(status) {
    if (status === 401 || status === 500) {
        window.location.assign('../../autenticacao/login/login.html')
    } else if (status === 400) {
        window.location.assign('listOngs.html')
    }
}

function defineHeaders() {
    return { 'Authorization': `Bearer ${localStorage.token}` }
}