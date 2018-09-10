# json-calendar

A (JSON) data model for displaying dates and date ranges on a calendar interface.

### Usage

```js
var Calendar = require("../index");
var data = new Calendar();
```

### Get an array of weeks in this month

```js
console.log("Weeks this month:", data.weeks.length);
```

### Get an array of month names

```js
console.log("Month names", data.monthNames);
```
