/* =========================================================
   AIKAGUNYA FOUNDATION
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PAGE LOADER
    ====================================================== */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 500);

    });



    /* =====================================================
       HEADER SCROLL
    ====================================================== */

    const header =
        document.getElementById("siteHeader");

    const updateHeader = () => {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();



    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const menuButton =
        document.getElementById(
            "mobileMenuButton"
        );

    const mobileNav =
        document.getElementById(
            "mobileNav"
        );


    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Close mobile menu after navigation */

    mobileNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       IMPACT COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const animateCounter = counter => {

        const target =
            Number(counter.dataset.target);

        if (!Number.isFinite(target)) {
            return;
        }


        const duration = 1500;

        const startTime = performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
             * Ease-out animation
             */

            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            if (target >= 1000) {

                counter.textContent =
                    Math.floor(
                        value / 1000
                    ) + "K";

            } else {

                counter.textContent = value;

            }


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                if (target >= 1000) {

                    counter.textContent =
                        Math.floor(
                            target / 1000
                        ) + "K";

                } else {

                    counter.textContent =
                        target;

                }

            }

        };


        requestAnimationFrame(update);

    };


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const id =
                        entry.target.id;


                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });



    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       IMAGE FALLBACK
       Keeps the design usable if an image is missing.
    ====================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";

                image.parentElement.style.background =
                    "linear-gradient(135deg, #d8d2c7, #aaa59a)";

            }
        );

    });



    /* =====================================================
       SMOOTH ANCHOR OFFSET
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        href === "#" ||
                        !href
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


});