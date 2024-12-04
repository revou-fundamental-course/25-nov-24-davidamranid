// ini File Javascript

// Variables
let beratBadanInput = document.getElementById("berat-badan-input");
let usiaInput = document.getElementById("usia-input");
let tinggiBadanInput = document.getElementById("tinggi-badan-input");
let buttonbmi = document.getElementById("button-bmi");
let inputKelamin = document.getElementById("input-gender");

// BMI Calculation Function
function calculateBMI() {
    let berat = parseInt(beratBadanInput.value, 10);
    let usia = parseInt(usiaInput.value, 10);
    let tinggi = parseInt(tinggiBadanInput.value, 10);

    // Cek Validate Inputs 
    if (beratBadanInput.value === "") {
        alert("Silakan masukkan berat badan!");
        beratBadanInput.focus();  
        return;  
    }
    if (usiaInput.value === "") {
        alert("Silakan masukkan usia!");
        usiaInput.focus();  
        return;
    }
    if (tinggiBadanInput.value === "") {
        alert("Silakan masukkan tinggi badan!");
        tinggiBadanInput.focus();  
        return;
    }

    // Validasi input valid
    if (isNaN(berat) || isNaN(usia) || isNaN(tinggi) || berat <= 0 || usia <= 0 || tinggi <= 0) {
        alert("Silakan masukkan data yang benar! Pastikan data berupa angka positif.");
        return;  
    }

    // BMI kalkulasi
    let tinggiMeter = tinggi / 100; // convert cm to meters
    let hasilBMI = (berat / (tinggiMeter ** 2)).toFixed(1);

    // Display BMI 
    document.getElementById("result-calculation").textContent = hasilBMI;

    // BMI Status
    let status = document.getElementById("info-result");
    if (hasilBMI <= 18.5) {
        status.innerText = `Usia anda = ${usia} tahun, status BMI anda: Kekurangan berat badan`;
    } else if (hasilBMI > 18.5 && hasilBMI < 24.9) {
        status.innerText = `Usia anda = ${usia} tahun, status BMI anda: Normal (Berat badan ideal)`;
    } else if (hasilBMI >= 25 && hasilBMI <= 29.9) {
        status.innerText = `Usia anda = ${usia} tahun, status BMI anda: Kelebihan berat badan`;
    } else if (hasilBMI >= 30) {
        status.innerText = `Usia anda = ${usia} tahun, status BMI anda: Obesitas`;
    }
}

// Gender Function
function displayGender() {
    let gender = document.querySelector('input[name="gender"]:checked');
    if (gender) {
        document.getElementById("hasil").innerHTML = "Anda memiliki gender: " + gender.value;
    } else {
        document.getElementById("hasil").innerHTML = "Silakan pilih gender.";
    }
}

// Event Listener
buttonbmi.addEventListener("click", function(event) {
    event.preventDefault();
    calculateBMI(); // Call the BMI calculation function
    displayGender(); // Call the gender display function
});


// save to txt
function simpanKeFile() {
    let infoText = document.getElementById("info-result").innerText;
    let hasil = "Hasil pengukuran BMI\n";
    hasil += infoText + "\n";
    let blob = new Blob([hasil], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = 'resultBMI.txt';
    link.click();
    URL.revokeObjectURL(url);
}

//reset page
function reloadPage() {
  document.getElementById("main-form").reset();  // Reset all form fields
  document.getElementById("hasil").innerHTML = '';  // Clear result
  document.getElementById("result-calculation").innerHTML = '';
  document.getElementById("info-result").innerHTML = 'Anda memiliki berat badan ??';  // Reset result text
}
