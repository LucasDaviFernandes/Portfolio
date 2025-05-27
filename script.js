import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";


const words = ["Programador", "Web Developer", "3D Modeler"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100; 
const delayAfterTyping = 1500; 

function typeEffect() {
  const typingElement = document.querySelector(".typing-text");
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayAfterTyping); 
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; 
    }
  }

  setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
}

typeEffect();

var all = document.getElementById("all");
var navega = document.getElementById("navega");
var tudao = document.getElementById("tudao");
var mostrar = false;

window.barmostrar = function () {
  mostrar = !mostrar;
  if (mostrar) {
    navega.style.marginLeft = "-10vw";
    navega.style.animationName = "mostrar";
    tudao.style.filter = "blur(2px)";
  } else {
    navega.style.marginLeft = "-100vw";
    navega.style.animationName = "";
    tudao.style.filter = "";
  }
}
window.fechar = function () {
  if (mostrar) {
    barmostrar();
  }
}
window.addEventListener("resize", function (event) {
  if (window.innerWidth > 768 && mostrar) {
    barmostrar();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("div[id]");
  const menuLinks = document.querySelectorAll(".navega a");

  function highlightMenu() {
    let scrollPos = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        menuLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active"); 
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightMenu);
});

const slide = document.querySelectorAll('.slide');
const btnprev = document.getElementById('prev-button');
const btnnxt = document.getElementById('next-button');

let slideativo = 0;

function removeSlide() {
  slide.forEach(item => item.classList.remove('ativar'))
}

function mostrarSlide() {
  slide[slideativo].classList.add('ativar')
}

function avançarSlide() {
  removeSlide()
  if(slideativo === slide.length -1){
    slideativo = 0
  } else{
    slideativo++
  }
  mostrarSlide()
}
function voltarSlide() {
  removeSlide()
  if(slideativo === 0){
    slideativo = slide.length -1
  } else{
    slideativo--
  }
  mostrarSlide()
}

btnnxt.addEventListener('click', () => avançarSlide())
btnprev.addEventListener('click', () => voltarSlide())


const firebaseConfig = {
  apiKey: "AIzaSyDPBGqR2ZCWv3tT8SwHOgNYk0mH8Jw1Iq4",
  authDomain: "meusite-a6805.firebaseapp.com",
  projectId: "meusite-a6805",
  storageBucket: "meusite-a6805.firebasestorage.app",
  messagingSenderId: "997513999341",
  appId: "1:997513999341:web:c5a037271f54f3ddceede4",
  measurementId: "G-0G480FB33B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.getElementById('formul').addEventListener("submit", function(e){
  e.preventDefault()

  if(!this.checkValidity()){
    alert('Preencha todos os campos');
    return
  }

  const data = {
  email: document.querySelector('#email').value,

  nome: document.querySelector('#name').value,

  text: document.querySelector('#text').value
}

addDoc(collection(db, "Mensagens"), data)
.then(() => {
  alert('Mensagem recebida com sucesso, aguarde a resposta');
})
.catch(error => {
  alert('Falha ao enviar a mensagem, por favor tente novamente' + error.message);
})
  
})
