const url = 'http://127.0.0.1:8000/api/info/users/ong/list'
//const url = 'https://onuniapi.herokuapp.com/api/info/users/ong/list'
const headers = {
    'Authorization': `Bearer ${localStorage.token}`
}



async function listOngs(url, headers) {
    await axios.get(url, {headers})
        .then(response => {
            createDisplay(response.data)
        })
        .catch(error => {
            if(error.response.status === 401) {
                window.location.assign('../../autenticacao/login/login.html')
            } else {
                alert('Estamos com problemas técnicos em nosso sistema')
            }
        })
}

listOngs(url, headers)

function createDisplay(response) {
    const data = response.data
    data.map((ong, ind) => {
        console.log(ong)
        const list = document.getElementById('list')
        list.innerHTML = '<article class="item-list"></article>'
        const item = document.getElementsByClassName('item-list')
        item[ind].innerHTML = '<div class="box-potho-ong"></div>'
        const itemImg = document.getElementsByClassName('box-potho-ong')
        console.log(itemImg)
        itemImg[ind].innerHTML = '<img src="http://127.0.0.1:8000/storage/' + ong.img +'">'
        //itemItem[ind].innerHTML = `<img src="https://onuniapi.herokuapp.com/storage/${ong.img}">`
        
    })
}




// http://127.0.0.1:8000/storage/pothoPerfilOng/fotoOngPadrao.png
// https://onuniapi.herokuapp.com/storage/pothoPerfilOng/fotoOngPadrao.png