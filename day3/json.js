// Declare JSON
var obj = {
    name: "John",
    age: 20
}

// Print out all properties from JSON
console.log(obj);

// Print out specific property from JSON
console.log(obj.name);

// Add property into JSON
obj.gender = "male";
console.log(obj);

// Update property from JSON
obj.gender = "female";
console.log(obj);

// Delete property from JSON
delete obj.gender;
console.log(obj);

// Convert String to JSON
var jsonString = `{"name": "Doe", "age": 20}`;
var jsonObj = JSON.parse(jsonString);
console.log(jsonString);
console.log(jsonObj);

// Convert JSON to String
var converted = JSON.stringify(obj);
console.log(converted);