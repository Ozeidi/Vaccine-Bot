# Vaccine-Bot
A minimal JS bot that interface with MOH Website -below- to collect Vaccination Status.
https://covid19.moh.gov.om/#/check-certificate

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)



## Table of Contents

- [Background](#background)
- [Technical Breif](#technical-brief)
- [Usage](#usage)
- [Sample Output](#sample-output)
- [Resources](#Resources)
- [License](#license)

## Background

From the first of Septemper 2021, the Supreme COVID Commite passed regulation prohibiting the entry  to any public venue or workplaces wihout proof of COVID Vaccination. Corporate and government institutes are mandated to check the vaccine status of thier employees and visitors alike, before they are allowed to enter workplace.

This utility is made to help organization on collecting Vaccinatino Status details including: Number Doses, Type of Vac, Location and the date where it was taken. The takes a batch of civil ids from CSV file and pass to MOH website to collect the vaccine details.

## Technical Breif
This code base is built using Node.js and will require node and npm to be avaible on your machine. The script uses Puppeteer to control a headless browser instance to fetch the required data. 

## Usage
1. Clone this repo to your machine.

```sh
 git clone https://github.com/Ozeidi/Vaccine-Bot.git
```
2. cd into the cloned dirctory:

```sh
cd Vaccine-Bot
```
3. Install the required packages:
```sh
 npm install
```
on some systems you may still need to install chromium browser with puppeteer
```sh
node node_modules/puppeteer/install.js
```
4. Launch the script as following. The first parameter is the link to flat file containing the Civil IDs=. The second parameter is the output file name.

```sh
 node covid_bot.js "data/ID.csv" "data/scrap.xlsx"

 CivilID: '*****\r',
  Status: '1st Dose\t\n' +
    'Pfizer/BioNTech\n' +
    'Manah Health Center\n' +
    '\t05-04-2021\n' +
    '(174 Days ago)\n' +
    '\n' +
    '2nd Dose\t\n' +
    'Pfizer/BioNTech\n' +
    'Manah Health Center\n' +
    '\t16-06-2021\n' +
    '(102 Days ago)'
}
.....
```

##  Resources
- [Puppeteer Documentation](https://pptr.dev/)
- [Aron Jack Tutorial on Scraping with JS](https://www.youtube.com/watch?v=TzZ3YOUhCxo&t=9s)

## License

[MIT](LICENSE) © Omar Al Zeidi
{"mode":"full","isActive":false}
