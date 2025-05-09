document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || "Not provided";
            const message = document.getElementById('message').value;
            const date = new Date().toLocaleString();
            
            // Validate form data
            if (!name || !email || !message) {
                if (!name) document.getElementById('name-error').classList.add('visible');
                if (!email) document.getElementById('email-error').classList.add('visible');
                if (!message) document.getElementById('message-error').classList.add('visible');
                return;
            }
            
            // Create submission data object
            const submissionData = {
                date: date,
                name: name,
                email: email,
                phone: phone,
                message: message
            };
            
            // Store data in localStorage (as we can't directly write to files from browser)
            let existingData = localStorage.getItem('contactSubmissions');
            let allSubmissions = existingData ? JSON.parse(existingData) : [];
            
            // Add new submission
            allSubmissions.push(submissionData);
            
            // Save back to localStorage
            localStorage.setItem('contactSubmissions', JSON.stringify(allSubmissions));
            
            // Log to console (for debugging)
            console.log('Form submission saved:', submissionData);
            console.log('All submissions:', allSubmissions);
            
            // Show success message
            const successMessage = document.getElementById('form-success');
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }
            
            // Reset form
            contactForm.reset();
        });
        
        // Clear error messages when user starts typing
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + '-error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.classList.remove('visible');
                }
            });
        });
    }
});