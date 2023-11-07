// DICHIARAZIONE ARRAY E VARIABILI
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

let activeImageIndex = 0;
let thumb = "";
let thumbsElem = document.querySelector(".thumbs");
let itemElem = document.querySelector(".item");
let x= 0
// array per le chiavi degli oggetti 
const curImage = images.map((curImageElem) => curImageElem.image);
const curTitle = images.map((curTitleElem) => curTitleElem.title);
const curText = images.map((curTextElem) => curTextElem.text);
let titleElem = document.querySelector(".title");
let textElem = document.querySelector(".text");
//constanti per l'autoloop
let autoLoop;
let stopBtn = document.querySelector(".stop");
let playBtn = document.querySelector(".play");
let switchBtn = document.querySelector(".switch");
let loopValue = "normal";

//CONDIZIONI INIZIALI 

itemElem.style.backgroundImage = `url(${curImage[x]})`;
titleElem.innerHTML = curTitle[x];
textElem.innerHTML = curText[x];

addThumbnailImage();

let thumbElem = document.getElementsByClassName("thumb");

console.log(thumbElem);

// AUTOLOOP
autoloop();

// BOTTONI AUTOLOOP 
clickButton();

// CONDIZIONE QUANDO CLICCO SUL UN'IMMAGINE DELLA THUMBNAIL LIST
clickThumb();

// CONDIZIONE QUANDO PREMO IL PULSANTE NEXT
document.querySelector(".next").addEventListener("click", function(){
    nextButton();
});


// CONDIZIONE QUANDO PREMO IL PULSANTE PREV
document.querySelector(".prev").addEventListener("click", function () {
    prevButton();
});






////////////////////////////////////////////////////// FUNZIONI /////////////////////////////////////////////

/////////// funzione per aggiungere le immagini alla thumbnail list
function addThumbnailImage(){

    thumb = `
            <div class="thumb active" style="background-image: url(${curImage[0]});"></div>
            `;

    for (i = 1; i < images.length; i++) {

        thumb += `
                <div class="thumb" style="background-image: url(${curImage[i]});"></div>
                `;
    }
    thumbsElem.innerHTML += thumb;
}


/////////// funzione per l'indice dell'elemento cliccato
function clickThumb() {
    for (let i = 0; i < thumbElem.length; i++) {
        let index;
        
        thumbElem[i].addEventListener("click", function() {
            thumbElem[activeImageIndex].classList.remove("active");
    
            index = i;
    
            x = index;
            activeImageIndex = index;
            
            thumbElem[activeImageIndex].classList.add("active");
            itemElem.style.backgroundImage = `url(${curImage[x]})`;
            titleElem.innerHTML = curTitle[x];
            textElem.innerHTML = curText[x];
        });  
    }
}


/////////// funzione per andare alla prossima immagine con collegamento all'immagine principale
function nextButton() {
    thumbElem[activeImageIndex].classList.remove("active");
    
    if (activeImageIndex <  images.length - 1) {
        x++;
        activeImageIndex++;
    } else {
        // PER IL LOOP
        x = 0;
        activeImageIndex = 0;
    }
    itemElem.style.backgroundImage = `url(${curImage[x]})`;
    titleElem.innerHTML = curTitle[x];
    textElem.innerHTML = curText[x];
    thumbElem[activeImageIndex].classList.add("active");

    console.log(thumbElem);
}

/////////// funzione per andare alla precedente immagine con collegamento all'immagine principale
function prevButton() {
    thumbElem[activeImageIndex].classList.remove("active");
    
        
    if (activeImageIndex > 0) {
        x --;
        activeImageIndex --;

    } else {
        // PER IL LOOP
        x = images.length - 1;
        activeImageIndex = images.length - 1;
    }
    itemElem.style.backgroundImage = `url(${curImage[x]})`;
    titleElem.innerHTML = curTitle[x];
    textElem.innerHTML = curText[x];
    thumbElem[activeImageIndex].classList.add("active");

    console.log(thumbElem);
}

/////////// funzione per il loop
function autoloop(){

    autoLoop = setInterval(function() {
        
        nextButton();
                
    }, 1000);
}

/////////// funzione per il loop inverso
function reverseAutoLoop(){
        
    autoLoop = setInterval(function() {
        
        prevButton();
                
    }, 1000);
}

/////////// funzione per il click dei bottoni
function clickButton() {

    playBtn.addEventListener("click", function() {
        clearInterval(autoLoop)
        autoloop();
    })

    stopBtn.addEventListener("click", function() {
        clearInterval(autoLoop);
    })

    switchBtn.addEventListener("click", function() {

        if(loopValue === "normal") {
            clearInterval(autoLoop);
            reverseAutoLoop();
            loopValue = "reverse";
        } else {
            clearInterval(autoLoop);
            autoloop();
            loopValue = "normal";
        }
    })
    return loopValue;
}

