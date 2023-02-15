//Hide svg
const barTop = document.querySelector('.bar-top_left_slides_container');
const svgTop = document.querySelector('.bar-top_left_svg-hide');
barTop.addEventListener('mouseover', () => {
    svgTop.style.display = "flex";
})
barTop.addEventListener('mouseout', () => {
    svgTop.style.display = "none";
})
/* Bar-top slide */
const x = 830;
let index = 0;
const slides = document.getElementById('slide');
const slideImg = document.querySelectorAll('#slides');
function Next() {
    if (index < slideImg.length - 1) {
        index++;
    } else {
        index = 0;
    }

    slides.style.transform = `translateX(-${x * index}px)`
}
function Prev() {
    if (index == 0) {
        index = slideImg.length - 1;
    } else {
        index--;
    }

    slides.style.transform = `translateX(-${x * index}px)`
}
document.getElementById('slide-prev').addEventListener('click', () => {
    Prev();
    removeActive()
    slides.style.transform = `translateX(-${x * index}px)`;
    dot[index].classList.add('bar-top_left_item-avtive');
})
document.getElementById('slide-next').addEventListener('click', () => {
    Next();
    removeActive()
    slides.style.transform = `translateX(-${x * index}px)`;
    dot[index].classList.add('bar-top_left_item-avtive');
})
setInterval(Next, 3000);
//Dot
const dot = document.querySelectorAll('.bar-top_left_item');
dot.forEach((image, index) => {
    image.addEventListener('click', () => {
        removeActive();
        slides.style.transform = `translateX(-${x * index}px)`;
        image.classList.add('bar-top_left_item-avtive');
    })
})
function removeActive() {
    const imageActive = document.querySelector('.bar-top_left_item-avtive');
    imageActive.classList.remove('bar-top_left_item-avtive');
}
// Auto img
let index2 = 0;
function autoImg() {
    index2++;
    if (index2 > slideImg.length - 1) {
        index2 = 0;
    }
    removeActive();
    slides.style.transform = `translateX(-${x * index}px)`;
    dot[index].classList.add('bar-top_left_item-avtive');
}
setInterval(autoImg, 3000);
//hover img
function hoverImg() {
    const overItem = document.querySelectorAll('.body_product-item');
    const test = document.querySelectorAll('.body_product-item')
    const imgSlides = document.querySelectorAll('.body_product-link-img')

    for (let i = 0; i < overItem.length; i++) {

        test[i].onmouseover = function () {
            imgSlides[i].style.transform = "translateY(-22px)"
        }
        test[i].onmouseout = function () {
            imgSlides[i].style.transform = "translateY(0px)"
        }
    }
}
hoverImg();
//Slides list product
function slidesList() {
    const x = 1199.99;
    let index = 0;

    const slide = document.querySelector('.body_product-slide');
    const slides = document.querySelectorAll('.body_product-list');
    function Next() {
        if (index < slides.length - 1) {
            index++;
        } else {
            index = 0;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    }
    function Prev() {
        if (index == 0) {
            index = slides.length - 1;
        } else {
            index--;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    }
    document.getElementById('slide-next2').addEventListener('click', () => {
        Next();
    })
    document.getElementById('slide-prev2').addEventListener('click', () => {
        Prev();
    })
}
slidesList();

// Hover img product hot

function hoverImgHot() {
    const li = document.querySelectorAll('.body_hot-p-product-item');
    const img = document.querySelectorAll('.body_hot-p-product-link-img');
    const content = document.querySelectorAll('.body_hot-p-product-link-content h2')

    for (let i = 0; i < li.length; i++) {
        li[i].addEventListener('mouseover', () => {
            img[i].style.transform = 'translateY(-22px)';
            content[i].style.color = '#288ad6'
        })
        li[i].addEventListener('mouseout', () => {
            img[i].style.transform = 'translateY(0px)';
            content[i].style.color = 'black'
        })
    }
}
hoverImgHot();
//ferch data country 

function Add() {
    fetch('Resoucer/dataJson/countries.json')
        .then(res => res.json())
        .then(res => {
            const htmls = res.map((city) => {
                return `<li id=${city.Id}>${city.Name}</li>`
            })
            document.querySelector('#country_map').innerHTML = htmls.join('')
        })
    document.querySelector('.header_left-item-sl').addEventListener('click', () => {
        document.getElementById('hide_show').style.display = 'block';
        clickCities();
    })
    document.querySelector('.header_left-country-top-address button').addEventListener('click', () => {
        document.getElementById('hide_show').style.display = 'none';
    })

}
Add();

function clickCities() {
    setInterval(() => {
        const cities = document.querySelector('#country_map').children
        for (let i = 0; i < cities.length; i++) {
            cities[i].addEventListener('click', () => {
                Test(cities[i].id)
            })
        }
    }, 1000)
}
function Test(id) {
    fetch('Resoucer/dataJson/countries.json')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            data.filter((crr) => {
                const city = document.querySelector('#country_map');
                if (crr.Id === id) {
                    while (city.hasChildNodes()) {
                        city.removeChild(city.firstChild)
                    }
                    const text = document.querySelector('.header_left-country-top').children[1];
                    text.value = `${crr.Name},`;
                    const districts = crr.Districts
                    const htmls = districts.map(data => {
                        return `
                            <li id=${data.Id}>${data.Name}</li> 
                        `
                    })
                    city.innerHTML = htmls.join('');
                }
                const address = document.querySelector('.header_left-country-top-address')
                address.children[0].style.display = 'none'
                address.children[1].style.display = 'block'
            })
            const cities = document.querySelector('#country_map').children
            for (let i = 0; i < cities.length; i++) {
                cities[i].addEventListener('click', () => {
                    Districts(cities[i].id)
                })
            }
        })
}
function Districts(id) {
    fetch('Resoucer/dataJson/countries.json')
        .then(data => data.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const city = document.querySelector('#country_map');
                const districts = data[i].Districts
                districts.filter((crr) => {
                    if (id === crr.Id) {
                        while (city.hasChildNodes()) {
                            city.removeChild(city.firstChild)
                        }
                        const text = document.querySelector('.header_left-country-top').children[1];
                        text.value += `${crr.Name}`;
                        const wards = crr.Wards
                        const htmls = wards.map(data => {
                            return `
                                <li id=${data.Id}>${data.Name}</li> 
                            `
                        })
                        city.innerHTML = htmls.join('');
                    }
                })
            }
        })
}
function PrevCity() {
    const address = document.querySelector('.header_left-country-top-address')

    address.addEventListener('click', () => {
        Add();
        address.children[0].style.display = 'block';
        address.children[1].style.display = 'none';
    })
}
PrevCity()


