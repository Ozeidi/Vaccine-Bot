/*
    ***************************************************
    ***************************************************
    Script: COVID Vaccination Bot
    Author: OZeidi
    Description: JS Puppeteer-based utility to collect Vaccination Status based on Civil ID from: https://covid19.moh.gov.om/#/check-certificate
    Version: V1.0
    Last Modification: 20th Sep 2021
    ***************************************************
    ***************************************************

*/

// Required Packages
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
const { start } = require('repl');
// Utility function to convert JSON file to XLSX
const convert = require('./convert.js')
// Function to sum up array elements
const arrSum = (previousValue, currentValue) => previousValue + currentValue;



function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

// Fetch  Text form page HTML based on XPATH 
async function fetchText(page, xpath){
    const [res] = await page.$x(xpath);
    const txt = await res.getProperty('innerText');
    const rawTxt = await txt.jsonValue();
    return(rawTxt);

}


async function fetchInnerHTML(page, xpath){
    const [res] = await page.$x(xpath);
    const txt = await res.getProperty('innerText');
    const rawTxt = await txt.jsonValue();
    return(rawTxt);

}

// Remove repeating whites space/newlines from fetched text
String.prototype.allTrim = String.prototype.allTrim ||
     function(){
        return this.replace(/\s+/g,' ')
                   .replace(/^\s+|\s+$/,'');
     };

//*[@id="mat-form-field-label-3"]/mat-label

// Fucntion used to fetch the data from a course page
 async function scrapePage(page, id){
    let res = ""
    await page.waitForXPath('//*[@id="mat-input-1"]');


    const idTxtBox = await page.$x('//*[@id="mat-input-1"]');
    await idTxtBox[0].focus()
    //await page.focus('#mat-input-1');
    await page.keyboard.type(id);
    

    console.log("ID INPUTTED");

    //await page.click("#loader > main > vacccert > div > div.form-panel > div > button");
    await page.$eval('#loader > main > vacccert > div > div.form-panel > div > button', elem => elem.click());
    console.log("CLICKED");
    
    await page.waitForXPath('//*[@id="loader"]/main/vacccert/div/div[4]')
    //await page.waitForXPath('//*[@id="loader"]/main/vacccert/div/div[4]/div[1]/div/div/div[2]/b');
    try {
        res = await fetchText( page, '//*[@id="loader"]/main/vacccert/div/div[4]/div[2]/table');
    } catch (error) {
        res = "NOT VACCINATED"
        
    }
    

    // GO BACK
    await page.$eval('#loader > main > vacccert > div > div.wizard-panel.ng-star-inserted > div.text-center > button', elem => elem.click());
    //sleep(5000);
    res = {'CivilID': id,
            'Status': res};
    return(res)

}

// Wraper to iterate over lis of courses
async function Crawl(inputFile, outputFile){
    var browser =   await puppeteer.launch();
// Uncomment this block if you wich to see the browser window
//     var browser = await puppeteer.launch({ 
//         headless: false,
//         defaultViewport: null,
//         args: ['--start-maximized'] 
//   });


    var page = await  browser.newPage();

    const url = 'https://covid19.moh.gov.om/#/check-certificate';
    await page.goto(url);

    let ids = fs.readFileSync(inputFile, "utf8");
    ids = ids.split("\n");
    ids = ids.slice(1);

    console.log(ids.length);
    
    let len = ids.length;
    let lst = []
    for (const [i, item] of ids.entries()) { 
        let civilID = item.split(",")[1];
        console.log(`${i} out of ${len}`)
        console.log(item);
        console.log(civilID);
        
        
        let res =await scrapePage(page, civilID);
        lst.push(res);
        console.log(res)
        //await page.goBack();
        if (i%1 == 0){
            let data = JSON.stringify(lst);
            fs.writeFileSync(`${outputFile}.json`,data,"utf-8");
            convert.toXlsx(lst, `${outputFile}`);
        }
    }

    let data = JSON.stringify(lst);
    fs.writeFileSync(`${outputFile}.json`,data,"utf-8");
    convert.toXlsx(lst, `${outputFile}`);
    browser.close();
}


let  args = process.argv.slice(2);
console.log(args)

Crawl(args[0], args[1])
