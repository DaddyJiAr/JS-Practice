const card = document.getElementById('inner-card');
const links = document.querySelector('a');

links.addEventListener('click', function (event){
  event.stopPropagation(); // para pag nagclick ka sa anchor tag, di mag transfer/ mapasa yung 'click' event sa parent
});

card.addEventListener('click', function (){
  card.classList.toggle('flip');
});