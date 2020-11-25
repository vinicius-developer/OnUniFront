const url =  `http://127.0.0.1:8000/api/info/users/ong/find/`
//const url =  `https://onuniapi.herokuapp.com/api/info/users/ong/find/${key}`
const headers = {
    'Authorization': `Bearer ${localStorage.token}`
}

async function requestContent(url, headers){
    const key = window.location.href.split('=').slice(1,2)
    
    await axios.get(url + key, {headers})
        .then(response => {
            createDisplay(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else if(error.response.status === 400){
                window.location.assign('listOngs.html')
            }
        })

} 

requestContent(url, headers)


function createDisplay(data) {
    const ong = data[0]
    console.log(ong)

    const ongContent = document.getElementById('ong-content')

    const boxOneElement = document.createElement('section')
    boxOneElement.classList = 'box-one'

    const imgLogo = document.createElement('div')
    imgLogo.classList = 'box-potho-ong'
    imgLogo.style.backgroundImage = `url('http://127.0.0.1:8000/storage/${ong.img}')`
    //imgLogo.style.backgroundImage = `url('https://onuniapi.herokuapp.com/storage/${ong.img}')`

    boxOneElement.appendChild(imgLogo)

    const boxTitleElement = document.createElement('div')
    boxTitleElement.classList = 'box-title'

    const titleElement = document.createElement('h1')
    const textTitle = document.createTextNode(ong.nomeFantasia)

    titleElement.appendChild(textTitle)
    boxTitleElement.appendChild(titleElement)

    boxOneElement.appendChild(boxTitleElement)



    ongContent.appendChild(boxOneElement)
}
