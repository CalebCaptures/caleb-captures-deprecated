function validateContactForm() {
    // Get form inputs elements
    const nameInput = document.querySelector('input[placeholder="name"]');
    const emailInput = document.querySelector('input[placeholder="e-mail"]');
    const subjectInput = document.querySelector('input[placeholder="subject"]');
    const messageTextarea = document.querySelector('textarea[placeholder="message"]');

    /* Get form error elements */
    const nameErrorDiv = document.getElementById("name-error");
    const emailErrorDiv = document.getElementById("email-error");
    const subjectErrorDiv = document.getElementById("subject-error");
    const messageErrorDiv = document.getElementById("message-error");

    // Helper function to show error
    function showError(input, message) {
        // Create and add error message
        input.classList.remove("hide");
    }

    // Helper function to clear error
    function clearError(input) {
        input.classList.add("hide");
    }

    // Validation functions
    function validateName(name) {
        if (!name.trim()) {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters';
        }
        return null;
    }

    function validateEmail(email) {
        if (!email.trim()) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    }

    function validateSubject(subject) {
        if (!subject.trim()) {
            return 'Subject is required';
        }
        if (subject.trim().length < 2) {
            return 'Subject must be at least 1 characters';
        }
        return null;
    }

    function validateMessage(message) {
        if (!message.trim()) {
            return 'Message is required';
        }
        if (message.trim().length < 5) {
            return 'Message must be at least 10 characters';
        }
        if (message.length > 5000) {
            return 'Message must be less than 5000 characters';
        }
        return null;
    }

    // Add real-time validation on blur
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value);
        if (error) {
            showError(nameErrorDiv, error);
        } else {
            clearError(nameErrorDiv);
        }
    });

    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        if (error) {
            showError(emailErrorDiv, error);
        } else {
            clearError(emailErrorDiv);
        }
    });

    subjectInput.addEventListener('blur', () => {
        const error = validateSubject(subjectInput.value);
        if (error) {
            showError(subjectErrorDiv, error);
        } else {
            clearError(subjectErrorDiv);
        }
    });

    messageTextarea.addEventListener('blur', () => {
        const error = validateMessage(messageTextarea.value);
        if (error) {
            showError(messageErrorDiv, error);
        } else {
            clearError(messageErrorDiv);
        }
    });

    // Clear errors on input
    [nameErrorDiv, emailErrorDiv, subjectErrorDiv, messageErrorDiv].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    // Clear all previous errors
    [nameErrorDiv, emailErrorDiv, subjectErrorDiv, messageErrorDiv].forEach(clearError);

    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const subjectError = validateSubject(subjectInput.value);
    const messageError = validateMessage(messageTextarea.value);

    // Show errors if any
    let hasErrors = false;

    if (nameError) {
        showError(nameErrorDiv, nameError);
        hasErrors = true;
    }

    if (emailError) {
        showError(emailErrorDiv, emailError);
        hasErrors = true;
    }

    if (subjectError) {
        showError(subjectErrorDiv, subjectError);
        hasErrors = true;
    }

    if (messageError) {
        showError(messageErrorDiv, messageError);
        hasErrors = true;
    }

    if (hasErrors) {
        const firstError = document.querySelector('.error-message');
        if (firstError) {
            firstError.previousElementSibling.focus();
        }
        return false;
    }

    return true;
}

function addFormSubmissionListener() {
    const form = document.getElementById("contact-form");
    const successfulSubmissionMessage = document.getElementById("contact-form-submission-message");
    const submitBtn = document.getElementById("send-message");

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = false;

        const isContactFormValid = validateContactForm();

        if (!isContactFormValid) {
            return;
        }

        const formData = new FormData(form);
        formData.append("access_key", "a29e325d-763f-41de-951f-aeadfa94b038");

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";

        successfulSubmissionMessage.classList.remove("hide");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                form.reset();
                successfulSubmissionMessage.classList.remove("hide");
            } else {
            }

        } catch (error) {
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

addFormSubmissionListener();