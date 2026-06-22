// Add interactivity here as we build out the sections
document.addEventListener("DOMContentLoaded", () => {
    console.log("AIME Landing Page Scripts Loaded");
    
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');

    if (mobileBtn && navContainer) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navContainer.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-container a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navContainer.classList.remove('active');
            });
        });
    }
});
