
    // SplitType defaults

    let typeSplit = new SplitType("[split-text]", {
      types: "words, chars",
      tagName: "span",
    })

    // We're installing GSAP through Webflow's Site settings in the Footer code.

    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    gsap.defaults({
      duration: 1.2, // Default duration for all animations
    });

    //####################################################
    // Avoid flash of unstyled content.
    // The opacity is set to 0 on the Webflow Website's Custom Code section at the Head tag.
    gsap.set("[split-text]", { opacity: 1 });
    gsap.set("[reveal]", { opacity: 1, filter: "blur(0px)" });
    //####################################################

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
      // Reset tl when scroll out of view past bottom of screen
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 90%",
        onEnter: () => timeline.play()
      });
    }

    $("[words-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".word"), {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "Sine.easeOut",
        stagger: { amount: 0.5 }
      });
      createScrollTrigger($(this), tl);
    });

    $("[lines-slide-up]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".line"), {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "Sine.easeOut",
        stagger: { amount: 0.5 }
      });
      createScrollTrigger($(this), tl);
    });

    $("[letters-fade-in-random]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".char"), {
        opacity: 0,
        duration: 0.25,
        ease: "power1.out",
        stagger: { amount: 0.4, from: "random" }
      });
      createScrollTrigger($(this), tl);
    });

    $("[scrub-each-word]").each(function (index) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 90%",
          end: "top center",
          scrub: true
        }
      });
      tl.from($(this).find(".word"), {
        opacity: 0.2,
        duration: 0.2,
        ease: "power1.out",
        stagger: { each: 0.4 }
      });
    });

    $("[reveal]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this), {
        opacity: 0,
        duration: 0.5,
        filter: "blur(10px)",
        ease: "Sine.easeOut",
      });
      createScrollTrigger($(this), tl);
    });

    $("[reveal-clip]").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.fromTo($(this), {
        opacity: 0,
        duration: 0.5,
        ease: "Sine.easeOut",
        clipPath: "polygon(0 0, 100 % 0, 100 % 100 % , 0 100 % )",
      }, {
        opacity: 1,
        clipPath: "polygon(0 50 % , 50 % 0, 50 % 50 % , 0 50 % )",
      });
      createScrollTrigger($(this), tl);
    });

    function setupVideoPlayOnScroll() {
      // Select all video elements
      const videos = document.querySelectorAll('video[video-gsap]');

      if (videos) {
        videos.forEach(video => {
          // Create a ScrollTrigger for each video
          ScrollTrigger.create({
            trigger: video,
            start: "top bottom", // Trigger when the top of the video reaches 90% of the viewport height
            onEnter: () => {
              if (video.paused) {
                video.play();
              }
            },
            onLeave: () => {
              if (!video.paused) {
                video.pause();
              }
            },
            onEnterBack: () => {
              if (video.paused) {
                video.play();
              }
            },
            onLeaveBack: () => {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        });
      }
    }

    setupVideoPlayOnScroll();

    // On touch/click, initiate this function
    $('body').on('click touchstart', function () {
      var videoElements = document.querySelectorAll(
        'video[video-gsap]'); // selects all videos with the attribute video-gsap

      // check if this function is working
      // console.log(videoElements);

      // for each video, if paused, play it.
      videoElements.forEach(function (video) {
        if (video.paused) {
          video.play();
        }
      });
    });


    // ##############################
    // MENU BUTTON ANIMATION
    // ##############################


    let isOpen = false;

    let menuLetters = $(".menu-text").find(".char");
    let closeLetters = $(".close-text").find(".char");

    gsap.set(closeLetters, { opacity: 0 })

    $(".nav_menu-btn-special").click(function () {
      let tl = gsap.timeline();

      if (!isOpen) {

        $("body").addClass("u-overflow-hidden");
        // console.log(isOpen);
        $(".nav_menu-btn-special").addClass("closeBtn");

        // Scramble text to "Close"
        tl.fromTo(menuLetters, { opacity: 1, }, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          stagger: { amount: 0.25, from: "random" }
        }).fromTo(closeLetters, { opacity: 0, }, {
          opacity: 1,
          duration: 0.25,
          ease: "power1.out",
          stagger: { amount: 0.25, from: "random" }
        }, "<")

      } else {

        $("body").removeClass("u-overflow-hidden");
        $(".nav_menu-btn-special").removeClass("closeBtn");
        // console.log(isOpen);

        // Scramble text to "Menu"
        tl.fromTo(closeLetters, { opacity: 1, }, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          stagger: { amount: 0.25, from: "random" }
        }).fromTo(menuLetters, { opacity: 0, }, {
          opacity: 1,
          duration: 0.25,
          ease: "power1.out",
          stagger: { amount: 0.25, from: "random" }
        }, "<")

      }

      isOpen = !isOpen;
    });


    // ##############################
    // BRAND COMPONENT
    // ##############################

    let brandComponent = $(".brand-component");
    let toastComponent = document.querySelector(".component_toast");
    // let toastText = document.querySelector(".component_toast-text").textContent;

    if (brandComponent) {

      brandComponent.on("contextmenu", function (e) {
        e.preventDefault();

        console.log(
          "Are you looking for some BRANDING? WELL YOU'RE IN LUCK."
        );

        let menu = $(this).find(".brand-component_context-menu");
        // console.log(menu);
        // menu.css({ "display": "flex", "left": e.pageX, "top": e.pageY });
        menu.css({ "display": "flex", "left": "0px", "top": "40px" });
        // return false;
      });

      $(document).click(function () {
        $(".brand-component_context-menu").hide();
      });

      function showToast(message) {

        if (toastComponent) {
          toastComponent.classList.add("u-show");
          setTimeout(function () {
            toastComponent.classList.remove("u-show");
          }, 3000); // Show toast for 3 seconds
        }

      }

      function copyToClipboard(text) {
        var tempInput = document.createElement("input");
        tempInput.style = "position: absolute; left: -10000px; top: -9999px";
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      let fullLogoSVG =
        `<svg xmlns="http://www.w3.org/2000/svg" width="174" height="36" viewBox="0 0 174 36" fill="none">
	<path d="M17.921 2C13.3234 2 2 13.3792 2 17.9999C2 22.6206 13.3234 34 17.921 34C22.5186 34 33.8422 22.6204 33.8422 17.9999C33.8422 13.3794 22.5188 2 17.921 2ZM15.44 27.1492C13.5012 26.6183 8.28864 17.455 8.81704 15.5066C9.34544 13.5581 18.4634 8.31979 20.4021 8.8508C22.341 9.38173 27.5535 18.5449 27.0252 20.4934C26.4968 22.4418 17.3787 27.6802 15.44 27.1492Z" fill="#836EF9" />
	<path d="M57.2952 21.5466V21.5407L48.2488 4.77274C48.0707 4.44268 47.5786 4.52173 47.5117 4.89112L43.0065 29.7945C42.9623 30.0385 43.1489 30.2632 43.3957 30.2632H46.8814C47.0727 30.2632 47.2365 30.1257 47.2707 29.9366L49.8943 15.4059L56.9464 28.9168C57.0945 29.2006 57.4989 29.2006 57.6471 28.9168L64.6991 15.4059L67.3227 29.9366C67.3569 30.1257 67.5207 30.2632 67.712 30.2632H71.1977C71.4445 30.2632 71.6311 30.0385 71.5869 29.7945L67.0817 4.89112C67.0149 4.52173 66.5227 4.44268 66.3446 4.77274L57.2952 21.5466Z" fill="black" />
	<path d="M86.2443 5.24121C79.0685 5.24121 73.4473 10.8451 73.4473 18.0005C73.4473 25.1559 79.0685 30.7629 86.2443 30.7629C93.4016 30.7629 99.0088 25.1574 99.0088 18.0005C99.0088 10.8436 93.4016 5.24121 86.2443 5.24121ZM86.2443 26.4906C81.5649 26.4906 77.8986 22.7609 77.8986 18.0005C77.8986 13.2401 81.5649 9.51353 86.2443 9.51353C90.9052 9.51353 94.5575 13.2417 94.5575 18.0005C94.5575 22.7593 90.9052 26.4906 86.2443 26.4906Z" fill="black" />
	<path d="M118.732 20.928L103.726 4.69711C103.482 4.43241 103.041 4.60642 103.041 4.96772V29.8657C103.041 30.0852 103.218 30.2632 103.437 30.2632H107.064C107.283 30.2632 107.46 30.0852 107.46 29.8657V15.0466L122.432 31.3082C122.676 31.5736 123.118 31.3998 123.118 31.0381V6.14014C123.118 5.92056 122.941 5.74255 122.722 5.74255H119.127C118.909 5.74255 118.732 5.92056 118.732 6.14014V20.928Z" fill="black" />
	<path d="M126.964 30.2628H130.86C131.014 30.2628 131.154 30.1727 131.219 30.0319L134.137 23.6813H143.468L146.32 30.0289C146.384 30.1713 146.525 30.2628 146.68 30.2628H150.907C151.198 30.2628 151.39 29.9563 151.263 29.6923L139.292 4.79589C139.148 4.49642 138.723 4.49642 138.579 4.79589L126.608 29.6923C126.481 29.9563 126.673 30.2628 126.964 30.2628ZM135.966 19.7411L138.866 13.4168L141.711 19.7411H135.966Z" fill="black" />
	<path d="M160.717 5.74219H154.732C154.513 5.74219 154.336 5.9202 154.336 6.13977V29.8653C154.336 30.0849 154.513 30.2629 154.732 30.2629H160.717C168.138 30.2629 172.75 25.5649 172.75 18.001C172.75 10.4371 168.138 5.74219 160.717 5.74219ZM160.717 26.056H158.787V9.91628H160.717C165.535 9.91628 168.298 12.8633 168.298 18.001C168.298 23.12 165.535 26.056 160.717 26.056Z" fill="black" />
</svg>`

      let logoMarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
	<path d="M15.921 0C11.3234 0 0 11.3792 0 15.9999C0 20.6206 11.3234 32 15.921 32C20.5186 32 31.8422 20.6204 31.8422 15.9999C31.8422 11.3794 20.5188 0 15.921 0ZM13.44 25.1492C11.5012 24.6183 6.28864 15.455 6.81704 13.5066C7.34544 11.5581 16.4634 6.31979 18.4021 6.8508C20.341 7.38173 25.5535 16.5449 25.0252 18.4934C24.4968 20.4418 15.3787 25.6802 13.44 25.1492Z" fill="#836EF9" />
</svg>`

      $(".copy-horizontal-logo").click(function () {
        console.log("You've copied the full logo.");
        copyToClipboard(fullLogoSVG);
        showToast("Horizontal logo copied to clipboard.");
      });

      $(".copy-logo-mark").click(function () {
        console.log("You've copied the logo mark.");
        copyToClipboard(logoMarkSVG);
        showToast("Logo mark copied to clipboard.");
      });

    }

    // ####################
    // PARALLAX CTA SECTION
    // ####################

    let mediumCTAWrap = document.querySelector(".medium_cta-wrap");

    if (mediumCTAWrap) {
      gsap.timeline({
        scrollTrigger: {
          trigger: mediumCTAWrap,
          start: "top 90%",
          end: "bottom top",
          scrub: 1
        }
      })
        .from(".cta_decorative-1", { y: 100, ease: "none" }) // Moves slower
        .from(".cta_decorative-2", { y: 200, ease: "none" }, "<") // Moves faster
        .from(".cta_decorative-3", { y: 100, ease: "none" }, "<"); // Moves slower

    }

    // ////////////////////////////////
    // BIG CTA ANIMATION MAGNET BUTTON
    // ////////////////////////////////

    let bigCTA = document.querySelector(".big_cta_section_wrap");

    if (bigCTA) {

      function GsapMagneticBtn() {

        gsap.matchMedia().add("(min-width: 768px)", () => {
          let bigBtn = document.querySelector(".link_button_special");

          if (bigBtn) {

            const xTo = gsap.quickTo(bigBtn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
            const yTo = gsap.quickTo(bigBtn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

            const mouseMove = (e) => {
              const { clientX, clientY } = e;
              const { width, height, left, top } = bigBtn.getBoundingClientRect();
              const x = clientX - (left + width / 2);
              const y = clientY - (top + height / 2);
              xTo(x);
              yTo(y);
            }

            const mouseLeave = (e) => {
              xTo(0);
              yTo(0);
            }

            bigBtn.addEventListener("mousemove", mouseMove);
            bigBtn.addEventListener("mouseleave", mouseLeave);
          }
        })
      }

      GsapMagneticBtn();

      gsap.fromTo(".big_cta_section_wrap", {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
      }, {
        borderTopLeftRadius: "12vw",
        borderTopRightRadius: "12vw",
        duration: 1,
        ease: "Sine.easeOut",
        scrollTrigger: {
          trigger: ".big_cta_section_wrap",
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      })

    }


    ////////////////////////////////
    // HOME PAGE LOADER
    ////////////////////////////////

    // ######################################################################

    const loadingScreen = document.querySelector(".page_transition");
    const content = document.querySelector(".page_main");

    // Hide content initially

    if (loadingScreen) {

      // Function to check if all resources are loaded
      function checkResourcesLoaded() {
        const images = document.getElementsByTagName('img');
        const videos = document.getElementsByTagName('video');
        const homeHeroVideo = document.querySelector(".home-hero-video");

        const heroImages = document.querySelector(".hero-section img");
        const heroVideos = document.querySelector(".hero-section video");
        const loadingText = document.querySelector(".page_transition-content");
        const dots = document.querySelectorAll('.loading-dot');
        const dotTL = gsap.timeline({ repeat: -1 });

        gsap.set(dots, { opacity: 0 });

        dotTL.to(dots, {
          opacity: 1,
          duration: 0.2,
          stagger: 0.2,
          ease: "power2.inOut"
        })
          .to(dots, {
            opacity: 0,
            duration: 0.2,
            stagger: 0.2,
            ease: "power2.inOut"
          }, "+=0.2");

        let allLoaded = true;

        for (let i = 0; i < heroImages.length; i++) {
          if (!images[i].complete) {
            allLoaded = false;
            break;
          }
        }

        for (let i = 0; i < heroVideos.length; i++) {
          if (!videos[i].readyState >= 4) {
            allLoaded = false;
            break;
          }
        }

        console.log("not loaded");

        if (allLoaded) {
          let hideLoaderTL = gsap.timeline({ delay: 3 });
          hideLoaderTL
            .to(".page_transition_title-container", {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power4.inOut"
            })
            .to(loadingScreen, {
              borderBottomLeftRadius: "50%",
              borderBottomRightRadius: "50%",
              duration: 1,
              ease: "expo.inOut"
            })
            .to(loadingScreen, { duration: 1.5, y: "-150vh", ease: "expo.inOut" }, "<")
            .to(loadingScreen, {
              autoAlpha: 0,
              duration: 0.15,
              onComplete: () => {
                loadingScreen.style.pointerEvents = "none";
                homeHeroVideo.play();
              },
            }, "2");

          console.log("Everything is loaded");
        } else {
          setTimeout(checkResourcesLoaded, 100);
        }
      }

      // Start checking if resources are loaded
      checkResourcesLoaded();
    }

    //console.clear();
    // ######################################################################

    ////////////////////////////////
    // HOME PAGE
    ////////////////////////////////

    let home_heroTL = gsap.timeline({ paused: true });

    // let homePage = document.querySelector(".home_hero_wrap");
    let homePage = document.querySelector(".home-alt_hero_wrap");

    if (homePage) {

      gsap.utils.toArray(".g_eyebrow_wrap").forEach(function (elem) {
        gsap.fromTo(elem, {
          autoAlpha: 0,
          duration: 1,
          scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }, {
          autoAlpha: 1,
          delay: 0.25,
        });
      });

      ////////////////////////////////
      // Hero Section Animations
      ////////////////////////////////

      gsap.to(".home_scroll-cta", {
        y: -10, // Move up by 20 pixels
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse on each iteration
        ease: "power1.inOut", // Easing function
        duration: 1 // Duration of one iteration
      });

      gsap.fromTo(".home_scroll-cta", {
        opacity: 0.3,
      }, {
        opacity: 0,
        scrollTrigger: {
          trigger: ".home_scroll-cta",
          start: "top center",
          toggleActions: "play none none none",
          // markers: true // Remove this line in production to hide the markers
        }
      });

      $(".home-alt_hero_wrap button").each(function () {
        gsap.set($(this), { autoAlpha: 0 });
      });

      ////////////////////////////////
      // Featured Bento Box Animations
      ////////////////////////////////

      gsap.fromTo(".feature_graphic-2-wrapper .tps", {
        innerText: "0",
      }, {
        scrollTrigger: {
          trigger: ".feature_graphic-2-wrapper .tps",
          start: "top 90%",
          // markers: true,
        },
        innerText: "10000",
        scale: 1.5,
        duration: 1.25,
        ease: "expo.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          // Format the number with comma when it reaches 1000
          const value = Math.floor(this.targets()[0].innerText);
          this.targets()[0].innerText = value >= 1000 ? value.toLocaleString() : value;
        }
      })

      gsap.fromTo(".feature_graphic-3-wrapper .gas-fee", {
        innerText: "1000",
      }, {
        scrollTrigger: {
          trigger: ".feature_graphic-3-wrapper .gas-fee",
          start: "top 87%",
          // markers: true,
        },
        innerText: "0",
        duration: 1.25,
        ease: "expo.out",
        snap: { innerText: 1 },
        onUpdate: function () {
          // Format the number with comma when it reaches 1000
          const value = Math.floor(this.targets()[0].innerText);
          this.targets()[0].innerText = value >= 1000 ? value.toLocaleString() : value;
        }
      })

      /*
        gsap.fromTo(".feature_graphic-4-wrapper .block-time", {
          innerText: "12",
        }, {
          scrollTrigger: {
            trigger: ".feature_graphic-4-wrapper .block-time",
            start: "top 87%",
            // markers: true,
          },
          innerText: "0.5",
          duration: 1.25,
          ease: "expo.out",
          snap: { innerText: 1 },
          onUpdate: function () {
            // Format the number with comma when it reaches 1000
            const value = Math.floor(this.targets()[0].innerText);
            this.targets()[0].innerText = value >= 1000 ? value.toLocaleString() : value;
          }
        });
        
        */
      gsap.fromTo(".feature_graphic-4-wrapper .block-time",
        {
          innerHTML: "12"
        },
        {
          scrollTrigger: {
            trigger: ".feature_graphic-4-wrapper .block-time",
            start: "top 87%",
            // markers: true,
          },
          innerHTML: "0.5",
          duration: 1.25,
          ease: "expo.out",
          // Remove the snap option to allow decimal values
          onUpdate: function () {
            // Get the current value during the tween
            const value = parseFloat(this.targets()[0].innerHTML);

            // Format appropriately (handle both whole numbers and decimals)
            if (value >= 1000) {
              // For large numbers, use commas
              this.targets()[0].innerHTML = Math.floor(value).toLocaleString();
            } else if (value === 0.5) {
              // Explicitly set 0.5 at the end
              this.targets()[0].innerHTML = "0.5";
            } else if (Number.isInteger(value)) {
              // For integers, show without decimal
              this.targets()[0].innerHTML = value;
            } else {
              // For other decimals during animation, show one decimal place
              this.targets()[0].innerHTML = value.toFixed(1);
            }
          }
        }
      );

      let featuresWrap = document.querySelector(".features_wrap");

      if (featuresWrap) {
        gsap.timeline({
          scrollTrigger: {
            trigger: featuresWrap,
            start: "top 90%",
            end: "bottom top",
            scrub: 1
          }
        })
          .from(".features_decorative-1", { y: "-30%", ease: "none" }) // Moves slower
          .from(".features_decorative-2", { y: "50%", ease: "none" }, "<") // Moves faster

      }

    }
