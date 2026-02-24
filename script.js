document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get target section ID
            const targetId = item.getAttribute('data-target');

            // Hide all sections with a fade out effect
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });

            // Show target section with a fade in effect
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                // Small delay to ensure the display:block takes effect before adding the animation class
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 10);
            }

            // Smooth scroll to top of main content or window (responsive)
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector('.main-content').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Sur mobile, fermer le menu après la sélection
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar && overlay && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Gestion du menu mobile (Hamburger & Overlay)
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Ajustement dynamique des tooltips pour éviter de déborder de l'écran
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            const tooltipText = tooltip.querySelector('.tooltiptext');
            if (tooltipText) {
                // Reset de la position
                tooltipText.style.left = '50%';
                tooltipText.style.right = 'auto';
                tooltipText.style.transform = 'translateX(-50%)';

                // On attend la frame suivante pour que le navigateur calcule les dimensions
                requestAnimationFrame(() => {
                    const rect = tooltipText.getBoundingClientRect();

                    // Si ça sort par la droite
                    if (rect.right > (window.innerWidth - 15)) {
                        tooltipText.style.left = 'auto';
                        tooltipText.style.right = '0';
                        tooltipText.style.transform = 'none';
                    }
                    // Si ça sort par la gauche
                    if (rect.left < 15) {
                        tooltipText.style.left = '0';
                        tooltipText.style.right = 'auto';
                        tooltipText.style.transform = 'none';
                    }
                });
            }
        });
    });
});
