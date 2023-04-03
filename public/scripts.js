const btn = document.querySelector('.close');

btn.addEventListener('click', function () {
    document.querySelector('.alert').classList.add('display-none');
});

function closeNotification() {
    setTimeout(() => {
        document.querySelector('.alert-time').classList.add('display-none');
    }, 3000)
}
