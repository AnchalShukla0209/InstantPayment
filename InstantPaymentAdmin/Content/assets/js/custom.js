

(function () {
    "use strict";

    /* page loader */

    

    //window.addEventListener("load", hideLoader);
    /* page loader */


    /* tooltip */
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    /* popover  */
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    //switcher color pickers
    const pickrContainerPrimary = document.querySelector('.pickr-container-primary');
    const themeContainerPrimary = document.querySelector('.theme-container-primary');
    const pickrContainerBackground = document.querySelector('.pickr-container-background');
    const themeContainerBackground = document.querySelector('.theme-container-background');

    /* for theme primary */
    const nanoThemes = [
        [
            'nano',
            {

                defaultRepresentation: 'RGB',
                components: {
                    preview: true,
                    opacity: false,
                    hue: true,

                    interaction: {
                        hex: false,
                        rgba: true,
                        hsva: false,
                        input: true,
                        clear: false,
                        save: false
                    }
                }
            }
        ]
    ];
    const nanoButtons = [];
    let nanoPickr = null;
    for (const [theme, config] of nanoThemes) {
        const button = document.createElement('button');
        button.innerHTML = theme;
        nanoButtons.push(button);

        button.addEventListener('click', () => {
            const el = document.createElement('p');
            pickrContainerPrimary.appendChild(el);

            /* Delete previous instance */
            if (nanoPickr) {
                nanoPickr.destroyAndRemove();
            }

            /* Apply active class */
            for (const btn of nanoButtons) {
                btn.classList[btn === button ? 'add' : 'remove']('active');
            }

            /* Create fresh instance */
            nanoPickr = new Pickr(Object.assign({
                el,
                theme,
                default: '#8e54e9'
            }, config));

            /* Set events */
            nanoPickr.on('changestop', (source, instance) => {
                let color = instance.getColor().toRGBA();
                let html = document.querySelector('html');
                html.style.setProperty('--primary-rgb', `${Math.floor(color[0])}, ${Math.floor(color[1])}, ${Math.floor(color[2])}`);
                /* theme color picker */
                localStorage.setItem('primaryRGB', `${Math.floor(color[0])}, ${Math.floor(color[1])}, ${Math.floor(color[2])}`);
                updateColors();
            });
        });

        themeContainerPrimary.appendChild(button);
    }
    nanoButtons[0].click();
    /* for theme primary */

    /* for theme background */
    const nanoThemes1 = [
        [
            'nano',
            {

                defaultRepresentation: 'RGB',
                components: {
                    preview: true,
                    opacity: false,
                    hue: true,

                    interaction: {
                        hex: false,
                        rgba: true,
                        hsva: false,
                        input: true,
                        clear: false,
                        save: false
                    }
                }
            }
        ]
    ];
    const nanoButtons1 = [];
    let nanoPickr1 = null;
    for (const [theme, config] of nanoThemes) {
        const button = document.createElement('button');
        button.innerHTML = theme;
        nanoButtons1.push(button);

        button.addEventListener('click', () => {
            const el = document.createElement('p');
            pickrContainerBackground.appendChild(el);

            /* Delete previous instance */
            if (nanoPickr1) {
                nanoPickr1.destroyAndRemove();
            }

            /* Apply active class */
            for (const btn of nanoButtons) {
                btn.classList[btn === button ? 'add' : 'remove']('active');
            }

            /* Create fresh instance */
            nanoPickr1 = new Pickr(Object.assign({
                el,
                theme,
                default: '#8e54e9'
            }, config));

            /* Set events */
            nanoPickr1.on('changestop', (source, instance) => {
                let color = instance.getColor().toRGBA();
                let html = document.querySelector('html');
                html.style.setProperty('--body-bg-rgb', `${color[0]}, ${color[1]}, ${color[2]}`);
                html.style.setProperty('--body-bg-rgb2', `${color[0] + 14}, ${color[1] + 14}, ${color[2] + 14}`);
                document.querySelector('html').style.setProperty('--light-rgb', `${color[0] + 14}, ${color[1] + 14}, ${color[2] + 14}`);
                document.querySelector('html').style.setProperty('--form-control-bg', `rgb(${color[0] + 14}, ${color[1] + 14}, ${color[2] + 14})`);
                localStorage.removeItem("bgtheme");
                updateColors();
                html.setAttribute('data-theme-mode', 'dark');
                html.setAttribute('data-menu-styles', 'dark');
                html.setAttribute('data-header-styles', 'gradient');
                html.removeAttribute("data-default-header-styles");
                document.querySelector('#switcher-dark-theme').checked = true;
                localStorage.setItem('bodyBgRGB', `${color[0]}, ${color[1]}, ${color[2]}`);
                localStorage.setItem('bodyBgRGB2',`${color[0] + 14}, ${color[1] + 14}, ${color[2] + 14}`);
                localStorage.setItem('bodylightRGB', `${color[0] + 14}, ${color[1] + 14}, ${color[2] + 14}`);
            });
        });
        themeContainerBackground.appendChild(button);
    }
    nanoButtons1[0].click();
    /* for theme background */

    /* header theme toggle */
    function toggleTheme() {
        let html = document.querySelector('html');
        if (html.getAttribute('data-theme-mode') === "dark") {
            html.setAttribute('data-theme-mode', 'light');
            html.setAttribute('data-header-styles', 'gradient');
            html.setAttribute('data-menu-styles', 'light');
            html.removeAttribute('data-bg-theme');
            html.removeAttribute('data-default-header-styles');
            // html.removeAttribute('style');
            document.querySelector('#switcher-light-theme').checked = true;
            document.querySelector('#switcher-menu-light').checked = true;
            document.querySelector('html').style.removeProperty('--body-bg-rgb', localStorage.bodyBgRGB);
            document.querySelector('html').style.removeProperty('--body-bg-rgb2', localStorage.bodyBgRGB2);
            checkOptions();
            document.querySelector('#switcher-header-gradient').checked = true;
            document.querySelector('#switcher-menu-light').checked = true;
            document.querySelector('#switcher-light-theme').checked = true;
            document.querySelector("#switcher-background4").checked = false;
            document.querySelector("#switcher-background3").checked = false;
            document.querySelector("#switcher-background2").checked = false;
            document.querySelector("#switcher-background1").checked = false;
            document.querySelector("#switcher-background").checked = false;
            localStorage.removeItem("aziradarktheme");
            localStorage.removeItem("aziraMenu");
            localStorage.removeItem("aziraHeader");
            localStorage.removeItem("aziraDefaultHeader");
            localStorage.removeItem("bodylightRGB");
            localStorage.removeItem("bodyBgRGB");
            if (localStorage.getItem("aziralayout") == "horizontal") {
                html.setAttribute("data-menu-styles", "light");
            }
            html.setAttribute("data-header-styles", "gradient");
            html.style.removeProperty('--light-rgb');
            html.style.removeProperty('--form-control-bg');
            html.style.removeProperty('--input-border');

        } else {
            html.setAttribute('data-theme-mode', 'dark');
            html.setAttribute('data-header-styles', 'gradient');
            html.setAttribute('data-menu-styles', 'dark');
            document.querySelector('#switcher-dark-theme').checked = true;
            document.querySelector('#switcher-menu-dark').checked = true;
            document.querySelector('#switcher-header-gradient').checked = true;
            checkOptions();
            document.querySelector('#switcher-menu-dark').checked = true;
            document.querySelector('#switcher-header-dark').checked = true;
            document.querySelector('#switcher-dark-theme').checked = true;
            document.querySelector("#switcher-background4").checked = false
            document.querySelector("#switcher-background3").checked = false
            document.querySelector("#switcher-background2").checked = false
            document.querySelector("#switcher-background1").checked = false
            document.querySelector("#switcher-background").checked = false
            html.removeAttribute('data-default-header-styles');
            localStorage.setItem("aziradarktheme", "true");
            localStorage.setItem("aziraMenu", "dark");
            localStorage.setItem("aziraHeader", "gradient");
            localStorage.removeItem("aziraDefaultHeader");
            localStorage.removeItem("bodylightRGB");
            localStorage.removeItem("bodyBgRGB");
            if (localStorage.getItem("aziralayout") == "horizontal") {
                html.setAttribute("data-menu-styles", "dark");
            }
        }
    }
    let layoutSetting = document.querySelector(".layout-setting")
    layoutSetting.addEventListener("click", toggleTheme);
    /* header theme toggle */

    /* Choices JS */

    /* Choices JS */

    /* footer year */
    document.getElementById("year").innerHTML = new Date().getFullYear();
    /* footer year */

    /* node waves */
    Waves.attach('.btn-wave', ['waves-light']);
    Waves.init();
    /* node waves */

    /* card with close button */
    let DIV_CARD = '.card';
    let cardRemoveBtn = document.querySelectorAll('[data-bs-toggle="card-remove"]');
    cardRemoveBtn.forEach(ele => {
        ele.addEventListener('click', function (e) {
            e.preventDefault();
            let $this = this;
            let card = $this.closest(DIV_CARD);
            card.remove();
            return false;
        })
    })
    /* card with close button */

    /* card with fullscreen */
    let cardFullscreenBtn = document.querySelectorAll('[data-bs-toggle="card-fullscreen"]');
    cardFullscreenBtn.forEach(ele => {
        ele.addEventListener('click', function (e) {
            let $this = this;
            let card = $this.closest(DIV_CARD);
            card.classList.toggle('card-fullscreen');
            card.classList.remove('card-collapsed');
            e.preventDefault();
            return false;
        });
    });
    /* card with fullscreen */

    /* count-up */
    var i = 1
    setInterval(() => {
        document.querySelectorAll(".count-up").forEach((ele) => {
            if (ele.getAttribute("data-count") >= i) {
                i = i + 1
                ele.innerText = i
            }
        })
    }, 10);
    /* count-up */

    /* back to top */
    const scrollToTop = document.querySelector(".scrollToTop");
    const $rootElement = document.documentElement;
    const $body = document.body;
    window.onscroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const clientHt = $rootElement.scrollHeight - $rootElement.clientHeight;
        if (window.scrollY > 100) {
            scrollToTop.style.display = "flex";
        } else {
            scrollToTop.style.display = "none";
        }
    };
    scrollToTop.onclick = () => {
        window.scrollTo(0, 0);
    };
    /* back to top */

    

    

})();

