async function meInfoOngRequest() {
    const urlMe = 'http://127.0.0.1:8000/api/ong/auth/me'
    //const url =  `https://onuniapi.herokuapp.com/api/ong/auth/me`

    const headers = defineHeaders();

    axios.get(urlMe, {headers})
        .then(response => {
            createDisplayOng(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function telephoneMeInfoRequest() {
    const urlTelephone = 'http://127.0.0.1:8000/api/ong/auth/me'

    const headers = defineHeaders();
    console.log(headers)

    axios.get(urlTelephone, {headers})
        .then(response => {
            console.log(response)
            createDiplayTel(response.data)
        })
        .catch(error => {
            console.log(error)
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



meInfoOngRequest()
telephoneMeInfoRequest()



