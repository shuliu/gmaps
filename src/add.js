export default function add(num1, num2) {
    if (num1 === undefined) num1 = 0;
    if (num2 === undefined) num2 = 0;
    console.log(num1, num2);
    return num1 + num2;
}