/* full screen */
var elem = document.documentElement;
function openFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    requestFullscreen();
  } else {
    exitFullscreen();
  }
}
function requestFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
// Listen for fullscreen change event
document.addEventListener("fullscreenchange", handleFullscreenChange);
function handleFullscreenChange() {
  let open = document.querySelector(".full-screen-open");
  let close = document.querySelector(".full-screen-close");

  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    // Update icon for fullscreen mode
    close.classList.add("d-block");
    close.classList.remove("d-none");
    open.classList.add("d-none");
  } else {
    // Update icon for non-fullscreen mode
    close.classList.remove("d-block");
    open.classList.remove("d-none");
    close.classList.add("d-none");
    open.classList.add("d-block");
  }
}
/* full screen */

/* toggle switches */
let customSwitch = document.querySelectorAll('.toggle');
customSwitch.forEach(e => e.addEventListener('click', () => {
    e.classList.toggle("on");
}));
/* toggle switches */

/* header dropdown close button */

/* for cart dropdown */
const headerbtn = document.querySelectorAll('.dropdown-item-close');
headerbtn.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        button.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
        document.getElementById("cart-data").innerText = `${document.querySelectorAll('.dropdown-item-close').length} Items`;
        document.getElementById("cart-icon-badge").innerText = `${document.querySelectorAll('.dropdown-item-close').length}`;
        if (document.querySelectorAll('.dropdown-item-close').length == 0) {
            let elementHide = document.querySelector(".empty-header-item")
            let elementShow = document.querySelector(".empty-item")
            elementHide.classList.add("d-none")
            elementShow.classList.remove("d-none")
        }
    });
});
/* for cart dropdown */

