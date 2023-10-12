console.log('Hello World!')

// smile
const smile = document.querySelector('.smile')

// smile elements
const smile_span1 = document.querySelector('.smile_span1')
const smile_span2 = document.querySelector('.smile_span2')
const smile_span3 = document.querySelector('.smile_span3')

// buttons
const show1 = document.querySelector('.show1')
const show2 = document.querySelector('.show2')
const show3 = document.querySelector('.show3')


show1.addEventListener('click', () => {
    smile.style.borderColor = 'darkgreen'
    smile.style.backgroundColor = 'lightgreen'

    smile_span1.style.backgroundColor = 'darkgreen'
    smile_span2.style.backgroundColor = 'darkgreen'
    smile_span3.style.backgroundColor = 'darkgreen'
})

show2.addEventListener('click', () => {
    smile.style.borderColor = 'darkorange'
    smile.style.backgroundColor = 'rgb(255, 188, 63)'

    smile_span1.style.backgroundColor = 'darkorange'
    smile_span2.style.backgroundColor = 'darkorange'
    smile_span3.style.backgroundColor = 'darkorange'
})

show3.addEventListener('click', () => {
    smile.style.borderColor = 'rgb(219, 81, 81)'
    smile.style.backgroundColor = 'lightcoral'

    smile_span1.style.backgroundColor = 'rgb(219, 81, 81)'
    smile_span2.style.backgroundColor = 'rgb(219, 81, 81)'
    smile_span3.style.backgroundColor = 'rgb(219, 81, 81)'
})