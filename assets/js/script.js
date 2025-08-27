(function($) {

	"use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".mobail-menu .open-btn");
        var xbutton = $(".mobail-menu .navbar-toggler");

        openBtn.on("click", function(e) {
            e.stopImmediatePropagation();
            navbar.toggleClass("slideInn");
            xbutton.toggleClass("x-close");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a, .menu-item-has-children > span.dropdown-toggle");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
                $this.toggleClass("rotate");
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();

    $("body").on("click", function() {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function() {
        $('.navigation-holder').removeClass('slideInn');
    });
    $(".menu-close").on("click", function() {
        $('.open-btn').removeClass('x-close');
    });


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    // HERO SLIDER
    var menu = [];
    jQuery('.swiper-slide').each( function(index){
        menu.push( jQuery(this).find('.slide-inner').attr("data-text") );
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-inner").style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }      
            },

            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },

            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-inner").style.transition =
                    speed + "ms";
                }
            }
        }
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });





    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();



            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery();


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-gallery').length) {
            var $grid =  $('.masonry-gallery').masonry({
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    // masonryGridSetting();


      /*------------------------------------------
        = FUNFACT
    -------------------------------------------*/
    if ($(".odometer").length) {
        $('.odometer').appear();
        $(document.body).on('appear', '.odometer', function(e) {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
        });
    }



    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.wpo-site-header .navigation').length) {
        cloneNavForSticyMenu($('.wpo-site-header .navigation'), "sticky-header");
    }

    var lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        var mainMenuTop = $('.wpo-site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;


    }



/*------------------------------------------
        = language
    -------------------------------------------*/
    $(document).ready(function(){
        $('.flag-item').click(function(){
          var flagItem = $(this).html();
          $(this).empty().html($('.flag-button').html());
          $('.flag-button').empty().html(flagItem);
        });
      
        $('.lang-menu').find('ul').addClass('sh');
      
        $('.flag-button,.flag-item').on('click', function(){
          $('.lang-menu').find('ul').toggleClass('sh');
        })
      });

/*------------------------------------------
        = Header search toggle
    -------------------------------------------*/
    if($(".header-search-form-wrapper").length) {
        var searchToggleBtn = $(".search-toggle-btn");
        var searchToggleBtnIcon = $(".search-toggle-btn i");
        var searchContent = $(".header-search-form");
        var body = $("body");

        searchToggleBtn.on("click", function(e) {
            searchContent.toggleClass("header-search-content-toggle");
            searchToggleBtnIcon.toggleClass("fi flaticon-magnifiying-glass fi ti-close");
            e.stopPropagation();
        });

        body.on("click", function() {
            searchContent.removeClass("header-search-content-toggle");
        }).find(searchContent).on("click", function(e) {
            e.stopPropagation();
        });
    }


    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".testimonials-wrapper").length) {
        $(".testimonials-wrapper").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 40,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: false,
            responsive: {
                0 : {
                    items: 1,
                },

                500 : {
                    items: 1,
                },

                768 : {
                    items: 2,
                },

                1200 : {
                    items: 2
                },

                1400 : {
                    items: 3
                },

            }
        });
    }

    /*------------------------------------------
        = Testimonial SLIDER
    -------------------------------------------*/
    if ($(".wpo-service-slide").length) {
        $(".wpo-service-slide").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: false,
            center: true,
            items: 5,
            autoplay: true,
            center: true,
            responsive: {
                0 : {
                    items: 1,
                    nav: false
                },

                500 : {
                    items: 1,
                    nav: false
                },

                768 : {
                    items: 3,
                },

                1200 : {
                    items: 3
                },

                1400 : {
                    items: 5
                },

            }
        });
    }

    /*------------------------------------------
        = wpo-blog-slide 
    -------------------------------------------*/
    if ($(".wpo-blog-slide").length) {
        $(".wpo-blog-slide").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>','<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
            autoplay: true,
            responsive: {
                0 : {
                    items: 1,
                    nav: false
                },

                500 : {
                    items: 1,
                    nav: false
                },

                768 : {
                    items: 2,
                },

                1200 : {
                    items: 3
                },

                1400 : {
                    items: 3
                },

            }
        });
    }
    /*------------------------------------------
       wpo-project-slider
    -------------------------------------------*/
    if ($(".wpo-project-slider").length) {
        $(".wpo-project-slider").owlCarousel({
            autoplay: false,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left" aria-hidden="true"></i>','<i class="fa fa-angle-double-right" aria-hidden="true"></i>'],
            autoplay: true,
            responsive: {
                0 : {
                    items: 1,
                    nav: false
                },

                500 : {
                    items: 2,
                    nav: false,
                    dots:true,
                },

                768 : {
                    items: 2,
                },

                1200 : {
                    items: 3
                },

                1400 : {
                    items: 4
                },

            }
        });
    }

    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0 : {
                    items: 2
                },

                550 : {
                    items: 3
                },

                992 : {
                    items: 4
                },

                1200 : {
                    items: 5
                }
            }
        });
    }




    /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
    if($(".post-slider".length)) {
        $(".post-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop:true,
            nav: true,
            navText: ['<i class="fi ti-arrow-left"></i>','<i class="fi ti-arrow-right"></i>'],
            dots: false,
            items: 1
        });
    }  



     /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 1000;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                zip: "required",
                
                subject: {
                    required: true
                },


            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact Service",
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();  
            
            sortingGallery();

            toggleMobileNavigation();

            smallNavFunctionality();
        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

		if ($(".wpo-site-header").length) {
           stickyMenu( $('.wpo-site-header .navigation'), "sticky-on" );
        }

        toggleBackToTopBtn();

    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        toggleClassForSmallNav();
        //smallNavFunctionality();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));
    });





})(window.jQuery);

