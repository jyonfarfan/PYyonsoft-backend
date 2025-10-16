para que el package.json corra bien con el NPM RUN DEV tengo que instalar esto

npm install --save-dev cross-env

esto sirve para que lea windows la forma correcta el cross-env

"scripts": {
"dev": "cross-env NODE_ENV=development nodemon src/index.ts",
"dev:api": "nodemon src/index.ts --api",
"build": "tsc",
"start": "cross-env NODE_ENV=production node ./dist/index.js"
},
