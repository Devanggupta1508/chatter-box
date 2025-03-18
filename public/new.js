// Select the form
let form = document.querySelector("form");

// Form submit event listener
form.addEventListener("submit", function(event) {
    // Prevent default form submission
    event.preventDefault();  

    // Form validation check
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.");
        return;  
    }

    // Confirmation box
    let confirmEdit = confirm("Are you sure you want to save this message?");
    
    if (confirmEdit) {
        alert("Message saved successfully!");

        // ✅ Delay form submission to ensure proper handling
        setTimeout(() => {
            form.submit();
        }, 0);  
    }
});
