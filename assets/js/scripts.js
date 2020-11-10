// Utility function
function Util () {};

/* 
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);	
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/* 
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};

/* 
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){  
    if (!currentTime) currentTime = timestamp;         
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };
  
  //set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};

/* 
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;
      
  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;        
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/* 
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/* 
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// merge a set of user options into plugin defaults
// https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {
  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // return false if not supported
}; 

/* 
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1); 
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/* 
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Math.easeOutQuart = function (t, b, c, d) { 
  t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
  var s=1.70158;var p=d*0.7;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};


/* JS Utility Classes */
(function() {
  // make focus ring visible only for keyboard navigation (i.e., tab key) 
  var focusTab = document.getElementsByClassName('js-tab-focus');
  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusTabs(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusTabs(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
  };

  function resetFocusTabs(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };
  window.addEventListener('mousedown', detectClick);
}());
// File#: _1_anim-menu-btn
// Usage: codyhouse.co/license
(function() {
    var menuBtns = document.getElementsByClassName('js-anim-menu-btn');
    if( menuBtns.length > 0 ) {
        for(var i = 0; i < menuBtns.length; i++) {(function(i){
            initMenuBtn(menuBtns[i]);
        })(i);}

        function initMenuBtn(btn) {
            btn.addEventListener('click', function(event){
                event.preventDefault();
                var status = !Util.hasClass(btn, 'anim-menu-btn--state-b');
                Util.toggleClass(btn, 'anim-menu-btn--state-b', status);
                // emit custom event
                var event = new CustomEvent('anim-menu-btn-clicked', {detail: status});
                btn.dispatchEvent(event);
            });
        };
    }
}());
// File#: _1_animated-headline
// Usage: codyhouse.co/license
(function() {
    var TextAnim = function(element) {
        this.element = element;
        this.wordsWrapper = this.element.getElementsByClassName(' js-text-anim__wrapper');
        this.words = this.element.getElementsByClassName('js-text-anim__word');
        this.selectedWord = 0;
        // interval between two animations
        this.loopInterval = parseFloat(getComputedStyle(this.element).getPropertyValue('--text-anim-pause'))*1000 || 1000;
        // duration of single animation (e.g., time for a single word to rotate)
        this.transitionDuration = parseFloat(getComputedStyle(this.element).getPropertyValue('--text-anim-duration'))*1000 || 1000;
        // keep animating after first loop was completed
        this.loop = (this.element.getAttribute('data-loop') && this.element.getAttribute('data-loop') == 'off') ? false : true;
        this.wordInClass = 'text-anim__word--in';
        this.wordOutClass = 'text-anim__word--out';
        // check for specific animations
        this.isClipAnim = Util.hasClass(this.element, 'text-anim--clip');
        if(this.isClipAnim) {
            this.animBorderWidth = parseInt(getComputedStyle(this.element).getPropertyValue('--text-anim-border-width')) || 2;
            this.animPulseClass = 'text-anim__wrapper--pulse';
        }
        initTextAnim(this);
    };

    function initTextAnim(element) {
        // make sure there's a word with the wordInClass
        setSelectedWord(element);
        // if clip animation -> add pulse class
        if(element.isClipAnim) {
            Util.addClass(element.wordsWrapper[0], element.animPulseClass);
        }
        // init loop
        loopWords(element);
    };

    function setSelectedWord(element) {
        var selectedWord = element.element.getElementsByClassName(element.wordInClass);
        if(selectedWord.length == 0) {
            Util.addClass(element.words[0], element.wordInClass);
        } else {
            element.selectedWord = Util.getIndexInArray(element.words, selectedWord[0]);
        }
    };

    function loopWords(element) {
        // stop animation after first loop was completed
        if(!element.loop && element.selectedWord == element.words.length - 1) {
            return;
        }
        var newWordIndex = getNewWordIndex(element);
        setTimeout(function() {
            if(element.isClipAnim) { // clip animation only
                switchClipWords(element, newWordIndex);
            } else {
                switchWords(element, newWordIndex);
            }
        }, element.loopInterval);
    };

    function switchWords(element, newWordIndex) {
        // switch words
        Util.removeClass(element.words[element.selectedWord], element.wordInClass);
        Util.addClass(element.words[element.selectedWord], element.wordOutClass);
        Util.addClass(element.words[newWordIndex], element.wordInClass);
        // reset loop
        resetLoop(element, newWordIndex);
    };

    function resetLoop(element, newIndex) {
        setTimeout(function() {
            // set new selected word
            Util.removeClass(element.words[element.selectedWord], element.wordOutClass);
            element.selectedWord = newIndex;
            loopWords(element); // restart loop
        }, element.transitionDuration);
    };

    function switchClipWords(element, newWordIndex) {
        // clip animation only
        var startWidth =  element.words[element.selectedWord].offsetWidth,
            endWidth = element.words[newWordIndex].offsetWidth;

        // remove pulsing animation
        Util.removeClass(element.wordsWrapper[0], element.animPulseClass);
        // close word
        animateWidth(startWidth, element.animBorderWidth, element.wordsWrapper[0], element.transitionDuration, function() {
            // switch words
            Util.removeClass(element.words[element.selectedWord], element.wordInClass);
            Util.addClass(element.words[newWordIndex], element.wordInClass);
            element.selectedWord = newWordIndex;

            // open word
            animateWidth(element.animBorderWidth, endWidth, element.wordsWrapper[0], element.transitionDuration, function() {
                // add pulsing class
                Util.addClass(element.wordsWrapper[0], element.animPulseClass);
                loopWords(element);
            });
        });
    };

    function getNewWordIndex(element) {
        // get index of new word to be shown
        var index = element.selectedWord + 1;
        if(index >= element.words.length) index = 0;
        return index;
    };

    function animateWidth(start, to, element, duration, cb) {
        // animate width of a word for the clip animation
        var currentTime = null;

        var animateProperty = function(timestamp){
            if (!currentTime) currentTime = timestamp;
            var progress = timestamp - currentTime;

            var val = Math.easeInOutQuart(progress, start, to - start, duration);
            element.style.width = val+"px";
            if(progress < duration) {
                window.requestAnimationFrame(animateProperty);
            } else {
                cb();
            }
        };

        //set the width of the element before starting animation -> fix bug on Safari
        element.style.width = start+"px";
        window.requestAnimationFrame(animateProperty);
    };

    // init TextAnim objects
    var textAnim = document.getElementsByClassName('js-text-anim'),
        reducedMotion = Util.osHasReducedMotion();
    if( textAnim ) {
        if(reducedMotion) return;
        for( var i = 0; i < textAnim.length; i++) {
            (function(i){ new TextAnim(textAnim[i]);})(i);
        }
    }
}());
document.addEventListener("DOMContentLoaded", function(){
    // Get Masonry layout img height
    var workImg = document.getElementsByClassName('work-img');

    for (var i = 0; i < workImg.length; i++) {
        var imgHeight = workImg.item(i).offsetHeight;
        console.log(imgHeight);
        var img = workImg.item(i);
        img.parentNode.style.height = imgHeight + 'px';
    }

    // Homepage Hero heading animations
    var homeHero = anime.timeline({
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 1000
    });

    homeHero
        .add({
            targets: '.h1-anim',
            translateY: 0,
        })
});



// File#: _1_drawer
// Usage: codyhouse.co/license
(function() {
    var Drawer = function(element) {
      this.element = element;
      this.content = document.getElementsByClassName('js-drawer__body')[0];
      this.triggers = document.querySelectorAll('[aria-controls="'+this.element.getAttribute('id')+'"]');
      this.firstFocusable = null;
      this.lastFocusable = null;
      this.selectedTrigger = null;
      this.isModal = Util.hasClass(this.element, 'js-drawer--modal');
      this.showClass = "drawer--is-visible";
      this.initDrawer();
    };
  
    Drawer.prototype.initDrawer = function() {
      var self = this;
      //open drawer when clicking on trigger buttons
      if ( this.triggers ) {
        for(var i = 0; i < this.triggers.length; i++) {
          this.triggers[i].addEventListener('click', function(event) {
            event.preventDefault();
            if(Util.hasClass(self.element, self.showClass)) {
              self.closeDrawer(event.target);
              return;
            }
            self.selectedTrigger = event.target;
            self.showDrawer();
            self.initDrawerEvents();
          });
        }
      }
  
      // if drawer is already open -> we should initialize the drawer events
      if(Util.hasClass(this.element, this.showClass)) this.initDrawerEvents();
    };
  
    Drawer.prototype.showDrawer = function() {
      var self = this;
      this.content.scrollTop = 0;
      Util.addClass(this.element, this.showClass);
      this.getFocusableElements();
      Util.moveFocus(this.element);
      // wait for the end of transitions before moving focus
      this.element.addEventListener("transitionend", function cb(event) {
        Util.moveFocus(self.element);
        self.element.removeEventListener("transitionend", cb);
      });
      this.emitDrawerEvents('drawerIsOpen', this.selectedTrigger);
    };
  
    Drawer.prototype.closeDrawer = function(target) {
      Util.removeClass(this.element, this.showClass);
      this.firstFocusable = null;
      this.lastFocusable = null;
      if(this.selectedTrigger) this.selectedTrigger.focus();
      //remove listeners
      this.cancelDrawerEvents();
      this.emitDrawerEvents('drawerIsClose', target);
    };
  
    Drawer.prototype.initDrawerEvents = function() {
      //add event listeners
      this.element.addEventListener('keydown', this);
      this.element.addEventListener('click', this);
    };
  
    Drawer.prototype.cancelDrawerEvents = function() {
      //remove event listeners
      this.element.removeEventListener('keydown', this);
      this.element.removeEventListener('click', this);
    };
  
    Drawer.prototype.handleEvent = function (event) {
      switch(event.type) {
        case 'click': {
          this.initClick(event);
        }
        case 'keydown': {
          this.initKeyDown(event);
        }
      }
    };
  
    Drawer.prototype.initKeyDown = function(event) {
      if( event.keyCode && event.keyCode == 27 || event.key && event.key == 'Escape' ) {
        //close drawer window on esc
        this.closeDrawer(false);
      } else if( this.isModal && (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab' )) {
        //trap focus inside drawer
        this.trapFocus(event);
      }
    };
  
    Drawer.prototype.initClick = function(event) {
      //close drawer when clicking on close button or drawer bg layer 
      if( !event.target.closest('.js-drawer__close') && !Util.hasClass(event.target, 'js-drawer') ) return;
      event.preventDefault();
      this.closeDrawer(event.target);
    };
  
    Drawer.prototype.trapFocus = function(event) {
      if( this.firstFocusable == document.activeElement && event.shiftKey) {
        //on Shift+Tab -> focus last focusable element when focus moves out of drawer
        event.preventDefault();
        this.lastFocusable.focus();
      }
      if( this.lastFocusable == document.activeElement && !event.shiftKey) {
        //on Tab -> focus first focusable element when focus moves out of drawer
        event.preventDefault();
        this.firstFocusable.focus();
      }
    }
  
    Drawer.prototype.getFocusableElements = function() {
      //get all focusable elements inside the drawer
      var allFocusable = this.element.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary');
      this.getFirstVisible(allFocusable);
      this.getLastVisible(allFocusable);
    };
  
    Drawer.prototype.getFirstVisible = function(elements) {
      //get first visible focusable element inside the drawer
      for(var i = 0; i < elements.length; i++) {
        if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
          this.firstFocusable = elements[i];
          return true;
        }
      }
    };
  
    Drawer.prototype.getLastVisible = function(elements) {
      //get last visible focusable element inside the drawer
      for(var i = elements.length - 1; i >= 0; i--) {
        if( elements[i].offsetWidth || elements[i].offsetHeight || elements[i].getClientRects().length ) {
          this.lastFocusable = elements[i];
          return true;
        }
      }
    };
  
    Drawer.prototype.emitDrawerEvents = function(eventName, target) {
      var event = new CustomEvent(eventName, {detail: target});
      this.element.dispatchEvent(event);
    };
  
    //initialize the Drawer objects
    var drawer = document.getElementsByClassName('js-drawer');
    if( drawer.length > 0 ) {
      for( var i = 0; i < drawer.length; i++) {
        (function(i){new Drawer(drawer[i]);})(i);
      }
    }
  }());
// File#: _1_reveal-effects
// Usage: codyhouse.co/license
(function() {
    var fxElements = document.getElementsByClassName('reveal-fx');
    var intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);
    if(fxElements.length > 0) {
        // deactivate effect if Reduced Motion is enabled
        if (Util.osHasReducedMotion() || !intersectionObserverSupported) {
            fxRemoveClasses();
            return;
        }
        //on small devices, do not animate elements -> reveal all
        if( fxDisabled(fxElements[0]) ) {
            fxRevealAll();
            return;
        }

        var fxRevealDelta = 120; // amount (in pixel) the element needs to enter the viewport to be revealed - if not custom value (data-reveal-fx-delta)

        var viewportHeight = window.innerHeight,
            fxChecking = false,
            fxRevealedItems = [],
            fxElementDelays = fxGetDelays(), //elements animation delay
            fxElementDeltas = fxGetDeltas(); // amount (in px) the element needs enter the viewport to be revealed (default value is fxRevealDelta)


        // add event listeners
        window.addEventListener('load', fxReveal);
        window.addEventListener('resize', fxResize);

        // observe reveal elements
        var observer = [];
        initObserver();

        function initObserver() {
            for(var i = 0; i < fxElements.length; i++) {
                observer[i] = new IntersectionObserver(
                    function(entries, observer) {
                        if(entries[0].isIntersecting) {
                            fxRevealItemObserver(entries[0].target);
                            observer.unobserve(entries[0].target);
                        }
                    },
                    {rootMargin: "0px 0px -"+fxElementDeltas[i]+"px 0px"}
                );

                observer[i].observe(fxElements[i]);
            }
        };

        function fxRevealAll() { // reveal all elements - small devices
            for(var i = 0; i < fxElements.length; i++) {
                Util.addClass(fxElements[i], 'reveal-fx--is-visible');
            }
        };

        function fxResize() { // on resize - check new window height and reveal visible elements
            if(fxChecking) return;
            fxChecking = true;
            (!window.requestAnimationFrame) ? setTimeout(function(){fxReset();}, 250) : window.requestAnimationFrame(fxReset);
        };

        function fxReset() {
            viewportHeight = window.innerHeight;
            fxReveal();
        };

        function fxReveal() { // reveal visible elements
            for(var i = 0; i < fxElements.length; i++) {(function(i){
                if(fxRevealedItems.indexOf(i) != -1 ) return; //element has already been revelead
                if(fxElementIsVisible(fxElements[i], i)) {
                    fxRevealItem(i);
                    fxRevealedItems.push(i);
                }})(i);
            }
            fxResetEvents();
            fxChecking = false;
        };

        function fxRevealItem(index) {
            if(fxElementDelays[index] && fxElementDelays[index] != 0) {
                // wait before revealing element if a delay was added
                setTimeout(function(){
                    Util.addClass(fxElements[index], 'reveal-fx--is-visible');
                }, fxElementDelays[index]);
            } else {
                Util.addClass(fxElements[index], 'reveal-fx--is-visible');
            }
        };

        function fxRevealItemObserver(item) {
            var index = Util.getIndexInArray(fxElements, item);
            if(fxRevealedItems.indexOf(index) != -1 ) return; //element has already been revelead
            fxRevealItem(index);
            fxRevealedItems.push(index);
            fxResetEvents();
            fxChecking = false;
        };

        function fxGetDelays() { // get anmation delays
            var delays = [];
            for(var i = 0; i < fxElements.length; i++) {
                delays.push( fxElements[i].getAttribute('data-reveal-fx-delay') ? parseInt(fxElements[i].getAttribute('data-reveal-fx-delay')) : 0);
            }
            return delays;
        };

        function fxGetDeltas() { // get reveal delta
            var deltas = [];
            for(var i = 0; i < fxElements.length; i++) {
                deltas.push( fxElements[i].getAttribute('data-reveal-fx-delta') ? parseInt(fxElements[i].getAttribute('data-reveal-fx-delta')) : fxRevealDelta);
            }
            return deltas;
        };

        function fxDisabled(element) { // check if elements need to be animated - no animation on small devices
            return !(window.getComputedStyle(element, '::before').getPropertyValue('content').replace(/'|"/g, "") == 'reveal-fx');
        };

        function fxElementIsVisible(element, i) { // element is inside viewport
            return (fxGetElementPosition(element) <= viewportHeight - fxElementDeltas[i]);
        };

        function fxGetElementPosition(element) { // get top position of element
            return element.getBoundingClientRect().top;
        };

        function fxResetEvents() {
            if(fxElements.length > fxRevealedItems.length) return;
            // remove event listeners if all elements have been revealed
            window.removeEventListener('load', fxReveal);
            window.removeEventListener('resize', fxResize);
        };

        function fxRemoveClasses() {
            // Reduced Motion on or Intersection Observer not supported
            while(fxElements[0]) {
                // remove all classes starting with 'reveal-fx--'
                var classes = fxElements[0].getAttribute('class').split(" ").filter(function(c) {
                    return c.lastIndexOf('reveal-fx--', 0) !== 0;
                });
                fxElements[0].setAttribute('class', classes.join(" ").trim());
                Util.removeClass(fxElements[0], 'reveal-fx');
            }
        };
    }
}());
// File#: _1_sub-navigation
// Usage: codyhouse.co/license
(function () {
  var SideNav = function (element) {
    this.element = element;
    this.control = this.element.getElementsByClassName("js-subnav__control");
    this.navList = this.element.getElementsByClassName("js-subnav__wrapper");
    this.closeBtn = this.element.getElementsByClassName("js-subnav__close-btn");
    this.firstFocusable = getFirstFocusable(this);
    this.showClass = "subnav__wrapper--is-visible";
    this.collapsedLayoutClass = "subnav--collapsed";
    initSideNav(this);
  };

  function getFirstFocusable(sidenav) {
    // get first focusable element inside the subnav
    if (sidenav.navList.length == 0) return;
    var focusableEle = sidenav.navList[0].querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),
      firstFocusable = false;
    for (var i = 0; i < focusableEle.length; i++) {
      if (focusableEle[i].offsetWidth || focusableEle[i].offsetHeight || focusableEle[i].getClientRects().length) {
        firstFocusable = focusableEle[i];
        break;
      }
    }

    return firstFocusable;
  }

  function initSideNav(sidenav) {
    checkSideNavLayout(sidenav); // switch from --compressed to --expanded layout
    initSideNavToggle(sidenav); // mobile behavior + layout update on resize
  }

  function initSideNavToggle(sidenav) {
    // custom event emitted when window is resized
    sidenav.element.addEventListener("update-sidenav", function (event) {
      checkSideNavLayout(sidenav);
    });

    // mobile only
    if (sidenav.control.length == 0 || sidenav.navList.length == 0) return;
    sidenav.control[0].addEventListener("click", function (event) {
      // open sidenav
      openSideNav(sidenav, event);
    });
    sidenav.element.addEventListener("click", function (event) {
      // close sidenav when clicking on close button/bg layer
      if (event.target.closest(".js-subnav__close-btn") || Util.hasClass(event.target, "js-subnav__wrapper")) {
        closeSideNav(sidenav, event);
      }
    });
  }

  function openSideNav(sidenav, event) {
    // open side nav - mobile only
    event.preventDefault();
    sidenav.selectedTrigger = event.target;
    event.target.setAttribute("aria-expanded", "true");
    Util.addClass(sidenav.navList[0], sidenav.showClass);
    sidenav.navList[0].addEventListener("transitionend", function cb(event) {
      sidenav.navList[0].removeEventListener("transitionend", cb);
      sidenav.firstFocusable.focus();
    });
  }

  function closeSideNav(sidenav, event, bool) {
    // close side sidenav - mobile only
    if (!Util.hasClass(sidenav.navList[0], sidenav.showClass)) return;
    if (event) event.preventDefault();
    Util.removeClass(sidenav.navList[0], sidenav.showClass);
    if (!sidenav.selectedTrigger) return;
    sidenav.selectedTrigger.setAttribute("aria-expanded", "false");
    if (!bool) sidenav.selectedTrigger.focus();
    sidenav.selectedTrigger = false;
  }

  function checkSideNavLayout(sidenav) {
    // switch from --compressed to --expanded layout
    var layout = getComputedStyle(sidenav.element, ":before").getPropertyValue("content").replace(/\'|"/g, "");
    if (layout != "expanded" && layout != "collapsed") return;
    Util.toggleClass(sidenav.element, sidenav.collapsedLayoutClass, layout != "expanded");
  }

  var sideNav = document.getElementsByClassName("js-subnav"),
    SideNavArray = [],
    j = 0;
  if (sideNav.length > 0) {
    for (var i = 0; i < sideNav.length; i++) {
      var beforeContent = getComputedStyle(sideNav[i], ":before").getPropertyValue("content");
      if (beforeContent && beforeContent != "" && beforeContent != "none") {
        j = j + 1;
      }
      (function (i) {
        SideNavArray.push(new SideNav(sideNav[i]));
      })(i);
    }

    if (j > 0) {
      // on resize - update sidenav layout
      var resizingId = false,
        customEvent = new CustomEvent("update-sidenav");
      window.addEventListener("resize", function (event) {
        clearTimeout(resizingId);
        resizingId = setTimeout(doneResizing, 300);
      });

      function doneResizing() {
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            SideNavArray[i].element.dispatchEvent(customEvent);
          })(i);
        }
      }

      window.requestAnimationFrame // init table layout
        ? window.requestAnimationFrame(doneResizing)
        : doneResizing();
    }

    // listen for key events
    window.addEventListener("keyup", function (event) {
      if ((event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == "escape")) {
        // listen for esc key - close navigation on mobile if open
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            closeSideNav(SideNavArray[i], event);
          })(i);
        }
      }
      if ((event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == "tab")) {
        // listen for tab key - close navigation on mobile if open when nav loses focus
        if (document.activeElement.closest(".js-subnav__wrapper")) return;
        for (var i = 0; i < SideNavArray.length; i++) {
          (function (i) {
            closeSideNav(SideNavArray[i], event, true);
          })(i);
        }
      }
    });
  }
})();

