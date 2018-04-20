## Test Voiceworks front end assignment

 - Create a React app with a form which behaves as follows
    - It will display the following drop down menus
      - A list of tanks types, loaded when data available
      - A list of tanks countries, loaded when data available
      - A list of tanks names, loaded when data available
      - A list of tanks ammunition types, available on page load
    - All lists are enabled when data is available.
    - When selecting an option in on of the list, the other lists are filtered accordingly.
    - At the bottom of the form all selections will be shown.
  - Your implementation should be
      - tested
      - visually attractive
      - deployable

### Example.
1. When USSR is selected all types and names that does nto belong to country USSR are filtered out
2. When selecting IS-7, only the tank type heavy, USSR country and the available ammunition are selectable

## Data library

The data is provided by a small mock api you can find in the `api` folder.

This api can be accessed by a the global variable `testApi` and provide a single method `fetchData`.

```
testApi.fetchData(callBack);
```

The callback is called with the full data list as first parameter.

```
testApi.fetchData(function(err, data) {
  console.log(data);
});
```

The data library can be used as a node module.

```
import testApi from './api';
testApi.fetchData(function(err, data) {
  console.log(data);
});
```

## Coding Assignment Evaluation Guidelines

To give you an idea what we expect from the implementation of the assignment we came up with
the following guidelines. In general, treat it as code that will go in production for one of our clients.

### Assignment
* Does the code work.
* Does the code come with instructions.
* Do all included artifacts have purpose.

### Code quality
* Is the code structured in a logical way.
* Is the code consistent.
* Does the code contain descriptive names.
* Is the code "" production ready.

### Testing
* Are there automated test.
* How are the tests written.
* What test cases are chosen.

### Design + CSS
* How much effort is taken into making the app look nice.
* Is user experience taken into consideration.
* How was the UI implemented.

## Originallity: This test was made from other tests I done as assignments in the past :)
