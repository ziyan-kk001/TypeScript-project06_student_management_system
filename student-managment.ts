#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let doStart = true;
console.log(chalk.redBright("\n\t *Welcome to Our Institute's Student Management System*\n"));
while (doStart) {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    let myBalance = 0;
    let studentAnswer = await inquirer.prompt([
        {
            name: "studentName",
            type: "input",
            message: chalk.yellowBright("Enter Student Name:"),
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return chalk.red("Please enter a non-empty value");
            },
        },
        {
            name: "courses",
            type: "list",
            message: chalk.greenBright("Please Select any course from our given list of courses to get enrolled"),
            choices: [
                chalk.yellow("Web Development"),
                chalk.yellow("App Development"),
                chalk.yellow("Email-Marketing"),
                chalk.yellow("Graphic Designing"),
                chalk.yellow("Social Media Marketing"),
                chalk.yellow("Machine Learning"),
            ],
        },
    ]);
    const tutionFee = {
        [chalk.yellow("Web Development")]: 5000,
        [chalk.yellow("App Development")]: 6000,
        [chalk.yellow("Email-Marketing")]: 4000,
        [chalk.yellow("Graphic Designing")]: 4500,
        [chalk.yellow("Social Media Marketing")]: 3000,
        [chalk.yellow("Machine Learning")]: 6000,
    };
    console.log(chalk.yellowBright(`\nTution Fee: ${tutionFee[studentAnswer.courses]}\n`));
    console.log(chalk.cyan(`Balance: ${myBalance}\n`));
    let paymentMethod = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: chalk.red("Please select any Payment Method:"),
            choices: [
                chalk.yellow("Bank Transfer"),
                chalk.yellow("EasyPaisa"),
                chalk.yellow("JazzCash"),
            ],
        },
        {
            name: "amount",
            type: "input",
            message: chalk.white("Enter Transfer Amount:"),
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return chalk.red("Please enter a non-empty value");
            },
        },
    ]);
    console.log(chalk.cyan(`\n You Select Payment Method: ${paymentMethod.payment}`));
    const tutionFees = tutionFee[studentAnswer.courses];
    const paymentAmount = parseFloat(paymentMethod.amount);
    if (tutionFees === paymentAmount) {
        console.log(chalk.yellowBright(`Congratulations! You have successfully enrolled in ${studentAnswer.courses} Course`));
        let answer = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: chalk.red("What would you like to do next?"),
                choices: [chalk.green("View Status"), chalk.green("Exit")],
            },
        ]);
        if (answer.select === chalk.green("View Status")) {
            console.log(chalk.yellow("\n---- Status ----\n"));
            console.log(chalk.yellow(`StudentName: ${studentAnswer.studentName}`));
            console.log(chalk.yellow(`Student ID: ${randomNumber}`));
            console.log(chalk.yellow(`Course: ${studentAnswer.courses}`));
            console.log(chalk.yellow(`Tution Fee Paid: ${paymentAmount}`));
            console.log(chalk.yellow(`Balance: ${(myBalance += paymentAmount)}`));
        }
        else {
            console.log(chalk.white("\nExiting Student Management System....."));
        }
    }
    else {
        console.log(chalk.red(`Please enter Correct Amount!`));
    }
    const startAgain = await inquirer.prompt({
        type: "confirm",
        name: "continue",
        message: chalk.red("\nDo you want to Continue?\n"),
        default: false,
    });
    doStart = startAgain.continue;
}