function crackTime(password) {
    var length = password.length;
    var possibilities = 0;
    
    for (var i = 1; i <= length; i++) {
      possibilities += Math.pow(95, i); // 95 printable ASCII characters
    }
    
    var seconds = possibilities / 1000000000; // Assume 1 billion guesses per second
    return seconds;
  }
  
  function checkPasswordStrength(password) {
    var strength = 0;
  
    if (password.length >= 8) {
      strength += 1;
    }
  
    if (/[a-z]/.test(password)) {
      strength += 1;
    }
  
    if (/[A-Z]/.test(password)) {
      strength += 1;
    }
  
    if (/\d/.test(password)) {
      strength += 1;
    }
  
    if (/[^a-zA-Z0-9]/.test(password)) {
      strength += 1;
    }
  
    return strength;
  }
  
  function checkPassword() {
    var password = document.getElementById("password").value;
    var resultDiv = document.getElementById("result");
    var strengthDiv = document.getElementById("strength");
    var gifContainer = document.getElementById("gifContainer");
  
    // Reset previous results and GIF
    resultDiv.textContent = "";
    strengthDiv.textContent = "";
    gifContainer.innerHTML = "";
  
    var strength = checkPasswordStrength(password);
    var strengthMessage;
  
    switch(strength) {
      case 0:
      case 1:
        strengthMessage = "Weak";
        break;
      case 2:
        strengthMessage = "Less Weak";
        break;
      case 3:
      case 4:
        strengthMessage = "Strong";
        break;
      case 5:
        strengthMessage = "Very Strong";
        break;
      default:
        strengthMessage = "Unknown";
    }
  
    resultDiv.textContent = "Password strength: " + strengthMessage;
  
    // Display GIF based on strength
    var gifUrls = [
      "gif1.gif",
      "gif2.gif",
      "gif3.gif",
      "gif4.gif",
      "gif5.gif"
    ];
  
    var gifIndex = Math.min(strength, gifUrls.length) - 1; // Limit to the number of GIFs available
    var gifUrl = gifUrls[gifIndex];
    var img = document.createElement("img");
    img.src = gifUrl;
    gifContainer.appendChild(img);
  }
  
  function testRules() {
    var password = document.getElementById("password").value;
    var resultDiv = document.getElementById("result");
  
    // Reset previous results
    resultDiv.textContent = "";
  
    // Check if the password meets each individual rule
    if (password.length < 8) {
      resultDiv.textContent += "Password should be at least 8 characters long.\n";
    }
  
    if (!/[a-z]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one lowercase letter.\n";
    }
  
    if (!/[A-Z]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one uppercase letter.\n";
    }
  
    if (!/\d/.test(password)) {
      resultDiv.textContent += "Password should contain at least one digit.\n";
    }
  
    if (!/[^a-zA-Z0-9]/.test(password)) {
      resultDiv.textContent += "Password should contain at least one special character.\n";
    }
  
    if (resultDiv.textContent === "") {
      resultDiv.textContent = "Password meets all the rules!";
    }
  }
  