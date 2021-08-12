document.addEventListener('DOMContentLoaded', () => {
   getLikes
})
const quoteList = document.querySelector('#quote-list')
let newQuoteForm = document.querySelector('#new-quote-form')

const getLikes =  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(resp => resp.json())
  .then(quotesArray => 
    quotesArray.forEach(quoteObj =>{
      turnQuoteToHTML(quoteObj)

        })
    )

function turnQuoteToHTML(quoteObj){
 let outerEl = document.createElement('li')
 outerEl.className = 'quote-card'

 outerEl.innerHTML = `<blockquote class="blockquote">
     <p class="mb-0">${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
     <br>
    <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>`

quoteList.append(outerEl)

let deleteButton = outerEl.querySelector('.btn-danger')
let likeButton = outerEl.querySelector('.btn-success')
let likeSpan = outerEl.querySelector('span')


deleteButton.addEventListener('click', () => {
    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then((resp) => outerEl.remove())
})


likeButton.addEventListener('click', () => {
    fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify({
            quoteId:quoteObj.id
        })
    })
    .then (resp=> resp.json())
    .then(newLike=>{
        
        quoteObj.likes.push(newLike)
        likeSpan.innerText = quoteObj.likes.length
    })
})
newQuoteForm.addEventListener('submit', (e) =>{
//  e.preventDefault()
 let author = e.target.author.value
 let quoteText = e.target['new-quote'].value
 
 fetch('http://localhost:3000/quotes', {
     method:'POST',
     headers: {
         'Content-type': 'application/json',
     },
     body: JSON.stringify({
        author: author,
        quote: quoteText
     })
 })
 .then(resp => resp.json())
 .then((newQuote) => { 
     
     newQuote.likes = []
    turnQuoteToHTML(newQuote)
 })
   
 
})

}    

