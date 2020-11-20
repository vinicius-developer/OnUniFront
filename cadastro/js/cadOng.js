document.getElementById('cadastrar').addEventListener('click', (e) => {
    e.preventDefault()

    const elementsForm = document.getElementById('form').elements
    const telefones = document.getElementsByClassName('telefones');
    const data = {}
    const options = {}
    data['telefones'] = []

    for(let i = 0; i < elementsForm.length - 1; i++) {
        if(elementsForm[i].id !== '') data[elementsForm[i].id] = elementsForm[i].value
    }

    for(let i = 0; i < telefones.length; i++) {
        data.telefones[i] = telefones[i].value
    }

    options['method'] = 'POST';
    options['mode'] = "cors";
    options['headers'] = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' ,
    };
    options['body'] = JSON.stringify(data);


    async function sendRegisterOng(options) {
        const response = await fetch("https://onuniapi.herokuapp.com/api/ong/auth/register", options)

        return response.json
    }

    sendRegisterOng(options)
        .then(response => console.log(response))
        .catch(error => console.log(data))

})
