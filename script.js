const card = document.getElementById('inner-card');
const toggle = document.getElementById('toggleSwitch');
const links = document.querySelector('a');

window.addEventListener('DOMContentLoaded', function () {
  const isDark = localStorage.getItem('isDarkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');
    document.querySelector('#toggleSwitch').checked = true;
  }
});

links.addEventListener('click', function (event){
  event.stopPropagation(); // para pag nagclick ka sa anchor tag, di mag transfer/ mapasa yung 'click' event sa parent
});

card.addEventListener('click', function (){
  card.classList.toggle('flip');
});

// localStorage.setItem('isDarkMode', false);
toggle.addEventListener('click', function () {
  const isDark = localStorage.getItem('isDarkMode') === 'true';

  if (isDark) {
    localStorage.setItem('isDarkMode', 'false');
    document.body.classList.remove('dark');
  } else {
    localStorage.setItem('isDarkMode', 'true');
    document.body.classList.add('dark');
  }
});