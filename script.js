

// hide offcanvas navbar when clicking 'home' or 'about' page, while on either page.
function closeOffCanvas() {
    let myOffCanvas = document.getElementById('offcanvasNavbar');

    // gets width, to check if offcanvas navbar can be enabled
    var width = document.body.clientWidth;

    if (width < 768){
        let openedCanvas = bootstrap.Offcanvas.getInstance(myOffCanvas);
        openedCanvas.hide();
    }
}




// modified version of the 'trigger css animation' script from assignment 1
// used this to switch .active navbar link while scrolling between 'home' and 'about' (which are on the same page)

// https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/

var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

var navHome = document.getElementById('nav-home');
var navAbout = document.getElementById('nav-about');

var findMeHome = document.querySelector('.hero');
var findMeAbout = document.querySelector('.cust-con');

window.addEventListener('scroll', function() {

    if (findMeHome != null) {

        if (isInViewport(findMeHome)) {

            navHome.classList.add("active");
            navAbout.classList.remove("active");
        } 
        else if (isInViewport(findMeAbout)) {
            navHome.classList.remove("active");
            navAbout.classList.add("active");
        }

    }


});



// hide and show lunch and breakfast menu
// adds and removes a class with display: none; based on a tracker variable and a string I pass into the function

var menuBreakfast = document.getElementById('breakfast');
var menuLunch = document.getElementById('lunch');

var breakfastButton = document.getElementById('break-button');
var lunchButton = document.getElementById('lunch-button');

var isBreakfastShowing = true;

function switchMenu(type) {

    if (menuLunch != null) {
        if (isBreakfastShowing && type == 'lunch') {
            isBreakfastShowing = false;
    
            menuBreakfast.classList.add("menu-disabled");
            menuLunch.classList.remove("menu-disabled");

            breakfastButton.classList.remove("active");
            lunchButton.classList.add("active");
        }
        
        if (!isBreakfastShowing && type == 'break') {
            isBreakfastShowing = true
    
            menuBreakfast.classList.remove("menu-disabled");
            menuLunch.classList.add("menu-disabled");

            breakfastButton.classList.add("active");
            lunchButton.classList.remove("active");
        }
    }
}


// form validation

let badgeSuccess = document.getElementById('badge-success');
let badgeError = document.getElementById('badge-error');

// Check localStorage for success state
if (localStorage.getItem('formSubmitted') === 'true') {

    badgeSuccess.classList.remove('display-none');
    // Remove after displaying
    localStorage.removeItem('formSubmitted');
}

// validate form loop- adds/removes error styling, blocks sumbission if errors are caught.
function validateForm() {

    let matches = 0;

    let formFields = document.querySelectorAll('.req');

    for (let x of formFields) {
        
        if (x.value == '') {
            x.classList.add('error', 'error-clickoff');

            matches++;
        }
        else {
            x.classList.remove('error', 'error-clickoff');
        }
    }

    if (matches == 0) {

        return true;
    }

    return false;    
}

if (window.location.pathname.includes('contact')) {
    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function(event) {
        // Prevent actual form submission
        event.preventDefault();

        if (validateForm()) {
            localStorage.setItem('formSubmitted', 'true'); // Store success state
            this.submit(); // Allow form submission and reload the page
        } else {
            badgeSuccess.classList.add('display-none');
            badgeError.classList.remove('display-none');
        }
    });
}


// removes some error styling on input fields onfocus=
function removeErrorText(givenText) {
    givenText.classList.remove('error-clickoff')
}