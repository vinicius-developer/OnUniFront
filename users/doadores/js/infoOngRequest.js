const key = window.location.href.split('=').slice(1, 2)

async function requestContentOng(key) {
    const urlOng = `http://127.0.0.1:8000/api/info/users/ong/find/${key}`
    //const urlOng =  `https://onuniapi.herokuapp.com/api/info/users/ong/find/${key}`

    const headers = defineHeaders()

    await axios.get(urlOng, { headers })
        .then(response => {
            createDisplayOng(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentTel(key) {
    const urlTel = `http://127.0.0.1:8000/api/info/objects/telephone/list/${key}`
    //const urlTel =  `https://onuniapi.herokuapp.com/api/info/objects/telephone/list/${key}`

    const headers = defineHeaders()

    await axios.get(urlTel, { headers })
        .then(response => {
            createDiplayTel(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentEnd(key) {
    const urlEnd = `http://127.0.0.1:8000/api/info/objects/address/list/${key}`
    //const urlEnd =  `https://onuniapi.herokuapp.com/api/info/objects/address/list/${key}`

    const headers = defineHeaders()

    await axios.get(urlEnd, { headers })
        .then(response => {
            createDisplayEnd(response.data)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestContentList(key, page = 1) {
    const urlList = `http://127.0.0.1:8000/api/ong/wishlist/index/${key}`
    //const urlList = `https://onuniapi.herokuapp.com/api/ong/wishlist/index/${key}`

    const headers = defineHeaders() 


    await axios.get(`${urlList}?page=${page}`, { headers })
        .then(response => {
            createDisplayList(response.data.data)
            buttonNext = document.getElementById('next')
            buttonLast = document.getElementById('last')

            if (page >= 1 && page <= response.data.last_page) {
                buttonNext.value = parseInt(page) + 1
                buttonLast.value = parseInt(page) - 1
            }

            if (page < response.data.last_page) {
                buttonNext.style.display = 'block'
            } else {
                buttonNext.style.display = 'none'
            }

            if (page > 1) {
                buttonLast.style.display = 'block'
            } else {
                buttonLast.style.display = 'none'
            }
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestFollowExists(key) {
    const urlFollowExists = `http://127.0.0.1:8000/api/actions/follow/find/${key}`
    //const urlFollowExists = `https://onuniapi.herokuapp.com/api/actions/follow/find/${key}`

    const headers = defineHeaders()

    await axios.get(urlFollowExists, { headers })
        .then(response => {
            switchImageFollowButton(response.data.exists)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestRegisterFollow(key) {
    const urlRegisterFollow = `http://127.0.0.1:8000/api/actions/follow/switch/${key}`
    //const urlRegisterFollow = `https://onuniapi.herokuapp'.com/api/actions/follow/switch/${key}`

    const headers = defineHeaders()

    await axios.get(urlRegisterFollow, {headers}) 
        .then(response => {
            switchImageFollowButton(response.data.exists)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

async function requestRegisterReport(body) {
    const urlRegisterReport = `http://127.0.0.1:8000/api/actions/report/register`
    //const urlRegisterFollow = `https://onuniapi.herokuapp'.com/api/actions/follow/switch/${key}`

    const headers = defineHeaders()

    await axios.post(urlRegisterReport, body, {headers})
        .then(response => {
            console.log(response)
            const modal = document.getElementById('reportModal')
            modal.classList = 'anulation'
            const item = document.getElementById('openModal')
            changeReportButton(response.data.exists, item)
        })
        .catch(error => {
            errorRedirect(error.response.status)
            createDisplayErrorReport(error.response.data.errors)
        })
}

async function requestReportExists(key) {
    const urlReportExists =  `http://127.0.0.1:8000/api/actions/report/findong/${key}`
    
    const headers = defineHeaders()

    await axios.get(urlReportExists, {headers})
        .then(response => {
            const item = document.getElementById('openModal')
            changeReportButton(response.data.exists, item)
        })
        .catch(error => {
            errorRedirect(error.response.status)
        })
}

requestContentOng(key)
requestContentTel(key)
requestContentEnd(key)
requestContentList(key)
requestFollowExists(key)
requestReportExists(key)