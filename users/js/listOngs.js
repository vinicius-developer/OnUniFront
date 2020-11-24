const url = 'http://127.0.0.1:8000/api/info/users/ong/list'
//const url = 'https://onuniapi.herokuapp.com/api/info/users/ong/list'
const headers = {
    'Authorization': `Bearer ${localStorage.token}`
}

async function listOngs(url, headers) {
    await axios.get(url, {'a': 'a'})
        .then(response => {
            console.log(response.data)
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





// http://127.0.0.1:8000/storage/pothoPerfilOng/fotoOngPadrao.png
// https://onuniapi.herokuapp.com/storage/pothoPerfilOng/fotoOngPadrao.png