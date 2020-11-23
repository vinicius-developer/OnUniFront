document.getElementById('cadastrar').addEventListener('click', (e) => {
    e.preventDefault();

    const elementsForm = document.getElementById('form').elements
    const telefones = document.getElementsByClassName('telefones');
    const data = {}
    const header = {
        'Content-Type': 'application/json'
    }
    data['telefones'] = []

    for (let i = 0; i < elementsForm.length - 1; i++) {
        if (elementsForm[i].id !== '') data[elementsForm[i].id] = elementsForm[i].value
    }

    for (let i = 0; i < telefones.length; i++) {
        if(telefones[i].value)  data.telefones[i] = telefones[i].value
    }

    async function send(body, header) {
        const response = await axios.post('http://127.0.0.1:8000/api/ong/auth/register', body, header)
            .then(response => response.data.message)
            .catch(error => {
                const errors = error.response.data.errors
                clear(errors)
                alertErrors(errors)
            })
        return response
    }

    send(data, header)

    function alertErrors(error) {
        const campos = Object.keys(error)
        const messages = Object.values(error)

        for (let i = 0; i < campos.length; i++) {
            if(campos[i] !== 'telefones') {
                const elementos = document.getElementById(campos[i]).nextElementSibling
                elementos.innerHTML = `<p>${messages[i]}<p>`
            } else {
                const elementos = document.getElementsByClassName(campos[i])[0].nextElementSibling
                elementos.innerHTML = `<p>${messages[i]}</p>`
            }
        }
    }

    function clear(error) {
        const campos = Object.keys(error)
        const prefix = ['cnpj', 'email', 'nome_fantasia', 'razao_social', 'password', 'rua', 'cep', 'numero', 'bairro', 'cidade', 'descricao']
        for (let i = 0; i < campos.length; i++) {
            const campo = prefix.indexOf(campos[i])
            prefix.splice(campo, 1)
        }
        for (let i = 0; i < prefix.length; i++) {
            const element = document.getElementById(prefix[i]).nextElementSibling.firstChild
            if(element != null) {
                console.log(element)
                element.remove()
            }
        }
    }

    function success() {
        console.log('A')
    }



})
