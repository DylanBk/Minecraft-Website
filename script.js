document.querySelector('.close-card-btn').onclick = function() { // Close card
    card = document.querySelector('.card');
    card.classList.add('hidden');
}

document.getElementById('switch-signup-btn').onclick = function () { // Switch from login to signup
    login_form = document.getElementById('login-container');
    signup_form = document.getElementById('signup-container');

    login_form.classList.add('hidden');
    signup_form.classList.remove('hidden');
    signup_form.classList.add('form-container')
}

document.getElementById('switch-login-btn').onclick = function() { // switch from signup to login
    login_form = document.getElementById('login-container');
    signup_form = document.getElementById('signup-container');

    signup_form.classList.add('hidden');
    login_form.classList.remove('hidden');
    login_form.classList.add('form-container');
}

document.getElementById('open-login-btn').onclick = function() { // login button on side nav
    card = document.querySelector('.card');
    login_form = document.getElementById('login-container');
    signup_form = document.getElementById('signup-container');

    login_form.classList.remove('hidden')
    signup_form.classList.add('hidden');
    card.classList.remove('hidden');
}