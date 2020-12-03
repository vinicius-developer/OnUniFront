async function myInformation() {
    const urlMe = 'http://127.0.0.1:8000/api/doador/auth/me'
    //const urlMe = https://onuniapi.herokuapp.com/api/doador/auth/me'

    const headers = getHeaders()

    await axios.get(urlMe, { headers })
        .then(response => {
            const item = document.getElementById('dashboard-body')
            clear(item)
            createDisplayMyInformation(response.data)
        })
        .catch(error => {
            console.log(error)
            errorRedirect(error.response.status)
        })
}

async function listFavoriteOngs(page = 1) {
    const urlListFav = 'http://127.0.0.1:8000/api/actions/follow/index'
    //const urlListFav = 'https://onuniapi.herokuapp.com/api/actions/follow/index'

    const headers = getHeaders()

    await axios.get(`${urlListFav}?page=${page}`, { headers })
        .then(response => {
            const item = document.getElementById('dashboard-body')
            clear(item)
            createDisplayListFavoriteOngs(response.data)
            buttonNext = document.getElementById('next')
            buttonLast = document.getElementById('last')

            if (page >= 1 && page <= response.data[0].last_page) {
                buttonNext.value = parseInt(page) + 1
                buttonLast.value = parseInt(page) - 1
            }

            if (page < response.data[0].last_page) {
                buttonNext.style.display = 'block'
            } else {
                buttonNext.style.display = 'none'
            }

            if (page > 1) {
                buttonLast.style.display = 'block'
            } else {
                buttonLast.style.display = 'none'
            }

            buttonNext.setAttribute('onclick', `listFavoriteOngs(${buttonNext.value})`)
            buttonLast.setAttribute('onclick', `listFavoriteOngs(${buttonLast.value})`)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function changePhotoPerfil(image) {
    const urlChangeImage = 'http://127.0.0.1:8000/api/doador/image/change'
    //const urlChangeImage = 'https://onuniapi.herokuapp.com/api/doador/image/change'

    const headers = getHeaders()

    headers['Content-Type'] = 'multipart/form-data'

    const formdata = new FormData()

    formdata.append('photo', image)

    axios.post(urlChangeImage, formdata, { headers })
        .then(response => {
            const item = document.getElementById('dashboard-body')
            document.getElementById('changePhotoModal').classList.add('anulation')
            clear(item)
            myInformation()
        })
        .catch(error => {
            if (error.response.status === 422) {
                createMessageErrorPhoto(error.response.data.errors.photo)
            } else if (error.response.status === 500) {
                alert('estamos com problemas em nosso sistema')
            } else {
                errorRedirect(error.response.status)
            }

        })
}

function createDisplayMyInformation(information) {
    // http://127.0.0.1:8000/storage/pothoPerfilOng/fotoOngPadrao.png
    // https://onuniapi.herokuapp.com/storage/pothoPerfilOng/fotoOngPadrao.png

    item = document.getElementById('dashboard-body')

    const firstRow = document.createElement('div')
    const secondRow = document.createElement('div')
    const thirdRow = document.createElement('div')

    // PRIMEIRA LINHA

    const photoElement = document.createElement('div')
    photoElement.style.backgroundImage = `url(http://127.0.0.1:8000/storage/${information['img_perfil']})`
    //photoElement.style.backgroundImage = `url(https://onuniapi.herokuapp.com/storage/${information['img_perfil']})`
    photoElement.classList = 'img-usr mb-5'
    photoElement.setAttribute('onclick', 'openModal()')

    firstRow.appendChild(photoElement)
    firstRow.classList = 'box-img'

    item.appendChild(firstRow)

    // SEGUNDA LINHA

    const boxNameElement = document.createElement('p')
    const createTextName = document.createTextNode(`${information['nome']}  ${information['sobrenome']}`)

    boxNameElement.classList = 'text-white font-weight-bold name-usr'

    boxNameElement.appendChild(createTextName)
    secondRow.appendChild(boxNameElement)

    secondRow.classList = 'box-name my-3 text-center mx-5'

    item.appendChild(secondRow)

    // TERCEIRA LINHA

    const boxEmailElement = document.createElement('p')
    const boxCpfElement = document.createElement('p')

    const emailText = document.createTextNode(`E-mail: ${information['email']}`)
    const cpfText = document.createTextNode(`CPF: ${information['cpf']}`)

    boxEmailElement.appendChild(emailText)
    boxCpfElement.appendChild(cpfText)

    boxEmailElement.classList = 'mx-2 text-info-usr'
    boxCpfElement.classList = 'mx-2 text-info-usr'

    thirdRow.appendChild(boxEmailElement)
    thirdRow.appendChild(boxCpfElement)

    thirdRow.classList = 'box-info mx-5 text-white font-weight-bold'

    item.appendChild(thirdRow)

    item.style.display = 'flex'
}


function createDisplayListFavoriteOngs(response) {
    data = response[0].data

        const item = document.getElementById('dashboard-body')

    if (data.length != 0) {
        item.style.display = 'block'
        const boxList = document.createElement('div')
        boxList.classList = 'box-list'
        item.appendChild(boxList)

        for (let i = 0; i < data.length; i++) {
            values = Object.values(data[i])

            // BOX ONG
            const createBoxOngElement = document.createElement('div')
            createBoxOngElement.classList = 'box-ong-favorite mt-3 p-2'
            createBoxOngElement.setAttribute('onclick', `infoOng('${data[i]['id_ongs']}')`)

            boxList.appendChild(createBoxOngElement)

            // BOX IMG
            const createOngImgElement = document.createElement('div')
            createOngImgElement.style.backgroundImage = `url(http://127.0.0.1:8000/storage/${data[i]['img_perfil']})`
            createOngImgElement.classList = 'img-ong-favorite'

            createBoxOngElement.appendChild(createOngImgElement)

            // TITLE NAME
            const createNameFatasiaElement = document.createElement('h3')
            createNameFatasiaElement.classList = 'title-ong-favorite ml-2 font-weight-bold'

            const createTextNameFantasia = document.createTextNode(data[i]['nome_fantasia'])

            createNameFatasiaElement.appendChild(createTextNameFantasia)

            createBoxOngElement.appendChild(createNameFatasiaElement)

            // DESCRICAO
            const createDescricaoElement = document.createElement('p')
            createDescricaoElement.classList = "descricao-ong-favorite ml-2 mt-2 font-weight-bold"

            const createTextDescricao = document.createTextNode(cut(data[i]['descricao_ong']))

            createDescricaoElement.appendChild(createTextDescricao)

            createBoxOngElement.appendChild(createDescricaoElement)
        }

        // PAGINATE

        const createBoxPaginateElement = document.createElement('div')
        createBoxPaginateElement.classList = 'box-paginate mt-3'
        createBoxPaginateElement.setAttribute('id', 'box-paginate')

        const createButtonLastPaginateElement = document.createElement('button')
        const createButtonNextPaginateElement = document.createElement('button')

        const createButtonLastPaginateText = document.createTextNode('<')
        const createButtonNextPaginateText = document.createTextNode('>')

        createButtonLastPaginateElement.classList = 'button-color-paginate'
        createButtonLastPaginateElement.setAttribute('id', 'last')
        createButtonNextPaginateElement.classList = 'button-color-paginate'
        createButtonNextPaginateElement.setAttribute('id', 'next')

        createButtonLastPaginateElement.appendChild(createButtonLastPaginateText)
        createButtonNextPaginateElement.appendChild(createButtonNextPaginateText)

        createBoxPaginateElement.appendChild(createButtonLastPaginateElement)
        createBoxPaginateElement.appendChild(createButtonNextPaginateElement)

        item.appendChild(createBoxPaginateElement)
    } else {
        const createTitleElement = document.createElement('h1')
        const textTitleElement = document.createTextNode('Não há ONGs favoritas')

        createTitleElement.classList = 'text-white text-weight-bold'

        createTitleElement.appendChild(textTitleElement)



        item.appendChild(createTitleElement)
        
    }

    function cut(string) {
        if (string[99] != undefined) {
            const newStr = string.substring(0, 90)
            return newStr + "..."
        } else {
            return string
        }
    }
}

function createMessageErrorPhoto(message) {
    const boxError = document.getElementById('messageErrorModal')

    const errorElement = document.createElement('p')
    const textElement = document.createTextNode(message[0])

    errorElement.appendChild(textElement)

    boxError.appendChild(errorElement)
}

function setValueOnclickNext() {
    createButtonNextPaginateElement.setAttribute('onclick', 'listFavoriteOngs()')
}

function infoOng(id) {
    window.location.href = `infoOng.html?key=${id}`
}

function clear(item) {
    while (item.firstChild) {
        item.removeChild(item.lastChild)
    }
}

document.getElementById('myInfo').addEventListener('click', () => {
    myInformation()
})

document.getElementById('ongFav').addEventListener('click', () => {
    listFavoriteOngs();
})

document.getElementById('sendPhoto').addEventListener('click', () => {
    const image = document.getElementById('photoModal').files[0]
    changePhotoPerfil(image)
})

function openModal() {
    const modal = document.getElementById('changePhotoModal')
    modal.classList.remove('anulation')
}

function closeModal() {
    const modal = document.getElementById('changePhotoModal')
    modal.classList.add('anulation')
}

myInformation()

function errorRedirect(status) {
    if (status === 401) {
        window.location.assign('../../autenticacao/login/login.html')
    }
}

function getHeaders() {
    return { 'Authorization': `Bearer ${localStorage.token}` }
}