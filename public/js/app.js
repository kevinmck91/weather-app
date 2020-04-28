console.log('Client side Javascript is loaded');

// We can use the client side fetch API to access the JSON API we have created

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()     //prevents the default behavoir of refreshing the page

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location  = search.value  //capture the inputted value

    // fecth the API on the same server we are running the app on
    fetch("/api?address=" + location).then( (response) => {
        
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Error Getting data. Check Console'
                messageTwo.textContent = ''
                console.log(data.error);
            }
            else {
                console.log("data.location : " + data.location);
                console.log(data);
                messageOne.textContent = data.location
                messageTwo.textContent = data.string    // taken from app.js (backend)
            }
        })
    })
})