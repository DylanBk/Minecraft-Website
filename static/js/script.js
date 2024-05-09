if (window.location.pathname.includes('settings')) {

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