export function removeSections() {
    const sections = document.querySelectorAll("section[id]");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // ketika 50% section terlihat
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            history.replaceState(null, "", `#${entry.target.id}`);
            }
        });
    }, options);

    sections.forEach((section) => {
        observer.observe(section);
    });

}