/* for notifications dropdown */
const headerbtn1 = document.querySelectorAll('.dropdown-item-close1');
headerbtn1.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        button.parentNode.parentNode.parentNode.parentNode.remove();
        document.getElementById("notifiation-data").innerText = `${document.querySelectorAll('.dropdown-item-close1').length} Unread`;
        document.getElementById("notification-icon-badge").innerText = `${document.querySelectorAll('.dropdown-item-close1').length}`;
        if (document.querySelectorAll('.dropdown-item-close1').length == 0) {
            let elementHide1 = document.querySelector(".empty-header-item1")
            let elementShow1 = document.querySelector(".empty-item1")
            elementHide1.classList.add("d-none")
            elementShow1.classList.remove("d-none")
        }
    });
});
    /* for notifications dropdown */

    window.onpopstate = ()=>{
        console.log("Working onpopstate");
    }

    window.onload = ()=>{
        setTimeout(() => {
            if(!localStorage.bodylightRGB){
                document.querySelectorAll('[name="theme-background"]').forEach((ele)=>{
                    ele.checked = false
                })
            }
            if(!localStorage.primaryRGB){
                document.querySelectorAll('[name="theme-primary"]').forEach((ele)=>{
                    ele.checked = false
                })
            }
            if(!localStorage.aziraMenu){
                document.querySelectorAll('[name="menu-colors"]').forEach((ele)=>{
                    ele.checked = false
                })
                document.querySelector("#switcher-menu-light").checked=true
            }
         
            if(!localStorage.aziraHeader){
                document.querySelectorAll('[name="header-colors"]').forEach((ele)=>{
                    ele.checked = false
                })
                document.querySelector("#switcher-header-gradient").checked=true
            }
        }, 1000);
    }


