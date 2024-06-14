#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.clear();
console.log(chalk.yellow(`======================================`));
console.log(chalk.bgMagenta.black(` Welcome to Student Management System `));
console.log(chalk.yellow(`======================================\n`));

class Student {
  static idCounter: number = 0;
  studentID: number;
  course: string[] = [];
  balance: number = 0;

  constructor(private name: string) {
    Student.idCounter++;
    this.studentID = this.generateStudentID();
  }
  generateStudentID() {
    return 100 + Student.idCounter; // 101 , 102 and so On
  }

  enrollCourse(course: string) {
    this.course.push(course);
    this.balance += 1000; // each course fees is 1000
  }

  viewBalance(): number {
    return this.balance; // pending balance of a student
  }

  payCoursesFee(amount: number) {
    this.balance -= amount; // this balance of student will - amount paid by student
  }

  showStatus() {
    console.log(chalk.red(`====================================`));
    console.log(
      chalk.green(`
      Name           : ${this.name.toUpperCase()} 
      Student ID     : ${this.studentID} 
      Course Enroled : ${this.course.join(", ")}  
      Balance        : ${this.balance}
      `)
    );
    console.log(chalk.red(`====================================`));
  }
  getStudentID() {
    return this.studentID;
  }
  getName() {
    return this.name;
  }
}
// Class Ends here

const students: Student[] = []; // Students list will be stored here
// mainMenu Start
async function mainMenu() {
  const userInputMenu = await inquirer.prompt({
    type: "list",
    name: "menu",
    message: "Select your Menu!",
    choices: [
      "1. Add New Student",
      "2. Enroll Student in Course",
      "3. View Student Balance",
      "4. Pay course fees",
      "5. Show Student Status",
      "6. End Menu",
    ],
  });

  // destructuring
  const { menu } = userInputMenu;

  if (menu === "1. Add New Student") await addNewStudent();
  if (menu === "2. Enroll Student in Course") await enrollStudent();
  if (menu === "3. View Student Balance") await viewBalance();
  if (menu === "4. Pay course fees") await payTuition();
  if (menu === "5. Show Student Status") await showStatus();
  if (menu === "6. End Menu") {
    console.log(
      chalk.bgBlue.white(` Thank you for using Student Management System\n`)
    );
    process.exit();
  }
  mainMenu();
}
// MainMenu Ends

// Start Creating functions
// addNewStudent start here
async function addNewStudent() {
  const userInput = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "Enter Student Name here!",
  });
  const student = new Student(userInput.name);

  students.push(student);
  console.log(
    `Student ${student.getName()} add with ID ${student.getStudentID()}\n`
  );
}
// addNewStudent end here
// enrollStudent Start here
async function enrollStudent() {
  const student = await selectStudent(); // we will create this function after

  if (student) {
    const userInput = await inquirer.prompt({
      type: "list",
      name: "course",
      message: "Select courses to enroll",
      choices: ["TypeScript", "JavaScript", "Python", "Next.js"],
    });
    student.enrollCourse(userInput.course);
    console.log(chalk.greenBright(`Successfully Enrolled in Course: ${userInput.course}`));
  }
}
// enrollStudent End here

// viewBalance Start here
async function viewBalance() {
  const student = await selectStudent();

  if (student) {
    console.log(`Student Balance: ${student.viewBalance()}`);
  }
}
// viewBalance End here
// payTuition Start here
async function payTuition() {
  const student = await selectStudent();
  if (student) {
    const userInput = await inquirer.prompt({
      type: "input",
      name: "amount",
      message: "Enter amount you want to pay: ",
    });
    student.payCoursesFee(parseFloat(userInput.amount));
    console.log(
      `Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`
    );
  }
}
// payTuition End here
// showStatus Start here
async function showStatus() {
  const student = await selectStudent();

  if (student) {
    student.showStatus();
  }
}
// showStatus End here

// selectStudent() Start Here
async function selectStudent() {
  if (students.length === 0) {
    console.log(chalk.red(`No Students record availabe.\n`));
  } else {
    const stdSelect = await inquirer.prompt({
      type: "list",
      name: "stdID",
      message: "Select a Student!",
      choices: students.map((std) => ({
        name: std.getName(),
        value: std.getStudentID(),
      })),
    });
    return (
      students.find((std) => std.generateStudentID() === stdSelect.stdID) ||
      null
    );
  }
}
// selectStudent() start here
mainMenu();
