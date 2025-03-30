// Navbar Configs
const navbar = document.querySelector('#navbar');
window.addEventListener('scroll', ()=>{
    navbar.classList.toggle('scrolling', window.scrollY > 500);
});

const burguer = document.querySelector('#burguer');
const closeMenu = document.querySelector('#close-menu');
const body = document.querySelector('html')
const sidebar = document.querySelector('.navbar-container');
const filterCloseMenu = document.querySelector('.closeMenu');

burguer.addEventListener('click', ()=> {
    sidebar.classList.toggle('open');
    filterCloseMenu.classList.toggle('isClose');
});

filterCloseMenu.addEventListener('click', ()=>{
    sidebar.classList.toggle('open');
    filterCloseMenu.classList.toggle('isClose');
})

closeMenu.addEventListener('click', ()=>{
    sidebar.classList.toggle('open');
    filterCloseMenu.classList.toggle('isClose');
});

if (sidebar.classList == 'open') {
    body.addEventListener('click', () =>{
        sidebar.classList.remove('open');
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
