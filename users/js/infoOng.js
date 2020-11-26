async function requestContentOng(){
    const key = window.location.href.split('=').slice(1,2)

    const urlOng = `http://127.0.0.1:8000/api/info/users/ong/find/${key}`
    const urlTel = `http://127.0.0.1:8000/api/info/objects/telephone/list/${key}`
    const urlEnd = `http://127.0.0.1:8000/api/info/objects/address/list/${key}`
    const urlList = `http://127.0.0.1:8000/api/ong/wishlist/index/${key}`

    //const urlTel =  `https://onuniapi.herokuapp.com/api/info/objects/telephone/list/${key}`
    //const urlOng =  `https://onuniapi.herokuapp.com/api/info/users/ong/find/${key}`
    //const urlEnd =  `https://onuniapi.herokuapp.com/api/info/objects/address/list/${key}`
    //const urlList = `https://onuniapi.herokuapp.com/api/ong/wishlist/index/${key}`

    const headers = {
        'Authorization': `Bearer ${localStorage.token}`
    }
    
    await axios.get(urlOng, {headers})
        .then(response => {
            createDisplayOng(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else if(error.response.status === 400){
                window.location.assign('listOngs.html')
            }
        })

    await axios.get(urlTel, {headers})
        .then(response => {
            createDiplayTel(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else if(error.response.status === 400){
                window.location.assign('listOngs.html')
            }
        })

    await axios.get(urlEnd, {headers})
        .then(response => {
            createDisplayEnd(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else if(error.response.status === 400){
                window.location.assign('listOngs.html')
            }
        })
    
    await axios.get(urlList, {headers})
        .then(response => {
            createDisplayList(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else if(error.response.status === 400){
                window.location.assign('listOngs.html')
            }
        })
} 

function createDisplayOng(data) {
    const ong = data[0]

    const ongContent = document.getElementById('ong-content')

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

    for(let i = 0; i < keys.length; i++) {
        if(values[i]) {
            const endElement = document.createElement('p')
            const endText = document.createTextNode(`${keys[i]}: ${values[i]}`)

            endElement.appendChild(endText)
            endElement.classList = 'font-weight-bold'
            boxEndElement.appendChild(endElement)
        }
    }
}

function createDisplayList(data) {
    const items = data.data
    items.map((item, ind) => {

        console.log(item)

        const boxItemsElement = document.getElementById('list-items')

        const itemElement = document.createElement('div')

        const nameItemsElement = document.createElement('h4')
        const nameItemsText = document.createTextNode(`Iten: ${item['nomeItem']}`)

        nameItemsElement.appendChild(nameItemsText)

        const linkLojaElement = document.createElement('a')
        const textLink = document.createTextNode(`Loja: ${item['nomeFantasiaLoja']}`)

        linkLojaElement.setAttribute('href', item['linkLoja'])
        linkLojaElement.appendChild(textLink)

        itemElement.appendChild(nameItemsElement)
        itemElement.appendChild(linkLojaElement)

        boxItemsElement.appendChild(itemElement)


        console.log(values)

    })
}




requestContentOng()