// File#: _1_swipe-content
(function() {
    var SwipeContent = function(element) {
      this.element = element;
      this.delta = [false, false];
      this.dragging = false;
      this.intervalId = false;
      initSwipeContent(this);
    };
  
    function initSwipeContent(content) {
      content.element.addEventListener('mousedown', handleEvent.bind(content));
      content.element.addEventListener('touchstart', handleEvent.bind(content));
    };
  
    function initDragging(content) {
      //add event listeners
      content.element.addEventListener('mousemove', handleEvent.bind(content));
      content.element.addEventListener('touchmove', handleEvent.bind(content));
      content.element.addEventListener('mouseup', handleEvent.bind(content));
      content.element.addEventListener('mouseleave', handleEvent.bind(content));
      content.element.addEventListener('touchend', handleEvent.bind(content));
    };
  
    function cancelDragging(content) {
      //remove event listeners
      if(content.intervalId) {
        (!window.requestAnimationFrame) ? clearInterval(content.intervalId) : window.cancelAnimationFrame(content.intervalId);
        content.intervalId = false;
      }
      content.element.removeEventListener('mousemove', handleEvent.bind(content));
      content.element.removeEventListener('touchmove', handleEvent.bind(content));
      content.element.removeEventListener('mouseup', handleEvent.bind(content));
      content.element.removeEventListener('mouseleave', handleEvent.bind(content));
      content.element.removeEventListener('touchend', handleEvent.bind(content));
    };
  
    function handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
        case 'touchstart':
          startDrag(this, event);
          break;
        case 'mousemove':
        case 'touchmove':
          drag(this, event);
          break;
        case 'mouseup':
        case 'mouseleave':
        case 'touchend':
          endDrag(this, event);
          break;
      }
    };
  
    function startDrag(content, event) {
      content.dragging = true;
      // listen to drag movements
      initDragging(content);
      content.delta = [parseInt(unify(event).clientX), parseInt(unify(event).clientY)];
      // emit drag start event
      emitSwipeEvents(content, 'dragStart', content.delta, event.target);
    };
  
    function endDrag(content, event) {
      cancelDragging(content);
      // credits: https://css-tricks.com/simple-swipe-with-vanilla-javascript/
      var dx = parseInt(unify(event).clientX), 
        dy = parseInt(unify(event).clientY);
      
      // check if there was a left/right swipe
      if(content.delta && (content.delta[0] || content.delta[0] === 0)) {
        var s = getSign(dx - content.delta[0]);
        
        if(Math.abs(dx - content.delta[0]) > 30) {
          (s < 0) ? emitSwipeEvents(content, 'swipeLeft', [dx, dy]) : emitSwipeEvents(content, 'swipeRight', [dx, dy]);	
        }
        
        content.delta[0] = false;
      }
      // check if there was a top/bottom swipe
      if(content.delta && (content.delta[1] || content.delta[1] === 0)) {
          var y = getSign(dy - content.delta[1]);
  
          if(Math.abs(dy - content.delta[1]) > 30) {
            (y < 0) ? emitSwipeEvents(content, 'swipeUp', [dx, dy]) : emitSwipeEvents(content, 'swipeDown', [dx, dy]);
        }
  
        content.delta[1] = false;
      }
      // emit drag end event
      emitSwipeEvents(content, 'dragEnd', [dx, dy]);
      content.dragging = false;
    };
  
    function drag(content, event) {
      if(!content.dragging) return;
      // emit dragging event with coordinates
      (!window.requestAnimationFrame) 
        ? content.intervalId = setTimeout(function(){emitDrag.bind(content, event);}, 250) 
        : content.intervalId = window.requestAnimationFrame(emitDrag.bind(content, event));
    };
  
    function emitDrag(event) {
      emitSwipeEvents(this, 'dragging', [parseInt(unify(event).clientX), parseInt(unify(event).clientY)]);
    };
  
    function unify(event) { 
      // unify mouse and touch events
      return event.changedTouches ? event.changedTouches[0] : event; 
    };
  
    function emitSwipeEvents(content, eventName, detail, el) {
      var trigger = false;
      if(el) trigger = el;
      // emit event with coordinates
      var event = new CustomEvent(eventName, {detail: {x: detail[0], y: detail[1], origin: trigger}});
      content.element.dispatchEvent(event);
    };
  
    function getSign(x) {
      if(!Math.sign) {
        return ((x > 0) - (x < 0)) || +x;
      } else {
        return Math.sign(x);
      }
    };
  
    window.SwipeContent = SwipeContent;
    
    //initialize the SwipeContent objects
    var swipe = document.getElementsByClassName('js-swipe-content');
    if( swipe.length > 0 ) {
      for( var i = 0; i < swipe.length; i++) {
        (function(i){new SwipeContent(swipe[i]);})(i);
      }
    }
  }());
