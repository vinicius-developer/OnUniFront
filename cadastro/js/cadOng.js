document.getElementById('cadastrar').addEventListener('click', (e) => {
    e.preventDefault();

    const elementsForm = document.getElementById('form').elements
    const telefones = document.getElementsByClassName('telefones');
    const data = {}
    const header = {
        'Content-Type': 'application/json'
    }
    data['telefones'] = []

    for(let i = 0; i < elementsForm.length - 1; i++) {
         if(elementsForm[i].id !== '') data[elementsForm[i].id] = elementsForm[i].value
    }

    for(let i = 0; i < telefones.length; i++) {
        data.telefones[i] = telefones[i].value
    }

    async function send(body, header) {
        const response = await axios.post('http://127.0.0.1:8000/api/ong/auth/register', body, header)
            .then(response => response.data.message)
            .catch(error => {
                const errors = error.response.data.errors
                alertErrors(errors)
            })

        return response
    }

    send(data, header)

    function alertErrors(error) {
        const campos = Object.keys(error)
        const messages = Object.values(error)

        console.log(messages)

        for(let i = 0; i < campos.length; i++){
            const elementos = document.getElementById(campos[i]).nextElementSibling
            let nameElement = document.getElementById(campos[i]).previousElementSibling.textContent.slice(0, -3)

            elementos.innerHTML = 'O campo ' + nameElement + ' é '+ messages[i]

        }


    }
})
