if (window.location.pathname.includes('index.html')) {

    document.querySelector('.close-card-btn').onclick = function() { // Close card
        card = document.querySelector('.card');
        card.classList.add('hidden');
    };

    document.getElementById('switch-signup-btn').onclick = function () { // Switch from login to signup
        login_form = document.getElementById('login-container');
        signup_form = document.getElementById('signup-container');

        login_form.classList.add('hidden');
        signup_form.classList.remove('hidden');
        signup_form.classList.add('form-container');
    };

    document.getElementById('switch-login-btn').onclick = function() { // switch from signup to login
        login_form = document.getElementById('login-container');
        signup_form = document.getElementById('signup-container');

        signup_form.classList.add('hidden');
        login_form.classList.remove('hidden');
        login_form.classList.add('form-container');
    };

    document.getElementById('open-login-btn').onclick = function() { // login button on side nav
        card = document.querySelector('.card');
        login_form = document.getElementById('login-container');
        signup_form = document.getElementById('signup-container');

        login_form.classList.remove('hidden');
        signup_form.classList.add('hidden');
        card.classList.remove('hidden');
    };
};

if (window.location.pathname.includes('settings.html')) {

    document.getElementById('delete-account-btn').onclick = function() {
        let card =  document.getElementById('delete-account-check-card');
        let no_btn = document.getElementById('delete-no-btn');
        let yes_btn = document.getElementById('delete-yes-btn');

        card.classList.remove('hidden');

        no_btn.onclick = function() {
            card.classList.add('hidden');
            console.log('cancel');
        };

        yes_btn.onclick = function() {
            console.log('delete');
            card.classList.add('hidden');
        };

    };
};

// if (window.location.pathname.includes('wiki.html')) {
//     console.log('wiki');
//     let footer = document.getElementsByTagName('footer');
//     footer.style.height = "1rem";
// };