import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";
const feedbackForm = document.querySelector('.feedback-form');

initForm();

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(feedbackForm);
    formData.forEach((value, name) => console.log(name, value));
    evt.target.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(evt) {
    let userData = localStorage.getItem(LOCALSTORAGE_KEY);
    userData = userData ? JSON.parse(userData) : {};
    userData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(userData));
}

function initForm() {
    let savedUserData = localStorage.getItem(LOCALSTORAGE_KEY);
    if (savedUserData) {
        savedUserData = JSON.parse(savedUserData);
        Object.entries(savedUserData).forEach(([name, value]) => {            
            feedbackForm.elements[name].value = value;
        });
    }
}