// File#: _2_drawer-navigation
// Usage: codyhouse.co/license
(function() {
    function initDrNavControl(element) {
      var circle = element.getElementsByTagName('circle');
      if(circle.length > 0) {
        // set svg attributes to create fill-in animation on click
        initCircleAttributes(element, circle[0]);
      }
  
      var drawerId = element.getAttribute('aria-controls'),
        drawer = document.getElementById(drawerId);
      if(drawer) {
        // when the drawer is closed without click (e.g., user presses 'Esc') -> reset trigger status
        drawer.addEventListener('drawerIsClose', function(event){ 
          if(!event.detail || (event.detail && !event.detail.closest('.js-dr-nav-control[aria-controls="'+drawerId+'"]')) ) resetTrigger(element);
        });
      }
    };
  
    function initCircleAttributes(element, circle) {
      // set circle stroke-dashoffset/stroke-dasharray values
      var circumference = (2*Math.PI*circle.getAttribute('r')).toFixed(2);
      circle.setAttribute('stroke-dashoffset', circumference);
      circle.setAttribute('stroke-dasharray', circumference);
      Util.addClass(element, 'dr-nav-control--ready-to-animate');
    };
  
    function resetTrigger(element) {
      Util.removeClass(element, 'anim-menu-btn--state-b'); 
    };
  
    var drNavControl = document.getElementsByClassName('js-dr-nav-control');
    if(drNavControl.length > 0) initDrNavControl(drNavControl[0]);
  }());
