const key = window.location.href.split('=').slice(1, 2)

async function requestContentOng(key) {
    const urlOng = `http://127.0.0.1:8000/api/info/users/ong/find/${key}`
    //const urlOng =  `https://onuniapi.herokuapp.com/api/info/users/ong/find/${key}`

    const headers = defineHeaders()

    await axios.get(urlOng, { headers })
        .then(response => {
            createDisplayOng(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentTel(key) {
    const urlTel = `http://127.0.0.1:8000/api/info/objects/telephone/list/${key}`
    //const urlTel =  `https://onuniapi.herokuapp.com/api/info/objects/telephone/list/${key}`

    const headers = defineHeaders()

    await axios.get(urlTel, { headers })
        .then(response => {
            createDiplayTel(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentEnd(key) {
    const urlEnd = `http://127.0.0.1:8000/api/info/objects/address/list/${key}`
    //const urlEnd =  `https://onuniapi.herokuapp.com/api/info/objects/address/list/${key}`

    const headers = defineHeaders()

    await axios.get(urlEnd, { headers })
        .then(response => {
            createDisplayEnd(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentList(key, page = 1) {
    const urlList = `http://127.0.0.1:8000/api/info/objects/index/list/${key}` 
    //const urlList = `https://onuniapi.herokuapp.com/api/info/objects/index/list/${key}`

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

async function requestFollowExists(key) {
    const urlFollowExists = `http://127.0.0.1:8000/api/actions/follow/find/${key}`
    //const urlFollowExists = `https://onuniapi.herokuapp.com/api/actions/follow/find/${key}`

    const headers = defineHeaders()

    await axios.get(urlFollowExists, { headers })
        .then(response => {
            switchImageFollowButton(response.data.exists)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestRegisterFollow(key) {
    const urlRegisterFollow = `http://127.0.0.1:8000/api/actions/follow/switch/${key}`
    //const urlRegisterFollow = `https://onuniapi.herokuapp'.com/api/actions/follow/switch/${key}`

    const headers = defineHeaders()

    await axios.get(urlRegisterFollow, {headers}) 
        .then(response => {
            switchImageFollowButton(response.data.exists)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestRegisterReport(body) {
    const urlRegisterReport = `http://127.0.0.1:8000/api/actions/report/register`
    //const urlRegisterFollow = `https://onuniapi.herokuapp'.com/api/actions/follow/switch/${key}`

    const headers = defineHeaders()

    await axios.post(urlRegisterReport, body, {headers})
        .then(response => {
            console.log(response)
            const modal = document.getElementById('reportModal')
            modal.classList = 'anulation'
            const item = document.getElementById('openModal')
            changeReportButton(response.data.exists, item)
        })
        .catch(error => {
            errorRedirect(error.response.status)
            createDisplayErrorReport(error.response.data.errors)
        })
}

async function requestReportExists(key) {
    const urlReportExists =  `http://127.0.0.1:8000/api/actions/report/findong/${key}`
    
    const headers = defineHeaders()

    await axios.get(urlReportExists, {headers})
        .then(response => {
            const item = document.getElementById('openModal')
            changeReportButton(response.data.exists, item)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

function createDisplayOng(data) {
    const ong = data[0]

    document.getElementsByClassName('box-potho-ong')[0].style.backgroundImage = `url('http://127.0.0.1:8000/storage/${ong.img}')`
    //document.getElementsByClassName('box-potho-ong')[0].style.backgroundImage = `url('https://onuniapi.herokuapp.com/storage/${ong.img}')`

    const textTitlePricipal = document.createTextNode(ong.nomeFantasia)
    document.getElementsByClassName('box-title')[0].lastChild.previousSibling.appendChild(textTitlePricipal)

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

function createDisplayErrorReport(data) {
    const keys = Object.keys(data)

    const boxErrorElement = document.getElementById('messageErrorModal')

    const boxTextError = document.createElement('p')
    console.log(keys)
    const textError = document.createTextNode(data[keys[0]])

    boxTextError.appendChild(textError)
    boxTextError.classList = 'text-white mt-2 font-weight-bold'

    boxErrorElement.appendChild(boxTextError)
}

function clear(items) {
    while (items.firstChild) {
        items.removeChild(items.lastChild)
    }
}

function switchImageFollowButton(boolean) {
    if(boolean) {
        document.getElementById('follow').style.backgroundImage = 'url(../img/balao-de-coracao-preenchido.svg)'
    } else {
        document.getElementById('follow').style.backgroundImage = 'url(../img/balao-de-coracao.svg)'
    }
}

function changeReportButton(exists, item) {
    if(exists) {
        item.style.backgroundImage = 'url(../img/adendo-preenchido.svg)'
        item.setAttribute('title', 'Você já reportou essa ong')
        item.disabled = true
        item.style.cursor = 'auto'
    }
}

document.getElementById('next').addEventListener('click', () => {
    const items = document.getElementById('box-items')
    clear(items)
    requestContentList(key, document.getElementById('next').value)
})

document.getElementById('last').addEventListener('click', () => {
    const items = document.getElementById('box-items')
    clear(items)
    requestContentList(key, document.getElementById('last').value)
})

document.getElementById('follow').addEventListener('click', () => {
    requestRegisterFollow(key)
})

document.getElementById('openModal').addEventListener('click', () => {
    const modal = document.getElementById('reportModal')
    modal.classList.remove('anulation')
})

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('reportModal')
    modal.classList.add('anulation')
})

document.getElementById('sendReport').addEventListener('click', () => {
    const boxMessageError = document.getElementById('messageErrorModal')
    const desc = document.getElementById('explicacao_report').value

    body = {
        'id_reportado': key[0],
        'explicacao': desc,
        'tipo_usuario_reportado': 'ong'
    }

    clear(boxMessageError)
    requestRegisterReport(body)
})

requestContentOng(key)
requestContentTel(key)
requestContentEnd(key)
requestContentList(key)
requestFollowExists(key)
requestReportExists(key)

function errorRedirect(status) {
    if (status === 401 || status === 500) {
        window.location.assign('../../autenticacao/login/login.html')
    } else if (status === 400) {
        window.location.assign('listOngs.html')
    } 
}

function defineHeaders() {
    return {'Authorization': `Bearer ${localStorage.token}`} 
}
