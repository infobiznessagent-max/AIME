// About Page – scroll-reveal animations
document.addEventListener("DOMContentLoaded", () => {
    console.log("AIME About Page Scripts Loaded");

    // -----------------------------------------------
    //  Scroll Reveal: sections fade + slide up on view
    // -----------------------------------------------
    const revealTargets = [
        ".about-intro",
        ".about-vm-card",
        ".about-leadership",
        ".about-programs",
        ".about-partnerships",
        ".about-blueedge",
        ".about-landmark",
    ];

    // Tag each target element
    revealTargets.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.classList.add("reveal-section");
        });
    });

    // Stagger child containers
    const staggerTargets = [
        ".about-programs-tiles",
        ".about-partnerships-tags",
        ".about-leadership-values",
        ".about-blueedge-features",
    ];
    staggerTargets.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.classList.add("reveal-children");
        });
    });

    // Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target); // animate only once
            }
        });
    }, observerOptions);

    document
        .querySelectorAll(".reveal-section, .reveal-children")
        .forEach((el) => revealObserver.observe(el));

    // -----------------------------------------------
    //  Parallax-lite: subtle hero image shift on scroll
    // -----------------------------------------------
    const heroImage = document.querySelector(".about-hero-image img");
    if (heroImage) {
        let ticking = false;
        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Only apply in the hero zone (first 1000px of scroll)
                    if (scrollY < 1000) {
                        heroImage.style.transform = `translateY(${scrollY * 0.18}px) scale(1.05)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});
