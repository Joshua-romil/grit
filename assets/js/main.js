/*
Theme Name: Lana
Description: Creative Coming Soon Template
Author: Erilisdesign
Theme URI: https://preview.erilisdesign.com/html/lana/
Author URI: https://themeforest.net/user/erilisdesign
Version: 2.0
License: https://themeforest.net/licenses/standard
*/

/*------------------------------------------------------------------
[Table of contents]

1. Loader
2. Fullpage
3. Set Section Scheme
4. Scroll progress
5. Navigation
6. Back to top
7. Backgrounds
8. Animations
9. Countdown
10. Magnific Popup
11. Slider
12. Subscribe Form
13. Contact Form
14. Bootstrap
-------------------------------------------------------------------*/

(function($) {
    "use strict";

  // Vars
  var $body = $('body'),
    $ln_fullPage = $('.ln-fullpage'),
    $siteNavbar = $('.site-navbar'),
    $siteNavbarCollapse = $('#navbarCollapse'),
    $siteNavbarToggler = $('.site-navbar .navbar-toggler-alternative'),
    $siteNavbarMenu = $('#navigation'),
    siteNavbar_base = $siteNavbar.attr('data-navbar-base') ? $siteNavbar.attr('data-navbar-base') : '',
    siteNavbar_toggled = $siteNavbar.attr('data-navbar-toggled') ? $siteNavbar.attr('data-navbar-toggled') : '',
    siteNavbar_scrolled = $siteNavbar.attr('data-navbar-scrolled') ? $siteNavbar.attr('data-navbar-scrolled') : '',
    $backtotop = $('a.backtotop'),
    animationsRepeat = true, // true, false - Only when you use Fullpage.js
    target,
    trueMobile;

  function getWindowWidth(){
    return Math.max($(window).width(), window.innerWidth);
  }

  function getWindowHeight(){
    return Math.max($(window).height(), window.innerHeight );
  }

  function ln_screenDetector() {
    if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
      $body.removeClass('layout-mobile');
    } else {
      $body.addClass('layout-mobile');
    }
  }

  // [1. Loader]
  window.addEventListener( 'load', function(){
    document.querySelector('body').classList.add('loaded');
  });

  // [2. Fullpage]
  function ln_fullpage() {
    if( $ln_fullPage.length > 0 ){

      // Generate anchors
      var anchors = [];
      $ln_fullPage.children('section').each(function() {
        var anchor = $(this).data('anchor');
        if(typeof anchor !== 'undefined') {
          anchors.push(anchor);
        }
      });

      Waypoint.destroyAll();

      if( getWindowWidth() >= 1200 && getWindowHeight() >= 768 ){
        if( !$ln_fullPage.hasClass('fullpage-wrapper') || $ln_fullPage.hasClass('fp-destroyed') ){

          $('.ln-section').each(function(){
            var section = $(this),
              sectionHeight = parseInt(section.innerHeight(),10);

            if( sectionHeight > getWindowHeight() ){
              section.addClass('is-scrollable');
            }
          });

          $body.addClass('ln-fullpage-active');

          $ln_fullPage.fullpage({
            //Navigation
            menu: '#navigation',
            lockAnchors: false,
            anchors: anchors,

            //Scrolling
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 700,
            scrollBar: false,
            easingcss3: 'cubic-bezier(0.54, 0.18, 0.36, 0.81)',
            loopBottom: false,
            loopTop: false,
            scrollOverflow: true,

            //Accessibility
            animateAnchor: true,
            recordHistory: false,

            //Design
            controlArrows: false,
            verticalCentered: false,
            paddingTop: false,
            paddingBottom: false,

            //Custom selectors
            sectionSelector: '.ln-section',
            slideSelector: '.ln-slide',

            // Events
            onLeave: function(index, nextIndex, direction){
              if(nextIndex === 1){
                $body.addClass('ln-fullpage-intro-active');
                $backtotop.removeClass('active');
              } else {
                $body.removeClass('ln-fullpage-intro-active');
                $backtotop.addClass('active');
              }

              // Global overlay animation - background color and opacity
              var sectionOverlayColor = $('.ln-section').eq( nextIndex - 1 ).attr('data-overlay-color'),
                sectionOverlayOpacity = parseInt($('.ln-section').eq( nextIndex - 1 ).attr('data-overlay-opacity'), 10);

              if(sectionOverlayColor){
                $('.overlay-global-color').css('background-color', sectionOverlayColor);
              }
              if(sectionOverlayOpacity){
                 $('.overlay-global-color').css('opacity', sectionOverlayOpacity/100);
              }

              // Set Section Navbar Scheme
              ln_navigationChangeClasses( 'section', $('.ln-section').eq( nextIndex - 1 ) );

              // Set Section UI Scheme
              var uiScheme = $('.ln-section').eq( nextIndex - 1 ).attr('data-ui');
  
            },
            afterLoad: function(anchorLink, index){
              if(index == 1){
                $body.addClass('ln-fullpage-intro-active');
                $backtotop.removeClass('active');
              } else {
                $backtotop.addClass('active');
              }

              $('.animated').each(function(){
                var element = $(this),
                  animation = element.attr('data-animation') || 'fadeInUp',
                  animationDelay = parseInt(element.attr('data-animation-delay'), 10) || 0;

                if ( element.parents('.ln-section').hasClass('active') ) {
                  if ( !element.hasClass('visible') ) {
                    if ( animationDelay ) {
                      setTimeout(function(){
                        element.addClass(animation + ' visible');
                      }, animationDelay);
                    } else {
                      element.addClass(animation + ' visible');
                    }
                  }
                } else {
                  if(animationsRepeat = true){
                    element.removeClass( animation + ' visible' );
                  }
                }
              });

            },
            afterRender: function(){
              // Global overlay animation - background color and opacity
              var sectionOverlayColor = $('.ln-section').eq( 0 ).attr('data-overlay-color'),
                sectionOverlayOpacity = parseInt($('.ln-section').eq( 0 ).attr('data-overlay-opacity'), 10);

              if(sectionOverlayColor){
                $('.overlay-global-color').css('background-color', sectionOverlayColor);
              }
              if(sectionOverlayOpacity){
                $('.overlay-global-color').css('opacity', sectionOverlayOpacity/100);
              }

              // Set Section Navbar Scheme
              ln_navigationChangeClasses( 'section', $('.ln-section').eq( 0 ) );

              // Set Section UI Scheme
              var uiScheme = $('.ln-section').eq( 0 ).attr('data-ui');
            }
          });
        }
      } else {
        // Fullpage - Destroy
        if( $ln_fullPage.hasClass('fullpage-wrapper') && !$ln_fullPage.hasClass('fp-destroyed') ){
          $body.removeClass('ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark');
          $.fn.fullpage.destroy('all');
          $('.ln-section').removeClass('is-scrollable');
        }
        ln_animations();
      }
    } else {
      $body.removeClass('ln-fullpage-active ln-fullpage-intro-active ui-light ui-dark');
      $('.ln-section').removeClass('is-scrollable');
      ln_animations();
    }
  }

  // [5. Navigation]
  function ln_navigation(){
    var smoothScrollLinks = $('a.scrollto, .site-navbar a[href^="#"]');

	// Smooth Scroll
    smoothScrollLinks.off('click');
    smoothScrollLinks.on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');

      if( $body.hasClass('ln-fullpage-active') ){
        target = target.substr(1);

        $.fn.fullpage.moveTo(target);
      } else {
        if( $(this).parents('li').attr('data-menuanchor') ){
          target = $('[data-anchor="'+ target.substr(1) +'"]');
        } else if( $('[data-anchor="'+ target.substr(1) +'"]').length > 0 ){
          target = $('[data-anchor="'+ target.substr(1) +'"]');
        }

		$.smoothScroll({
          offset: 0,
          easing: 'swing',
          speed: 800,
          scrollTarget: target,
          preventDefault: false
        });
      }
    });

    // Navigation collapse
    $siteNavbarCollapse.on( 'show.bs.collapse', function(){
      $siteNavbar.addClass('navbar-toggled-show');
      ln_navigationChangeClasses('toggled');
    });

    $siteNavbarCollapse.on( 'hidden.bs.collapse', function(){
      $siteNavbar.removeClass('navbar-toggled-show');

      if( $siteNavbar.hasClass('scrolled') ){
        ln_navigationChangeClasses('scrolled');
      } else {
        ln_navigationChangeClasses();
      }
    });

    // Close nav on click outside of '.site-navbar'
    $(document).on( 'click touchstart', function(e){
      if ( $('.site-navbar').is(e.target) || $(e.target).parents('.site-navbar').length > 0 || $('.site-navbar').is(e.target) || $(e.target).hasClass('navbar-toggler') ){
        return;
      };

      if ( $siteNavbarToggler.attr('aria-expanded') === 'true' ){
        $siteNavbarToggler.trigger('click');
      }
    });

  }

  function ln_navigationOnScroll(){
    var scrollPos = $(window).scrollTop();

    if( $body.hasClass('ln-fullpage-active') ){
      return false;
    }

    if ( scrollPos > 0 ){
      if ( $siteNavbar.hasClass('scrolled') ){
        return false;
      }

      $siteNavbar.addClass('scrolled');
      $siteNavbar.removeClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        ln_navigationChangeClasses('toggled');
      } else {
        ln_navigationChangeClasses('scrolled');
      }
    } else {
      $siteNavbar.removeClass('scrolled');
      $siteNavbar.addClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        ln_navigationChangeClasses('toggled');
      } else {
        ln_navigationChangeClasses();
      }
    }
  }

  function ln_navigationResize(){
    var scrollPos = $(window).scrollTop();

    if( getWindowWidth() >= 1200 ){
      if ( $siteNavbarToggler.attr('aria-expanded') == 'true' ){
        $siteNavbar.removeClass('navbar-toggled-show');
        $siteNavbarCollapse.removeClass('show').css( 'display', '' );
        $siteNavbarToggler.attr('aria-expanded','false').addClass('collapsed');
      }
    }

    if ( scrollPos > 0 ){
      $siteNavbar.addClass('scrolled');
      $siteNavbar.removeClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        ln_navigationChangeClasses('toggled');
      } else {
        ln_navigationChangeClasses('scrolled');
      }
    } else {
      $siteNavbar.removeClass('scrolled');
      $siteNavbar.addClass('scrolled-0');

      if( $siteNavbar.hasClass('navbar-toggled-show') ){
        ln_navigationChangeClasses('toggled');
      } else {
        if( $body.hasClass('ln-fullpage-active') ){
          return false;
        }

        ln_navigationChangeClasses();
      }
    }
  }

  var nav_event_old;
  function ln_navigationChangeClasses(nav_event,target){
    if( nav_event_old === nav_event && !( nav_event == '' || nav_event == undefined ) && nav_event !== 'section' )
      return false;

    if( nav_event === 'toggled' && siteNavbar_toggled ){
      $siteNavbar.removeClass('navbar-light navbar-dark', siteNavbar_base,siteNavbar_scrolled).addClass(siteNavbar_toggled);
    } else if( nav_event === 'scrolled' && siteNavbar_scrolled ){
      $siteNavbar.removeClass('navbar-light navbar-dark', siteNavbar_base,siteNavbar_toggled).addClass(siteNavbar_scrolled);
    } else if( nav_event === 'section' ){
      var siteNavbar_section = target.attr('data-navbar');

	  if( siteNavbar_section ){
	    $siteNavbar.removeClass('navbar-light navbar-dark', siteNavbar_base,siteNavbar_toggled,siteNavbar_scrolled).addClass( siteNavbar_section );
      } else {
        $siteNavbar.removeClass('navbar-light navbar-dark', siteNavbar_toggled,siteNavbar_scrolled).addClass( siteNavbar_base );
      }
    } else {
      if(siteNavbar_base){
        $siteNavbar.removeClass('navbar-light navbar-dark', siteNavbar_toggled,siteNavbar_scrolled).addClass(siteNavbar_base);
      }
    }

	if( $siteNavbar.hasClass('navbar-light') ){
      $('[data-on-navbar-light]').each(function(){
        var el = $(this),
          el_light = el.attr('data-on-navbar-light') ? el.attr('data-on-navbar-light') : '',
          el_dark = el.attr('data-on-navbar-dark') ? el.attr('data-on-navbar-dark') : '';

        el.removeClass(el_dark).addClass(el_light);
      });
	} else if( $siteNavbar.hasClass('navbar-dark') ) {
      $('[data-on-navbar-dark]').each(function(){
        var el = $(this),
          el_light = el.attr('data-on-navbar-light') ? el.attr('data-on-navbar-light') : '',
          el_dark = el.attr('data-on-navbar-dark') ? el.attr('data-on-navbar-dark') : '';

        el.removeClass(el_light).addClass(el_dark);
      });
	}

    nav_event_old = nav_event;
  }

  // [7. Backgrounds]
  function ln_backgrounds(){

    // Image
    var $bgImage = $('.bg-image-holder');
    if($bgImage.length){
      $bgImage.each(function(){
        var $self = $(this);
        var src = $self.children('img').attr('src');

        $self.css('background-image','url('+src+')').children('img').hide();
      });
    }
  }

  // [8. Animations]
  function ln_animations() {

    $('.animated').each(function() {
      var $element = $(this);

      new Waypoint({
        element: $element,
        handler: function(direction) {
          var $element = this.element,
            animation = $element.attr('data-animation'),
            animationDelay = parseInt($element.attr('data-animation-delay'), 10);

          if ( !$element.hasClass('visible') ) {
            if ( animationDelay ) {
              setTimeout(function(){
                $element.addClass(animation + ' visible');
              }, animationDelay);
            } else {
              $element.addClass(animation + ' visible');
            }
          }
          this.destroy();
        },
        offset: '100%'
      });
    });

  }

  // [13. Contact Form]
  function ln_contactForm(){
    var $contactForm = $('.contact-form');

    if ( $contactForm.length > 0 ){
      $contactForm.each( function(){
        var el = $(this),
          elResult = el.find('.contact-form-result');

        el.find('form').validate({
          submitHandler: function(form) {
            elResult.fadeOut( 500 );

            $(form).ajaxSubmit({
              target: elResult,
              dataType: 'json',
              success: function( data ) {
                elResult.html( data.message ).fadeIn( 500 );
                if( data.alert != 'error' ) {
                  $(form).clearForm();
                  setTimeout(function(){
                    elResult.fadeOut( 500 );
                  }, 5000);
                };
              }
            });
          }
        });

      });
    }
  }


  $(document).ready(function($){
    $('html, body').scrollTop(0);
    ln_screenDetector();
	ln_fullpage();
	ln_navigation();
	ln_backgrounds();
    ln_contactForm();
  });

  $(window).on('load', function(){
    $(window).scroll();
  });

  $(window).on('resize', function(){
    ln_screenDetector();
	ln_navigation();
    ln_navigationResize();
    ln_fullpage();
  });

  $(window).on('scroll', function(){
    ln_navigationOnScroll();
  });

})(jQuery);