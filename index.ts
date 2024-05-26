#! /usr/bin/env node

import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns";
import chalk from "chalk";

console.log(chalk.greenBright.bold("\t <=======================================================>"));
console.log(chalk.redBright.bold("\t <=====> Welcome to Sami-Developer Countdown Timer <=====>"));
console.log(chalk.greenBright.bold("\t <=======================================================>"));

let res = await inquirer.prompt([
    {
        name:"userInput",
        type:"number",
        message:"Please enter the amount of second:",
        validate: (input)=>{
            if(isNaN(input)){
                return "Please enter valid number"
            }else if (input > 60){
                return "Seconds must be in 60 "
            }else {
                return true;
            }
        }
    }
]);

let input = res.userInput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() +val);
    const intervalTime = new Date(intTime);
    setInterval((()=>{
        const currTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currTime);

        if (timeDiff <= 0){
            console.log(chalk.blue.bold("Timer has expired"));
            console.log(chalk.greenBright.bold("<================================================================>"));
            process.exit()
        }
        const min = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff%60)
        console.log(chalk.redBright.bold(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
        
    }),1000)
}
startTime(input)

