function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, '');
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
}

function mask(id, mask) {
    const element = document.querySelector(id);
    VMasker(element).maskPattern(mask[0]);
    element.addEventListener('input', inputHandler.bind(undefined, mask, 14), false);
}

function alertErrors(error) {
    const campos = Object.keys(error.response.data.errors)
    const messages = Object.values(error.response.data.errors)
    for (let i = 0; i < campos.length; i++) {
        if (campos[i] !== 'telefones') {
            const elementos = document.getElementById(campos[i]).nextElementSibling
            elementos.innerHTML = `<p>${messages[i]}<p>`
        } else {
            const elementos = document.getElementsByClassName(campos[i])[0].nextElementSibling
            elementos.innerHTML = `<p>${messages[i]}</p>`
        }
    }
}

function clear(error, prefix) {
    const campos = Object.keys(error.response.data.errors)
    for (let i = 0; i < campos.length; i++) {
        const campo = prefix.indexOf(campos[i])
        prefix.splice(campo, 1)
    }
    for (let i = 0; i < prefix.length; i++) {
        const element = document.getElementById(prefix[i]).nextElementSibling.firstChild
        if (element != null) element.remove()
    }
}

function success(message) {
    const box = document.getElementsByClassName('inner')[0]
    const form = document.getElementById('form')
    form.classList.add('desapear')
    box.classList.add('centralize')
    box.innerHTML = `<h2> ${message} :) </h2>`
}



