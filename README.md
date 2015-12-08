# ABInbev B2B Dashboard

## Preparing

```
npm install
```

## Running

```
npm start
```

## Endpoints

### Dashboard B2B APIS Health 
http://localhost:8000/app/index.html#/api - Iterates between each country environment with a default delay of 5000 milliseconds (configurable) 
http://localhost:8000/app/index.html#/api?environment=mx - Fixed environment 
http://localhost:8000/app/index.html#/api?delay=5000 - Iterates between each country environment with the customized delay (in milliseconds)  