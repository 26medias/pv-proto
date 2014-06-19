@echo off
nodemon ./main.js -port 2000 -online false -timeout 120000 -threads 1 -debug_mode true -db pagevamptest -mongo_remote false -monitor true -appid 510895515589069 -appsecret 727c0783abe7298fc61d3f9941b35454
pause