

//PRELOADER
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    const hasVisited = localStorage.getItem("preloaderShown");

    if (!hasVisited) {
      // First visit – show and fade out after 3.5s
      setTimeout(() => {
        preloader.classList.add("hidden");
        setTimeout(() => {
          preloader.style.display = "none";
          localStorage.setItem("preloaderShown", "true");
        }, 1000);
      }, 3500);
    }
  });
//COOKIES
window.addEventListener('load', function () {
  // Wait 10 seconds before showing the popup
  setTimeout(function () {
    const popup = document.getElementById('cookie-consent');
    const acceptBtn = document.getElementById('accept-cookie');
    const declineBtn = document.getElementById('decline-cookie');

    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      popup.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      popup.classList.add('hidden');
    });

    declineBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      popup.classList.add('hidden');
    });

    // const toggleLink = document.getElementById('toggle-more');
    // const moreText = document.getElementById('more-text');

    // toggleLink.addEventListener('click', function (e) {
    //   e.preventDefault();
    //   const isVisible = moreText.style.display === 'inline';
    //   moreText.style.display = isVisible ? 'none' : 'inline';
    //   toggleLink.textContent = isVisible ? 'Show more' : 'Show less';
    // });
  }, 10000); // 10,000 milliseconds = 10 seconds
});
//MENUS MOBILE
$(".menu-icon span").click(function(){
    $("#navbarMenu").toggleClass("active");
    $(this).toggleClass("fa-bars fa-times");
});


$(document).ready(function () {
  $(".subMenu").click(function (e) {
    e.stopPropagation(); // Prevent event bubbling

    // Close all other submenus and reset arrow rotations
    $(".subMenu_list").not($(this).find(".subMenu_list")).slideUp(400);
    $(".arrow-next img").not($(this).find(".arrow-next img")).css({
      transform: "rotate(-90deg)",
      transition: "0.3s"
    });

    // Toggle the clicked submenu
    $(this).find(".subMenu_list").stop(true, true).slideToggle(400);

    // Toggle rotation for the image inside the arrow-next
    const arrowImg = $(this).find(".arrow-next img");
    const isRotated = arrowImg.hasClass("rotated");

    if (isRotated) {
      arrowImg.removeClass("rotated").css("transform", "rotate(-90deg)");
    } else {
      arrowImg.addClass("rotated").css("transform", "rotate(0deg)");
    }
  });

  // Hide all on document click
  $(document).click(function () {
    $(".subMenu_list").slideUp(400);
    $(".arrow-next img").removeClass("rotated").css("transform", "rotate(-90deg)");
  });
});


$(document).ready(function () {

   const targetTimeUTC = new Date(Date.UTC(2025, 6, 18, 18, 0, 0)); // July 22, 2025 18:00 UTC

  // Step 3: Check every second
  const checkTime = setInterval(function () {
   const nowUTC = new Date();

  if (nowUTC >= targetTimeUTC) {
    $(".subMenu").show();
      clearInterval(checkTime);
  }
  }, 1000);
 });




//CLICK OFF
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

