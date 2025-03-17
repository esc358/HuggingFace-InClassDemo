//target html elements for id
const generateTextButton = document.getElementById("generateTextButton");
const generatedText = document.getElementById("generatedText");
const textEntered = document.getElementById("textEntered");

// Function to show loading text
const showLoading = () => {
  generatedText.innerHTML = "loading...."; //
};

//event listener for button click
generateTextButton.addEventListener("click", async () => {
  const questionTextEntered = textEntered.value.trim(); //get value from input field

  // validations
  if (!questionTextEntered) {
    generatedText.innerHTML = "Enter Text here";
    return;
  }

  if (questionTextEntered.length < 5) {
    generatedText.innerHTML = "Text must be at least 5 characters long.";
    return;
  }

  try {
    showLoading(); // Show loading state

    const response = await fetch("/text-generator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: questionTextEntered }), //question to server
    });

    if (response.ok) {
      // If the response is successful, parse the JSON data
      const data = await response.json();
      console.log(data); // Handle the generated text here
      generatedText.textContent = data; // assign html value to p tag
    } else {
      // If there's an error with the request, log the error
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error", error);
    generatedText.textContent = "Error, Please try again!";
  }
});
