#1. Install env with:
npm i dotenv

#2. Make sure .env is added to gitignore file

#3. Add to top of index.js:
require("dotenv").config();

#3. Make port dynamic in index.js
console.log("heroku defined environment", process.env.NODE_ENV)

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`api on port ${port}`));

#5. Create .env file in root of app and define port environment here
NODE_ENV=development

#6. Add start script to package.json
"scripts": {
"server": "nodemon index.js",
"start": "node index.js"
},
