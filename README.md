# Vaccine-Bot
A minimal JS bot that interface with MOH Website to collect Vaccination Status.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)



## Table of Contents

- [Background](#background)
- [Technical Breif](#technical-brief)
- [Usage](#usage)
- [Sample Output](#sample-output)
- [Resources](#Resources)
- [License](#license)

## Background

From the first of Septemper 2021, the Supreme COVID Commite passed regulation prohibiting the entry of individuals to public venue and workplaces unless they had COVID Vaccination. Corporate and government institutes are mandated to check the vaccine status of thier employees and visitors alike, before they get allowed to enter workplace.

This utility is made to help organization on collecting Vaccinatino Status details including: Number Doses, Type of Vac, Location and the date where it was taken.

## Technical Breif
This code base is built using Node.js and will require node and npm to be avaible on your machine. The script uses Puppeteer to control a headless browser instance to fetch the required data. 

## Usage
1. Clone this repo to your machine.

```sh
$ git clone https://github.com/Ozeidi/Recursive-Tree.git
```
2. cd into the cloned dirctory:

```sh
$ cd LiL_Scraper
```
3. Install the required packages:
```sh
$ npm install
```
4. Launch the script as following. The first parameter is the link to flat file containing the courses URLS. The second parameter is the output file name. Output will be saved in the folder `data`

```sh
$ node  scraper.js  "data/LiL_URLs.csv"  "courses2.xlsx"

0 out of 91
Database Foundations: Database Management 
1 out of 91
Database Foundations: Intro to Databases 
2 out of 91
Database Foundations: Administration 
.....
```

## Sample Output
![Sample Output](img/sample.png?raw=true "Sample Output")
##  Resources
- [Puppeteer Documentation](https://pptr.dev/)
- [Aron Jack Tutorial on Scraping with JS](https://www.youtube.com/watch?v=TzZ3YOUhCxo&t=9s)

## License

[MIT](LICENSE) © Omar Al Zeidi
{"mode":"full","isActive":false}
