document.addEventListener('DOMContentLoaded', function() {

    var quote_area = document.querySelector("#quote");
    var generateBtn = document.querySelector("#generateBtn");
    var copyBtn = document.querySelector("#copyBtn");

    // for Generate button
    generateBtn.addEventListener("click", function() {

        var request = new XMLHttpRequest();
             request.open('GET', 'quotes.json', true); 
              request.onload = function() {

            if (request.status == 200) {
                var quotes = JSON.parse(request.responseText);
                    var random_index = Math.floor(Math.random() * quotes.length);
                        var random_quote = quotes[random_index];
                            quote_area.innerHTML = "<span id='said'>" + random_quote.quote + "</span> <br><span id='person'>-" + random_quote.author + "</span>"; 
            } else {
                console.log("Error occurred: " + request.statusText);
            }

        };

        request.onerror = function() {
            quote_area.textContent = "There was an error.";
        };

        request.send();
    });

    // for Copy button
    copyBtn.addEventListener("click", function() {
       
        var quoteText = quote_area.textContent || "";

        var textArea = document.createElement("textarea");
                textArea.value = quoteText;
                  document.body.appendChild(textArea);
                    textArea.select();
        
        try {

            var successful = document.execCommand('copy');
            if (successful) {
                showMessage("Quote copied to clipboard!");
            } else {
                showMessage("Failed to copy the quote.");
            }

        } catch (err) {
            console.error("Failed to copy the quote: ", err);
                 showMessage("Failed to copy the quote.");
        }
        document.body.removeChild(textArea); 
    });

    function showMessage(message) {
        var messageDiv = document.createElement('div');
            messageDiv.className = 'message';
                messageDiv.textContent = message;
                    document.body.appendChild(messageDiv);

        setTimeout(function() {
            document.body.removeChild(messageDiv);
        }, 3000);
    }
    
});


