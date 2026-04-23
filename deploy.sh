#!/bin/bash
npm run build
scp -r ./build/* axelds@stellar-burgers39.ru:/var/www/stellar-burgers39.ru/
echo "Готово!" 
