# Reddit Clone API

## API Url

Enter the url below into your browser to see a detailed list of all available endpoints and examples of their responses.

https://reddit-clone-nc.herokuapp.com/api

## Summary

An API for the purpose of accessing application data programmatically. 
The project mimics the real world backend service Reddit uses which serves up data to be presented by the front end architecture.

## Instructions for setup

-The minimum version of Node.js required is: v17.0.0\
-The minimum version of Postgres required is: v12.8\
-Clone repo into your desired directory\
-Install dependencies\
-Create .env files in root directory and set PGDATABASE to nc_news and nc_news_test\
-Setup local databases \
-Seed local database\
-Run tests\

Copy the commands below to complete the setup for this project:
You must have the minimum versions of Node.js and Postgres installed before running these commands.

```
git clone https://github.com/frajdouglas/reddit_clone.git

npm install -D

touch .env.development

echo PGDATABASE=nc_news >> .env.development

touch .env.test

echo PGDATABASE=nc_news_test >> .env.test

npm run setup-dbs

npm run seed

npm test

```
