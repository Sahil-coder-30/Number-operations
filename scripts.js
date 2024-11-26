document.getElementById('operation').addEventListener('change', function () {
    const operation = this.value;
    const input2 = document.getElementById('input2');
    input2.style.display = ['lcm', 'quadratic'].includes(operation) ? 'block' : 'none';
});

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function performOperation() {
    const operation = document.getElementById("operation").value;
    const input1 = parseFloat(document.getElementById("input1").value);
    const input2 = parseFloat(document.getElementById("input2").value || 0);
    const resultDiv = document.getElementById("result");

    if (isNaN(input1)) {
        resultDiv.textContent = "Please enter a valid number.";
        return;
    }

    let result = "";

    switch (operation) {
        case "table":
            result = "<strong>Table:</strong><br>";
            for (let i = 1; i <= 10; i++) {
                result += `${input1} x ${i} = ${input1 * i}<br>`;
            }
            break;

        case "square":
            result = `<strong>Square:</strong> ${input1 ** 2}`;
            break;

        case "cube":
            result = `<strong>Cube:</strong> ${input1 ** 3}`;
            break;

        case "factorial":
            let factorial = 1;
            for (let i = 1; i <= input1; i++) factorial *= i;
            result = `<strong>Factorial:</strong> ${factorial}`;
            break;

        case "sqrt":
            result = `<strong>Square Root:</strong> ${Math.sqrt(input1).toFixed(2)}`;
            break;

        case "prime":
            let isPrime = input1 > 1;
            for (let i = 2; i <= Math.sqrt(input1); i++) {
                if (input1 % i === 0) {
                    isPrime = false;
                    break;
                }
            }
            result = isPrime
                ? `<strong>${input1}</strong> is a prime number.`
                : `<strong>${input1}</strong> is not a prime number.`;
            break;

        case "armstrong":
            const digits = input1.toString().split("").map(Number);
            const armstrongSum = digits.reduce((sum, digit) => sum + Math.pow(digit, 3), 0);
            result = armstrongSum === input1
                ? `<strong>${input1}</strong> is an Armstrong number.`
                : `<strong>${input1}</strong> is not an Armstrong number.`;
            break;

        case "reverse":
            result = `<strong>Reversed Number:</strong> ${input1.toString().split("").reverse().join("")}`;
            break;

        case "fibonacci":
            let first = 0, second = 1;
            result = "<strong>Fibonacci Series:</strong> 0, 1, ";
            for (let i = 3; i <= input1; i++) {
                const next = first + second;
                result += next + ", ";
                first = second;
                second = next;
            }
            result = result.slice(0, -2); // Remove trailing comma
            break;

        case "lcm":
            result = `<strong>LCM:</strong> ${lcm(input1, input2)}`;
            break;

        case "digits":
            result = "<strong>Digits:</strong> ";
            result += input1
                .toString()
                .split("")
                .reverse()
                .join(", ");
            break;

        case "quadratic":
            const a = input1, b = input2;
            const c = parseFloat(prompt("Enter the constant term (c):"));
            const discriminant = b * b - 4 * a * c;

            if (discriminant > 0) {
                const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                result = `<strong>Roots:</strong> Real and Distinct<br>Root 1: ${root1}<br>Root 2: ${root2}`;
            } else if (discriminant === 0) {
                const root = -b / (2 * a);
                result = `<strong>Roots:</strong> Real and Equal<br>Root: ${root}`;
            } else {
                result = `<strong>Roots:</strong> Complex and Imaginary`;
            }
            break;

        default:
            result = "Invalid operation.";
    }

    resultDiv.innerHTML = result;
}
