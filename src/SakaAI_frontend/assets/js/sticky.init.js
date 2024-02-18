function windowScroll() {
  const navbar = document.getElementById("navbar");
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    navbar.classList.add("nav-sticky");
    navbar.classList.add("small");
    document.getElementById("undefined-sticky-wrapper").classList.add("is-sticky")
    navbar.setAttribute("style", "position: fixed; top: 0px;");
  } else {
    navbar.classList.remove("nav-sticky");
    navbar.classList.remove("small");
    document.getElementById("undefined-sticky-wrapper").classList.remove("is-sticky")
    navbar.removeAttribute( "style");
  }
}

window.addEventListener('scroll', (ev) => {
  ev.preventDefault();
  windowScroll();
})
