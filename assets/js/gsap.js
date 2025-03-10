document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".title span", { opacity: 0, y: 20, duration: 1.5, ease: "power3.out" });
    gsap.from(".highlight", { opacity: 0, y: 20, duration: 1.5, delay: 0.5, ease: "power3.out" });
    gsap.from(".secondary", { opacity: 0, y: 20, duration: 1.5, delay: 1, ease: "power3.out" });

    gsap.from(".fade-in", { opacity: 0, y: 20, duration: 1.5, stagger: 0.3, ease: "power3.out", delay: 1.5 });
    
    gsap.from(".citzens", { opacity: 0, scale: 0.5, duration: 1.5, delay: 2, ease: "back.out(1.7)" });
});
