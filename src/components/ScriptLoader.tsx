"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function ScriptLoader() {
    useEffect(() => {
        // We need to initialize plugins only after the DOM comprises them
        const initScripts = () => {
            if (typeof window === "undefined" || !(window as any).jQuery) return;
            const $ = (window as any).jQuery;

            // Spinner
            setTimeout(function () {
                if ($("#spinner").length > 0) {
                    $("#spinner").removeClass("show");
                }
            }, 1);

            // WOW.js
            if ((window as any).WOW) {
                new (window as any).WOW().init();
            }

            // Sticky Navbar
            $(window).scroll(function (this: any) {
                if (($(this) as any).scrollTop() > 300) {
                    $(".sticky-top").addClass("shadow-sm").css("top", "0px");
                } else {
                    $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
                }
            });

            // Back to top button
            $(window).scroll(function (this: any) {
                if (($(this) as any).scrollTop() > 300) {
                    $(".back-to-top").fadeIn("slow");
                } else {
                    $(".back-to-top").fadeOut("slow");
                }
            });
            $(".back-to-top").click(function (this: any) {
                $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
                return false;
            });

            // Facts counter
            if ($.fn.counterUp) {
                $('[data-toggle="counter-up"]').counterUp({
                    delay: 10,
                    time: 2000,
                });
            }

            // Header carousel
            if ($.fn.owlCarousel && $(".header-carousel").length) {
                $(".header-carousel").owlCarousel({
                    autoplay: true,
                    smartSpeed: 1500,
                    items: 1,
                    dots: true,
                    loop: true,
                    nav: true,
                    navText: [
                        '<i class="bi bi-chevron-left"></i>',
                        '<i class="bi bi-chevron-right"></i>',
                    ],
                });
            }

            // Testimonials carousel
            if ($.fn.owlCarousel && $(".testimonial-carousel").length) {
                $(".testimonial-carousel").owlCarousel({
                    autoplay: true,
                    smartSpeed: 1000,
                    center: true,
                    dots: false,
                    loop: true,
                    nav: true,
                    navText: [
                        '<i class="bi bi-arrow-left"></i>',
                        '<i class="bi bi-arrow-right"></i>',
                    ],
                    responsive: {
                        0: { items: 1 },
                        768: { items: 2 },
                    },
                });
            }

            // Portfolio isotope
            if ($.fn.isotope && $(".portfolio-container").length) {
                const portfolioIsotope = $(".portfolio-container").isotope({
                    itemSelector: ".portfolio-item",
                    layoutMode: "fitRows",
                });
                $("#portfolio-flters li").on("click", function (this: any) {
                    $("#portfolio-flters li").removeClass("active");
                    $(this).addClass("active");
                    portfolioIsotope.isotope({ filter: $(this).data("filter") });
                });
            }
        };

        // Give React a moment to paint the DOM before querying it with jQuery
        const timer = setTimeout(initScripts, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Script src="/lib/wow/wow.min.js" strategy="lazyOnload" />
            <Script src="/lib/easing/easing.min.js" strategy="lazyOnload" />
            <Script src="/lib/waypoints/waypoints.min.js" strategy="lazyOnload" />
            <Script src="/lib/counterup/counterup.min.js" strategy="lazyOnload" />
            <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="lazyOnload" />
            <Script src="/lib/isotope/isotope.pkgd.min.js" strategy="lazyOnload" />
            <Script src="/lib/lightbox/js/lightbox.min.js" strategy="lazyOnload" />
        </>
    );
}
