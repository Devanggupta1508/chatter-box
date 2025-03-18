// Select the form and button
let form = document.querySelector("form");
let btn = document.querySelector("button");

// Click event listener
btn.addEventListener("click", handleSubmit);

// Keypress event listener for Enter key
form.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent default form submission
        handleSubmit(event);     // Call the same submit function
    }
});

function handleSubmit(event) {
    event.preventDefault();  // Prevent form submission temporarily

    let confirmEdit = confirm("Are you sure you want to edit this message?");
    
    if (confirmEdit) {
        alert("Message edited successfully!");
        form.submit();  // Submit the form after confirmation
    }
}

