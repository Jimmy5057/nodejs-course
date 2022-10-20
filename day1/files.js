const fs = require('fs');

// Reading files
fs.readFile('./assets/doc.txt', (err, data) => {
    if (err) {
        console.log(err); // Output error message
        return;
    }
    console.log(data.toString()); // Output file as String
})

// Writing files
fs.writeFile('./assets/doc1.txt', "Yo World!", () => {
    console.log("File is written");
});

// Directories
fs.mkdir("./docs", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Folder Created");
})

// Check if directories exist, if exist then delete
if (!fs.existsSync('./docs')) {
    // If not exist
    fs.mkdir("./docs", (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Folder Created");
    })
} else {
    // If exist
    fs.rmdir('./docs', (err)=> {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Folder Deleted");
    })
}

// Deleting Files
if (fs.existsSync('./docs')) {
    // If exist
    fs.unlink('./assets/doc1.txt', (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("File deleted");
    })
}