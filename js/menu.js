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

const observer = new IntersectionObserver(functionObserver,{
    root: null, 
    rootMargin: '-5px',
    threshold: 0.3
})

sections.forEach(section => observer.observe(section));







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






