function windowScroll() {
    const navbar = document.getElementById("navbar");
    if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
    ) {
        navbar.classList.add("nav-sticky");
    } else {
        navbar.classList.remove("nav-sticky");
    }

}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    windowScroll();
});

var scroll = new SmoothScroll('#navbar-navlist a', {
    speed: 400,
    offset: 70
});