function nextTablet(silde, list) {
    const x = 1199.99;
    let index = 0;
    const slide = document.querySelector(silde).children[1].children[0];
    const next = document.querySelector(silde).children[2].children[1];
    const prev = document.querySelector(silde).children[2].children[0];
    const imgList = document.querySelectorAll(list);
    next.addEventListener('click', () => {
        if (index < imgList.length - 1) {
            index++;
        } else {
            index = 0;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    })
    prev.addEventListener('click', () => {
        if (index == 0) {
            index = imgList.length - 1;
        } else {
            index--;
        }
        slide.style.transform = `translateX(-${x * index}px)`
    })
}
nextTablet('.body_hot-tl', '.tl')
nextTablet('.body_hot-pk', '.pk')

//Block Slideshow 

function slideWatch(slides, list) {
    const x = 966;
    let index = 0;
    const slide = document.querySelector(slides).children[0];
    const prev = document.querySelector(slides).children[1].children[0];
    const next = document.querySelector(slides).children[1].children[1];
    const imgList = document.querySelectorAll(list);

    next.addEventListener('click', () => {
        if (index < imgList.length - 1) {
            index++;
        } else {
            index = 0;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    })
    prev.addEventListener('click', () => {
        if (index == 0) {
            index = imgList.length - 1;
        } else {
            index--;
        }
        slide.style.transform = `translateX(-${x * index}px)`
    })
}

slideWatch('.body_smartWatch-container', '.smartWatch-list');
slideWatch('.body_glasses-container', '.glasses-list');
slideWatch('.body_ring-container', '.ring-list');
// hover Img block
function overImageBlock(){
    const item = document.querySelectorAll('.body_smartWatch-slide-item');
    const img = document.querySelectorAll('.body_smartWatch-slide-img');
    for(let i = 0; i < item.length; i++){
        item[i].addEventListener('mouseover', function(){
            img[i].style.transform = 'translateY(-20px)';
        })
        item[i].addEventListener('mouseout', function(){
            img[i].style.transform = 'translateY(0px)';
        })
    }
}
overImageBlock();

//Slide one item
function slideItem(){
    const slide = document.querySelector('.body_newProduct ul');
    const prev = document.querySelector('.body_newProduct').children[2].children[0];
    const next = document.querySelector('.body_newProduct').children[2].children[1];
    const item = document.querySelectorAll('.body_newProduct-item');
    let index = 0;
    const x = 405.600;

    next.addEventListener('click', function(){
        if(index < item.length - 3){
            index ++;
        }else{
            index = 0;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    })
    prev.addEventListener('click', () => {
        if (index == 0) {
            index = item.length - 3;
        } else {
            index--;
        }
        slide.style.transform = `translateX(-${x * index}px)`
    })
}
slideItem()

function newsPaperSlide(){
    const slide = document.querySelector('.body_newsPaper-right-slide-list');
    const item = document.querySelectorAll('.body_newsPaper-right-slide-item');
    const prev = document.querySelector('.body_newsPaper-slide-btn').children[0];
    const next = document.querySelector('.body_newsPaper-slide-btn').children[1];
    const x = 396;
    let index = 0;
    next.addEventListener('click', function(){
        if(index < item.length - 1){
            index ++;
        }else{
            index = 0;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    })
    prev.addEventListener('click', function(){
        if(index == 0){
            index = item.length-1;
        }else{
            index --;
        }
        slide.style.transform = `translateX(-${x * index}px)`;
    })
}
newsPaperSlide()