// File#: _2_slideshow
// Usage: codyhouse.co/license
(function () {
  var Slideshow = function (opts) {
    this.options = slideshowAssignOptions(Slideshow.defaults, opts);
    this.element = this.options.element;
    this.items = this.element.getElementsByClassName("js-slideshow__item");
    this.controls = this.element.getElementsByClassName("js-slideshow__control");
    this.selectedSlide = 0;
    this.autoplayId = false;
    this.autoplayPaused = false;
    this.navigation = false;
    this.navCurrentLabel = false;
    this.ariaLive = false;
    this.moveFocus = false;
    this.animating = false;
    this.supportAnimation = Util.cssSupports("transition");
    this.animationOff = !Util.hasClass(this.element, "slideshow--transition-fade") && !Util.hasClass(this.element, "slideshow--transition-slide") && !Util.hasClass(this.element, "slideshow--transition-prx");
    this.animationType = Util.hasClass(this.element, "slideshow--transition-prx") ? "prx" : "slide";
    this.animatingClass = "slideshow--is-animating";
    initSlideshow(this);
    initSlideshowEvents(this);
    initAnimationEndEvents(this);
  };

  Slideshow.prototype.showNext = function () {
    showNewItem(this, this.selectedSlide + 1, "next");
  };

  Slideshow.prototype.showPrev = function () {
    showNewItem(this, this.selectedSlide - 1, "prev");
  };

  Slideshow.prototype.showItem = function (index) {
    showNewItem(this, index, false);
  };

  Slideshow.prototype.startAutoplay = function () {
    var self = this;
    if (this.options.autoplay && !this.autoplayId && !this.autoplayPaused) {
      self.autoplayId = setInterval(function () {
        self.showNext();
      }, self.options.autoplayInterval);
    }
  };

  Slideshow.prototype.pauseAutoplay = function () {
    var self = this;
    if (this.options.autoplay) {
      clearInterval(self.autoplayId);
      self.autoplayId = false;
    }
  };

  function slideshowAssignOptions(defaults, opts) {
    // initialize the object options
    var mergeOpts = {};
    mergeOpts.element = typeof opts.element !== "undefined" ? opts.element : defaults.element;
    mergeOpts.navigation = typeof opts.navigation !== "undefined" ? opts.navigation : defaults.navigation;
    mergeOpts.autoplay = typeof opts.autoplay !== "undefined" ? opts.autoplay : defaults.autoplay;
    mergeOpts.autoplayInterval = typeof opts.autoplayInterval !== "undefined" ? opts.autoplayInterval : defaults.autoplayInterval;
    mergeOpts.swipe = typeof opts.swipe !== "undefined" ? opts.swipe : defaults.swipe;
    return mergeOpts;
  }

  function initSlideshow(slideshow) {
    // basic slideshow settings
    // if no slide has been selected -> select the first one
    if (slideshow.element.getElementsByClassName("slideshow__item--selected").length < 1) Util.addClass(slideshow.items[0], "slideshow__item--selected");
    slideshow.selectedSlide = Util.getIndexInArray(slideshow.items, slideshow.element.getElementsByClassName("slideshow__item--selected")[0]);
    // create an element that will be used to announce the new visible slide to SR
    var srLiveArea = document.createElement("div");
    Util.setAttributes(srLiveArea, { class: "sr-only js-slideshow__aria-live", "aria-live": "polite", "aria-atomic": "true" });
    slideshow.element.appendChild(srLiveArea);
    slideshow.ariaLive = srLiveArea;
  }

  function initSlideshowEvents(slideshow) {
    // if slideshow navigation is on -> create navigation HTML and add event listeners
    if (slideshow.options.navigation) {
      // check if navigation has already been included
      if (slideshow.element.getElementsByClassName("js-slideshow__navigation").length == 0) {
        var navigation = document.createElement("ol"),
          navChildren = "";

        var navClasses = "slideshow__navigation js-slideshow__navigation";
        if (slideshow.items.length <= 1) {
          navClasses = navClasses + " is-hidden";
        }

        navigation.setAttribute("class", navClasses);
        for (var i = 0; i < slideshow.items.length; i++) {
          var className = i == slideshow.selectedSlide ? 'class="slideshow__nav-item slideshow__nav-item--selected js-slideshow__nav-item"' : 'class="slideshow__nav-item js-slideshow__nav-item"',
            navCurrentLabel = i == slideshow.selectedSlide ? '<span class="sr-only js-slideshow__nav-current-label">Current Item</span>' : "";
          navChildren = navChildren + "<li " + className + '><button class="reset"><span class="sr-only">' + (i + 1) + "</span>" + navCurrentLabel + "</button></li>";
        }
        navigation.innerHTML = navChildren;
        slideshow.element.appendChild(navigation);
      }

      slideshow.navCurrentLabel = slideshow.element.getElementsByClassName("js-slideshow__nav-current-label")[0];
      slideshow.navigation = slideshow.element.getElementsByClassName("js-slideshow__nav-item");

      var dotsNavigation = slideshow.element.getElementsByClassName("js-slideshow__navigation")[0];

      dotsNavigation.addEventListener("click", function (event) {
        console.log('Clicked');

        navigateSlide(slideshow, event, true);
      });
      dotsNavigation.addEventListener("keyup", function (event) {
        navigateSlide(slideshow, event, event.key.toLowerCase() == "enter");
      });
    }
    // slideshow arrow controls
    if (slideshow.controls.length > 0) {
      // hide controls if one item available
      if (slideshow.items.length <= 1) {
        Util.addClass(slideshow.controls[0], "is-hidden");
        Util.addClass(slideshow.controls[1], "is-hidden");
      }
      slideshow.controls[0].addEventListener("click", function (event) {
        event.preventDefault();
        slideshow.showPrev();
        updateAriaLive(slideshow);
      });
    }
    // swipe events
    if (slideshow.options.swipe) {
      //init swipe
      new SwipeContent(slideshow.element);
      slideshow.element.addEventListener("swipeLeft", function (event) {
        slideshow.showNext();
      });
      slideshow.element.addEventListener("swipeRight", function (event) {
        slideshow.showPrev();
      });
    }
    // autoplay
    if (slideshow.options.autoplay) {
      slideshow.startAutoplay();
      // pause autoplay if user is interacting with the slideshow
      slideshow.element.addEventListener("mouseenter", function (event) {
        slideshow.pauseAutoplay();
        slideshow.autoplayPaused = true;
      });
      slideshow.element.addEventListener("focusin", function (event) {
        slideshow.pauseAutoplay();
        slideshow.autoplayPaused = true;
      });
      slideshow.element.addEventListener("mouseleave", function (event) {
        slideshow.autoplayPaused = false;
        slideshow.startAutoplay();
      });
      slideshow.element.addEventListener("focusout", function (event) {
        slideshow.autoplayPaused = false;
        slideshow.startAutoplay();
      });
    }
    // detect if external buttons control the slideshow
    var slideshowId = slideshow.element.getAttribute("id");
    if (slideshowId) {
      var externalControls = document.querySelectorAll('[data-controls="' + slideshowId + '"]');
      for (var i = 0; i < externalControls.length; i++) {
        (function (i) {
          externalControlSlide(slideshow, externalControls[i]);
        })(i);
      }
    }
    // custom event to trigger selection of a new slide element
    slideshow.element.addEventListener("selectNewItem", function (event) {
      // check if slide is already selected
      if (event.detail) {
        if (event.detail - 1 == slideshow.selectedSlide) return;
        showNewItem(slideshow, event.detail - 1, false);
      }
    });
  }

  function navigateSlide(slideshow, event, keyNav) {
    // user has interacted with the slideshow navigation -> update visible slide
    var target = Util.hasClass(event.target, "js-slideshow__nav-item") ? event.target : event.target.closest(".js-slideshow__nav-item");
    if (keyNav && target && !Util.hasClass(target, "slideshow__nav-item--selected")) {
      slideshow.showItem(Util.getIndexInArray(slideshow.navigation, target));
      slideshow.moveFocus = true;
      updateAriaLive(slideshow);
    }
  }

  function initAnimationEndEvents(slideshow) {
    // remove animation classes at the end of a slide transition
    for (var i = 0; i < slideshow.items.length; i++) {
      (function (i) {
        slideshow.items[i].addEventListener("animationend", function () {
          resetAnimationEnd(slideshow, slideshow.items[i]);
        });
        slideshow.items[i].addEventListener("transitionend", function () {
          resetAnimationEnd(slideshow, slideshow.items[i]);
        });
      })(i);
    }
  }

  function resetAnimationEnd(slideshow, item) {
    setTimeout(function () {
      // add a delay between the end of animation and slideshow reset - improve animation performance
      if (Util.hasClass(item, "slideshow__item--selected")) {
        if (slideshow.moveFocus) Util.moveFocus(item);
        emitSlideshowEvent(slideshow, "newItemVisible", slideshow.selectedSlide);
        slideshow.moveFocus = false;
      }
      Util.removeClass(item, "slideshow__item--" + slideshow.animationType + "-out-left slideshow__item--" + slideshow.animationType + "-out-right slideshow__item--" + slideshow.animationType + "-in-left slideshow__item--" + slideshow.animationType + "-in-right");
      item.removeAttribute("aria-hidden");
      slideshow.animating = false;
      Util.removeClass(slideshow.element, slideshow.animatingClass);
    }, 100);
  }

  function showNewItem(slideshow, index, bool) {
    if (slideshow.items.length <= 1) return;
    if (slideshow.animating && slideshow.supportAnimation) return;
    slideshow.animating = true;
    Util.addClass(slideshow.element, slideshow.animatingClass);
    if (index < 0) index = slideshow.items.length - 1;
    else if (index >= slideshow.items.length) index = 0;
    // skip slideshow item if it is hidden
    if (bool && Util.hasClass(slideshow.items[index], "is-hidden")) {
      slideshow.animating = false;
      index = bool == "next" ? index + 1 : index - 1;
      showNewItem(slideshow, index, bool);
      return;
    }
    // index of new slide is equal to index of slide selected item
    if (index == slideshow.selectedSlide) {
      slideshow.animating = false;
      return;
    }
    var exitItemClass = getExitItemClass(slideshow, bool, slideshow.selectedSlide, index);
    var enterItemClass = getEnterItemClass(slideshow, bool, slideshow.selectedSlide, index);
    // transition between slides
    if (!slideshow.animationOff) Util.addClass(slideshow.items[slideshow.selectedSlide], exitItemClass);
    Util.removeClass(slideshow.items[slideshow.selectedSlide], "slideshow__item--selected");
    slideshow.items[slideshow.selectedSlide].setAttribute("aria-hidden", "true"); //hide to sr element that is exiting the viewport
    if (slideshow.animationOff) {
      Util.addClass(slideshow.items[index], "slideshow__item--selected");
    } else {
      Util.addClass(slideshow.items[index], enterItemClass + " slideshow__item--selected");
    }
    // reset slider navigation appearance
    resetSlideshowNav(slideshow, index, slideshow.selectedSlide);
    slideshow.selectedSlide = index;
    // reset autoplay
    slideshow.pauseAutoplay();
    slideshow.startAutoplay();
    // reset controls/navigation color themes
    resetSlideshowTheme(slideshow, index);
    // emit event
    emitSlideshowEvent(slideshow, "newItemSelected", slideshow.selectedSlide);
    if (slideshow.animationOff) {
      slideshow.animating = false;
      Util.removeClass(slideshow.element, slideshow.animatingClass);
    }
  }

  function getExitItemClass(slideshow, bool, oldIndex, newIndex) {
    var className = "";
    if (bool) {
      className = bool == "next" ? "slideshow__item--" + slideshow.animationType + "-out-right" : "slideshow__item--" + slideshow.animationType + "-out-left";
    } else {
      className = newIndex < oldIndex ? "slideshow__item--" + slideshow.animationType + "-out-left" : "slideshow__item--" + slideshow.animationType + "-out-right";
    }
    return className;
  }

  function getEnterItemClass(slideshow, bool, oldIndex, newIndex) {
    var className = "";
    if (bool) {
      className = bool == "next" ? "slideshow__item--" + slideshow.animationType + "-in-right" : "slideshow__item--" + slideshow.animationType + "-in-left";
    } else {
      className = newIndex < oldIndex ? "slideshow__item--" + slideshow.animationType + "-in-left" : "slideshow__item--" + slideshow.animationType + "-in-right";
    }
    return className;
  }

  function resetSlideshowNav(slideshow, newIndex, oldIndex) {
    if (slideshow.navigation) {
      Util.removeClass(slideshow.navigation[oldIndex], "slideshow__nav-item--selected");
      Util.addClass(slideshow.navigation[newIndex], "slideshow__nav-item--selected");
      slideshow.navCurrentLabel.parentElement.removeChild(slideshow.navCurrentLabel);
      slideshow.navigation[newIndex].getElementsByTagName("button")[0].appendChild(slideshow.navCurrentLabel);
    }
  }

  function resetSlideshowTheme(slideshow, newIndex) {
    var dataTheme = slideshow.items[newIndex].getAttribute("data-theme");
    if (dataTheme) {
      if (slideshow.navigation) slideshow.navigation[0].parentElement.setAttribute("data-theme", dataTheme);
      if (slideshow.controls[0]) slideshow.controls[0].parentElement.setAttribute("data-theme", dataTheme);
    } else {
      if (slideshow.navigation) slideshow.navigation[0].parentElement.removeAttribute("data-theme");
      if (slideshow.controls[0]) slideshow.controls[0].parentElement.removeAttribute("data-theme");
    }
  }

  function emitSlideshowEvent(slideshow, eventName, detail) {
    var event = new CustomEvent(eventName, { detail: detail });
    slideshow.element.dispatchEvent(event);
  }

  function updateAriaLive(slideshow) {
    slideshow.ariaLive.innerHTML = "Item " + (slideshow.selectedSlide + 1) + " of " + slideshow.items.length;
  }

  function externalControlSlide(slideshow, button) {
    // control slideshow using external element
    button.addEventListener("click", function (event) {
      var index = button.getAttribute("data-index");
      if (!index || index == slideshow.selectedSlide + 1) return;
      event.preventDefault();
      showNewItem(slideshow, index - 1, false);
    });
  }

  Slideshow.defaults = {
    element: "",
    navigation: true,
    autoplay: false,
    autoplayInterval: 5000,
    swipe: false
  };

  window.Slideshow = Slideshow;

  //initialize the Slideshow objects
  var slideshows = document.getElementsByClassName("js-slideshow");
  if (slideshows.length > 0) {
    for (var i = 0; i < slideshows.length; i++) {
      (function (i) {
        var navigation = slideshows[i].getAttribute("data-navigation") && slideshows[i].getAttribute("data-navigation") == "off" ? false : true,
          autoplay = slideshows[i].getAttribute("data-autoplay") && slideshows[i].getAttribute("data-autoplay") == "on" ? true : false,
          autoplayInterval = slideshows[i].getAttribute("data-autoplay-interval") ? slideshows[i].getAttribute("data-autoplay-interval") : 5000,
          swipe = slideshows[i].getAttribute("data-swipe") && slideshows[i].getAttribute("data-swipe") == "on" ? true : false;
        new Slideshow({ element: slideshows[i], navigation: navigation, autoplay: autoplay, autoplayInterval: autoplayInterval, swipe: swipe });
      })(i);
    }
  }
})();

