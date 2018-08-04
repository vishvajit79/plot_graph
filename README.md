# React Plot Graph Web App

Install 
```shell
npm i
```

Start JSON Server
```angular2html
json-server --watch --port=7000 db.json
```

React App


For Prod
```angular2html
npm build
```
```angular2html
serve -s build
```

For Dev Hot Reload
```angular2html
npm start
```


#User Guide

1. This application is made with react.js and es6
2. This application uses external libraries such as axios, json-server, d3@js function plot and bootstrap
3. After running the json-server only, start the frontend(react)
4. After you have successfully launched the application, you will see a dashboard where user can type equation and also provide boundaries for x-axis and then click on draw button to plot the graph. 
5. User can also print the canvas only using print button 
6. User can also select the previous graph plotted from the history panel. To update the history panel, please click update button and it will manually fetch the data from json-server
7. Upon wrong values, graph won't be displayed and all the previous history of the equation can be checked using 
```
http://localhost:7000/history
```
8. After all the dependencies are installed, this app can be run offline.

##Thank you for your time and patience! :)

