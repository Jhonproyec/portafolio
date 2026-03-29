window.addEventListener('scroll', function(){
	const menu = document.querySelector('header');
	menu.classList.toggle('cambio', scrollY > 0);
})

//INDICADOR DEL MENÚ
let sections = document.querySelectorAll('section');
let menuItem = document.querySelectorAll('.item-menu');


const functionObserver = entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const itemSection = Array.from(menuItem).find(item => item.dataset.url === entry.target.id)
            itemSection.classList.add('selected')
            for(const item of menuItem){
                if(item != itemSection) item.classList.remove('selected');
            }
        }

    });
};

function initObserver() {
  const sections = document.querySelectorAll('section');

  function updateActiveMenu() {
    const scrollY = window.scrollY;

    let current = null;
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        current = section.id;
      }
    });

    if (!current) return;

    menuItem.forEach(item => {
      item.classList.toggle('selected', item.dataset.url === current);
    });
  }

  window.addEventListener('scroll', updateActiveMenu);
  updateActiveMenu(); // ejecutar al cargar para marcar la sección inicial
}

document.addEventListener('proyectosListos', initObserver);






//MOSTRAR Y OCULTAR MENÚ MOVIL
const menubtn = document.querySelector('.button-menu');
const menu = document.querySelector('.navbar-list');
const itemMenu = document.querySelectorAll('.item-menu');

menubtn.addEventListener('click', function(){
    this.classList.toggle('closeMenu');
    menu.classList.toggle('show');
    menu.classList.toggle('close')
    itemMenu.forEach(item => {
        item.addEventListener('click',function() {
            menu.classList.remove('show');
            menubtn.classList.remove('closeMenu')
        })
    });
})






