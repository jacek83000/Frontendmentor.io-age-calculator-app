window.onload = function () {
    const btn = document.getElementById('btnCalculate');
    btn.addEventListener('click', () => {
        if (validateForm()) {
            calculateAge();
        }
    });
}

function resetErrors(labels, inputs, errorTexts, errorForm) {
    for (let i = 0; i < labels.length; i++) {
        labels[i].classList.remove("error-date-label");
    }
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
        errorTexts[i].classList.remove("error-text");
        errorTexts[i].classList.add("errors-invisible");
    }
    errorForm.classList.remove('error-form');
}

function isEmpty(value) {
    return ((!value) || (value.toString().trim() === ""))
}

function numberNotInRange(value, min, max) {
    return ((value < min) || (value > max));
}
function yearFromFuture(value) {
    return value > new Date().getFullYear ? true : false;
}

function isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function invalidDate(day, month, year) {
    if (!(isEmpty(day) || isEmpty(month) || (isEmpty(year)))) {
        const months = [
            31, 28, 31,
            30, 31, 30,
            31, 31, 30,
            31, 30, 31];

        const d = day;
        const m = month;
        const y = year;

        if (isLeapYear(y)) {
            months[1] = 29;
        }

        if (months[m - 1] < d) {
            return true;
        }

        return false;
    }
}


function validateForm() {
    const dayLabel = document.getElementById('dayLabel');
    const monthLabel = document.getElementById('monthLabel');
    const yearLabel = document.getElementById('yearLabel');

    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const errorDay = document.getElementById('errorDay');
    const errorMonth = document.getElementById('errorMonth');
    const errorYear = document.getElementById('errorYear');

    const errorForm = document.getElementById('dateForm');

    const dayResult = document.getElementById('dayResult');
    const monthResult = document.getElementById('monthResult');
    const yearResult = document.getElementById('yearResult');

    resetErrors(
        [dayLabel, monthLabel, yearLabel],
        [dayInput, monthInput, yearInput],
        [errorDay, errorMonth, errorYear], errorForm);
    let valid = true;

    function setErrorInfo(label, input, span, message) {
        input.classList.add('error-input');
        span.classList.add('error-text');
        label.classList.add('error-date-label');
        span.innerText = message;
        document.getElementById('dateForm').classList.add('error-form');
    }


    if (isEmpty(dayInput.value)) {
        valid = false;
        setErrorInfo(dayLabel, dayInput, errorDay, 'This field is required');
    } else if (numberNotInRange(dayInput.value, 1, 31)) {
        valid = false;
        setErrorInfo(dayLabel, dayInput, errorDay, 'Must be a valid day');
    }

    if (isEmpty(monthInput.value)) {
        valid = false;
        setErrorInfo(monthLabel, monthInput, errorMonth, 'This field is required');
    } else if (numberNotInRange(monthInput.value, 1, 12)) {
        valid = false;
        setErrorInfo(monthLabel, monthInput, errorMonth, 'Must be a valid month');
    }

    if (isEmpty(yearInput.value)) {
        valid = false;
        setErrorInfo(yearLabel, yearInput, errorYear, 'This field is required');
    } else if (yearFromFuture(yearInput.value)) {
        valid = false;
        setErrorInfo(yearLabel, yearInput, errorYear, 'Must be in the past');
    }

    if (invalidDate(dayInput.value, monthInput.value, yearInput.value)) {
        valid = false;
        setErrorInfo(dayLabel, dayInput, errorDay, 'Must be a valid date');
        setErrorInfo(monthLabel, monthInput, errorMonth, '');
        setErrorInfo(yearLabel, yearInput, errorYear, '');
    }

    if (valid) {
        dayResult.innerText = dayInput.value;
        monthResult.innerText = monthInput.value;
        yearResult.innerText = yearInput.value;

        dayResult.classList.remove('result-dash-space');
        monthResult.classList.remove('result-dash-space');
        yearResult.classList.remove('result-dash-space');
    } else {
        errorDay.classList.remove("errors-invisible");
        errorMonth.classList.remove("errors-invisible");
        errorYear.classList.remove("errors-invisible");

        dayResult.innerText = '--';
        monthResult.innerText = '--';
        yearResult.innerText = '--';

        dayResult.classList.add('result-dash-space');
        monthResult.classList.add('result-dash-space');
        yearResult.classList.add('result-dash-space');
    }

    return valid;
}

function calculateAge() {
    const d1 = document.getElementById('day').value;
    const m1 = document.getElementById('month').value;
    const y1 = document.getElementById('year').value;

    const dayResult = document.getElementById('dayResult');
    const monthResult = document.getElementById('monthResult');
    const yearResult = document.getElementById('yearResult');

    const currentDate = new Date();

    let d2 = currentDate.getDate();
    let m2 = 1 + currentDate.getMonth();
    let y2 = currentDate.getFullYear();
    const months = [
        31, 28, 31,
        30, 31, 30,
        31, 31, 30,
        31, 30, 31];

    if (d1 > d2) {
        d2 = d2 + months[m2 - 1];
        m2 = m2 - 1;
    }
    if (m1 > m2) {
        m2 = m2 + 12;
        y2 = y2 - 1;
    }
    const d = d2 - d1;
    const m = m2 - m1;
    const y = y2 - y1;

    dayResult.innerText = d;
    monthResult.innerText = m;
    yearResult.innerText = y;
}




