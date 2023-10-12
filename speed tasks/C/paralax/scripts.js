const lorem1 = document.querySelector('.lorem1')
const lorem2 = document.querySelector('.lorem2')


document.addEventListener('mousemove', (e) => {
    let x = e.clientX
    let y = e.clientY

    if (x < 600 && y < 200) {
        console.log('200!!')
        lorem1.style.animation = 'go .5s linear infinite'
    } else {
        lorem1.style.animation = 'go 2s linear infinite'
    }


    if (x > 450 && y > 300) {
        console.log('200!!')
        lorem2.style.animation = 'go .5s linear infinite'
    } else {
        lorem2.style.animation = 'go 2gis linear infinite'
    }
    console.log(x, y)
})