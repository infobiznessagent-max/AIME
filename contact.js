document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('.form-input');
    const btnSubmit = document.getElementById('btnSubmit');
    const formStatus = document.getElementById('formStatus');
    const formStatusIcon = document.getElementById('formStatusIcon');
    const formStatusTitle = document.getElementById('formStatusTitle');
    const formStatusText = document.getElementById('formStatusText');

    // Live error clearing
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id === 'fullName' ? 'name' : input.id === 'emailAddress' ? 'email' : 'message'}Error`);
            if (errorSpan && errorSpan.classList.contains('active')) {
                errorSpan.classList.remove('active');
                input.classList.remove('input-error');
            }
        });
    });

    // Form validation helper
    const validateForm = () => {
        let isValid = true;

        inputs.forEach(input => {
            let errorSpan = null;
            let isFieldValid = true;

            if (input.id === 'fullName') {
                errorSpan = document.getElementById('nameError');
                isFieldValid = input.value.trim() !== "";
            } else if (input.id === 'emailAddress') {
                errorSpan = document.getElementById('emailError');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isFieldValid = emailRegex.test(input.value.trim());
            } else if (input.id === 'messageText') {
                errorSpan = document.getElementById('messageError');
                isFieldValid = input.value.trim() !== "";
            }

            if (!isFieldValid) {
                isValid = false;
                input.classList.add('input-error');
                if (errorSpan) errorSpan.classList.add('active');
            } else {
                input.classList.remove('input-error');
                if (errorSpan) errorSpan.classList.remove('active');
            }
        });

        return isValid;
    };

    // AJAX form submission with Web3Forms
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Play a very subtle error shake feedback on the button
            btnSubmit.classList.add('shake-error');
            setTimeout(() => btnSubmit.classList.remove('shake-error'), 500);
            return;
        }

        // Enter submitting state
        form.classList.add('submitting');
        btnSubmit.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                showStatus(true, 'Message Sent', 'Thank you. We have received your request and will respond shortly.');
                form.reset();
            } else {
                console.log(response);
                showStatus(false, 'Unable to Send', json.message || 'Something went wrong. Please try again or reach out directly.');
            }
        })
        .catch(error => {
            console.log(error);
            showStatus(false, 'Unable to Send', 'Network error. Please try again or reach out directly.');
        })
        .finally(() => {
            form.classList.remove('submitting');
            btnSubmit.disabled = false;
        });
    });

    const showStatus = (isSuccess, title, message) => {
        if (isSuccess) {
            formStatusIcon.textContent = '✓';
            formStatusIcon.className = 'form-status-icon success';
        } else {
            formStatusIcon.textContent = '!';
            formStatusIcon.className = 'form-status-icon error';
        }

        formStatusTitle.textContent = title;
        formStatusText.textContent = message;
        formStatus.classList.add('active');

        // Scroll smoothly to see status if needed
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Dismiss status after 8 seconds
        setTimeout(() => {
            formStatus.classList.remove('active');
        }, 8000);
    };
});
