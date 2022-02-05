
// Setting initial states for elements
window.onload = () => {
    
    let inputs = document.getElementsByClassName('inputs__input');
    
    for (let i = 0; i < inputs.length; i++) {
        let current = inputs[i];
        current.addEventListener('focus', () => {
            current.parentElement.classList.remove('inputs__input-group--error');
            current.parentElement.classList.toggle('inputs__input-group--active');
        });
        current.addEventListener('blur', () => {
            if (!current.value) {
                current.parentElement.classList.add('inputs__input-group--error');
            }
            current.parentNode.classList.toggle('inputs__input-group--active');
        });
    }
    
    let ranges = document.getElementsByClassName('inputs__range');   
    for (let i = 0; i < ranges.length; i++) {
        handleRangeChange(ranges[i]);
    }
}


function handleRangeChange(slider) {
    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    const percentage = (val - min) * 100 / (max - min) + '%';

    slider.style.setProperty('--percentage', percentage);
}


function addCommas(input) {
    let value = input.value;
    let regex = /\.$/;
    if (value) {
        if (!value.match(regex)) {
            value = value.replace(/,/g, '');
            let commas = parseFloat(value);
            commas = commas.toLocaleString('en-US');
            input.value = commas;
        }
    }
}

function calculateResults() {
    
    // Getting values
    const interestRate = parseFloat(document.getElementById('rateOfInterestRange').value.replace(/,/g, ''));
    const yearsOfMortgage = parseFloat(document.getElementById('yearsOfMortgageRange').value.replace(/,/g, ''));
    const loanAmount = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, ''));
    const annualTax = parseFloat(document.getElementById('annualTax').value.replace(/,/g, ''));
    const annualInsurance = parseFloat(document.getElementById('annualInsurance').value.replace(/,/g, ''));

    // Getting result elements
    const piResult = document.getElementById('piResult');
    const taxResult = document.getElementById('taxResult');
    const insuranceResult = document.getElementById('insuranceResult');
    const totalResult = document.getElementById('totalResult');
    
    // Checking that inputs have value
    let inputs = document.getElementsByClassName('inputs__input');
    
    for (let i = 0; i < inputs.length; i++) {
        let current = inputs[i];
        if (!current.value) {
            current.parentElement.classList.add('inputs__input-group--error');
        }
    }

    // Calculating PI Result
    let piCalc = (((interestRate / 100) / 12) * loanAmount) / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
    piCalc = piCalc.toFixed(2);

    // Calculating Tax Result 
    let taxCalc = annualTax / 12;
    taxCalc = taxCalc.toFixed(2);

    // Calculating Insurance Result
    let insuranceCalc = annualInsurance / 12;
    insuranceCalc = insuranceCalc.toFixed(2);

    // Calculating Monthly Payment
    let totalMonthlyCalc = parseFloat(piCalc) + parseFloat(taxCalc) + parseFloat(insuranceCalc);
    totalMonthlyCalc = totalMonthlyCalc.toFixed(2);

    // Updating results
    if (annualInsurance && annualTax && loanAmount) {
        piResult.innerText = piCalc;
        taxResult.innerText = taxCalc;
        insuranceResult.innerText = insuranceCalc;
        totalResult.innerText = totalMonthlyCalc;
        
        // Displaying results on mobile
        const resultsSection = document.getElementById('results');
        resultsSection.classList.add('results--active');
        
        // Updating styles
        const results = document.getElementsByClassName('results__result');
        for (let i = 0; i < results.length; i++) {
            console.log(i);
            results[i].classList.add('results__result--active');
        }

    }
}