// Enhanced Product Categories Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Image loading animation for product category cards
    const productImages = document.querySelectorAll('.wpo-service-section .wpo-service-img img');
    
    productImages.forEach(img => {
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            // Add loading state only if image is not already loaded
            img.style.opacity = '0.8'; // Start with slightly transparent instead of completely invisible
            
            // Handle image load
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.classList.add('loaded');
            });
            
            // Handle image error
            img.addEventListener('error', function() {
                this.style.opacity = '1';
                this.style.filter = 'grayscale(100%)';
                this.style.opacity = '0.5';
                console.warn('Image failed to load:', this.src);
            });
        }
    });
    
    // Smooth scroll for category links
    const categoryLinks = document.querySelectorAll('.wpo-service-section .cta-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Intersection Observer for animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product category cards
    const productCards = document.querySelectorAll('.wpo-service-section .wpo-service-item');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Enhanced hover effects for category cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove glow effect
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Category feature tags animation
    const featureTags = document.querySelectorAll('.wpo-service-section .feature-tag');
    
    featureTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Category icon animation
    const categoryIcons = document.querySelectorAll('.wpo-service-section .category-icon');
    
    categoryIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.wpo-service-section .category-cta .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    }
    
    // Add loading skeleton for images
    function createImageSkeleton() {
        const imageContainers = document.querySelectorAll('.wpo-service-section .wpo-service-img');
        
        imageContainers.forEach(container => {
            const skeleton = document.createElement('div');
            skeleton.className = 'image-skeleton';
            skeleton.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
                border-radius: 24px 24px 0 0;
                z-index: 1;
            `;
            
            container.appendChild(skeleton);
            
            // Remove skeleton when image loads
            const img = container.querySelector('img');
            if (img) {
                img.addEventListener('load', () => {
                    skeleton.remove();
                });
            }
        });
    }
    
    // Add loading animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize image skeletons
    createImageSkeleton();
    
    // Add keyboard navigation support
    productCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.cta-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('.wpo-service-section .wpo-service-img img[loading="lazy"]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced Product Category Cards Functionality
    function enhancedProductCards() {
        const productCards = document.querySelectorAll('.product-category-card');
        
        productCards.forEach(card => {
            // Add loading state on card click
            card.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href && href !== '#') {
                    // Add loading state
                    this.classList.add('loading');
                    
                    // Small delay to show loading animation
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                // Add subtle scale effect
                this.style.transform = 'translateY(-12px) scale(1.02)';
                
                // Add ripple effect to icon
                const icon = this.querySelector('.category-icon');
                if (icon) {
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple-effect';
                    ripple.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 0;
                        height: 0;
                        background: rgba(255,255,255,0.3);
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
                    icon.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            // Add keyboard navigation support
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Add touch feedback for mobile devices
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });

            card.addEventListener('touchend', function() {
                const card = this;
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 150);
            });
        });

        // Add ripple animation keyframes
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            
            .product-category-card.touch-active {
                transform: translateY(-8px) scale(1.01) !important;
                transition: all 0.15s ease !important;
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // Initialize enhanced product cards
    enhancedProductCards();
});
