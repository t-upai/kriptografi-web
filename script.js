function caesarCipher(text, shift, mode) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let actualShift = mode === "decrypt" ? -shift : shift;

            if (code >= 65 && code <= 90) {
                char = String.fromCharCode((code - 65 + actualShift + 26) % 26 + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode((code - 97 + actualShift + 26) % 26 + 97);
            }
        }

        result += char;
    }

    return result;
}

function process(mode) {
    const text = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shift").value);

    if (!text || isNaN(shift)) {
        alert("Isi teks dan kunci dulu!");
        return;
    }

    const result = caesarCipher(text, shift, mode);

    document.getElementById("outputText").innerText = result;

    updateInfo(text, shift);
}

function encrypt() {
    process("encrypt");
}

function decrypt() {
    process("decrypt");
}

function copyResult() {
    const text = document.getElementById("outputText").innerText;

    if (text === "Hasil akan muncul di sini...") {
        alert("Belum ada hasil!");
        return;
    }

    navigator.clipboard.writeText(text);

    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function resetAll() {
    document.getElementById("inputText").value = "";
    document.getElementById("shift").value = "";
    document.getElementById("outputText").innerText = "Hasil akan muncul di sini...";
    document.getElementById("charCount").innerText = "0 karakter";
    document.getElementById("shiftInfo").innerText = "Shift: 0";
}

function updateInfo(text, shift) {
    document.getElementById("charCount").innerText = text.length + " karakter";
    document.getElementById("shiftInfo").innerText = "Shift: " + shift;
}