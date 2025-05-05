document.addEventListener('DOMContentLoaded', function() {
  var generateBtn = document.getElementById('generateBtn');
  var ssidInput = document.getElementById('ssidInput');
  var passwordInput = document.getElementById('passwordInput');
  var qrCodeContainer = document.getElementById('qrCodeContainer');
  var exportJpegBtn = document.getElementById('exportJpegBtn');
  var convertBtn = document.getElementById('convertBtn');
  var qrCode = null;

  function toggleClearIcon() {
    var clearIcon = this.nextElementSibling;
    clearIcon.classList.toggle('active', this.value.length > 0);
  }

  function showClearIcon(inputField) {
    var clearIcon = inputField.nextElementSibling;
    clearIcon.classList.add('active');
  }

  function hideClearIcon(inputField) {
    var clearIcon = inputField.nextElementSibling;
    clearIcon.classList.remove('active');
  }

  ssidInput.addEventListener('input', toggleClearIcon);
  passwordInput.addEventListener('input', toggleClearIcon);

  ssidInput.addEventListener('focus', function() {
    showClearIcon(ssidInput);
  });
  passwordInput.addEventListener('focus', function() {
    showClearIcon(passwordInput);
  });

  ssidInput.addEventListener('blur', function() {
    hideClearIcon(ssidInput);
  });
  passwordInput.addEventListener('blur', function() {
    hideClearIcon(passwordInput);
  });

  var clearIcons = document.getElementsByClassName('clear-icon');

  for (var i = 0; i < clearIcons.length; i++) {
    var clearIcon = clearIcons[i];
    clearIcon.addEventListener('click', function() {
      var inputField = this.previousElementSibling;
      inputField.value = '';
      hideClearIcon(inputField);
      inputField.focus();
    });
  }

  // Hide the clear icons initially
  for (var i = 0; i < clearIcons.length; i++) {
    var clearIcon = clearIcons[i];
    clearIcon.classList.remove('active');
  }

  // Hide export JPEG and convert buttons initially
  exportBtn.style.display = 'none';
  exportJpegBtn.style.display = 'none';
  convertBtn.style.display = 'none';

  generateBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var ssid = ssidInput.value;
    var password = passwordInput.value;

    // Clear the existing QR code element
    qrCodeContainer.innerHTML = '';
 // Check if the fields are empty
  if (ssid === "" || password === "") {
    alert("Please fill in all the required fields.");
    return;
  }
    // Generate QR code
    qrCode = new QRCode(qrCodeContainer, {
      text: 'WIFI:S:' + ssid + ';T:WPA;P:' + password + ';;',
      width: 200,
      height: 200,
    });

    // Show the export JPEG and convert buttons
    exportBtn.style.display = 'block';
    exportJpegBtn.style.display = 'block';
    convertBtn.style.display = 'block';
  });

  exportBtn.addEventListener('click', function() {
    // Export the QR code as PNG
    if (qrCode) {
      var qrCodeImage = qrCodeContainer.querySelector('img');
      var link = document.createElement('a');
      link.href = qrCodeImage.src;
      link.download = 'qr_code.png';
      link.click();
    }
  });

  exportJpegBtn.addEventListener('click', function() {
    // Export the QR code as JPEG using html2canvas library
    if (qrCode) {
      var qrCodeElement = qrCodeContainer.firstChild;

      // Convert the QR code element to a canvas
      html2canvas(qrCodeElement).then(function(canvas) {
        // Convert the canvas to a data URL
        var dataURL = canvas.toDataURL('image/jpeg');

        // Create a link element and trigger the download
        var link = document.createElement('a');
        link.href = dataURL;
        link.download = 'qr_code.jpg';
        link.click();
      });
    }
  });

  convertBtn.addEventListener('click', function() {
    // Open the specified URL in a new tab
    var url = 'https://www.ilovepdf.com/'; // Replace with your desired URL
    window.open(url, '_blank');
  });
  

  // Rest of your code...
});












