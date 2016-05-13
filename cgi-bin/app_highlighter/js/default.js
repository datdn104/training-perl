var codeInput = document.querySelector('.code-input');  
var codeOutput = document.querySelector('.code-output');

console.log(codeInput);

codeInput.addEventListener('input', function(e){
	console.log("zzzzz");
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    var newChar = String.fromCharCode(charCode);
    codeOutput.innerHTML = codeHighlight(codeInput.value + newChar);
});