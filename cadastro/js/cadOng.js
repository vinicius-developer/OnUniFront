// document.getElementById('cadastrar').addEventListener('click', (e) => {
//     e.preventDefault()

//     //     options['method'] = 'POST';
//     options['mode'] = 'cors';
//     options['header'] = {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Methods': "GET, PUT, DELETE, POST",
//         'Access-Control-Allow-Heders': "rigin, X-Requested-With, Content-Type, Accept, Authorization*",
//         'Access-Control-Allow-Origin': "*",
//         "Status": "200 OK",
//         "Vary": "Accept"
//     }
//     options['body'] = JSON.stringify(data)


//     async function sendRegisterOng(options) {
//         const response = await fetch("http://127.0.0.1:8000/api/ong/auth/register", options)
//         return response
//     }

//     sendRegisterOng(options)
//         .then(response => console.log(response))
//         .catch(error => console.log(error.message))
// })


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

    async function testeTeste(body, header) {

        const response = await (axios.post('http://127.0.0.1:8000/api/ong/auth/register', body, header)).data

        return response

    }

    console.log(testeTeste(data, header))

})
