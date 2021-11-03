import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = "feedback-form-state";
const feedbackForm = document.querySelector('.feedback-form');

initForm();

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(evt) {
    evt.preventDefault();
    const formElements = evt.target.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;
    const formData = {
        email,
        message,
    };
    
    if (email === '' || message === '') {
        return alert('Необходимо заполнить все поля!');
    };
    
    console.log(formData);
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
