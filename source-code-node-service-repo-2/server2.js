const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/process', (req, res) => {
  const { fileName, product } = req.body;
  console.log("Request received on server2")
  console.log("FileName: ", fileName)
  console.log("Product: ", product)

  const filePath = "/ashish_PV_dir/" + fileName;
  // const filePath = "/Users/lib-user/Documents/MACs-Winter24/Cloud-Computing/Assignments/Assignment-4-Kubernetes/gke-deployment/volume/" + fileName;
  console.log(filePath);
  
  fs.readFile(filePath, 'utf8', (err, fileData) => {
    console.log("Inside read file");
    if (err) {
      console.log("Error in reading file");
      return res.status(404).json({error: 'File not found.' });
    }
    console.log("Data", fileData)
    const lines = fileData.split('\n');
    console.log()
    if (lines.length <= 1 || (lines[0].trim() !== 'product, amount' )) {
      return res.status(400).json({ error: 'Input file not in CSV format.'});
    }

    let sum = 0;
    console.log("Calculating Sum -> ")
    lines.slice(1).forEach((line) => {
      const [prod, amount] = line.split(',');

      if (prod.trim() === product && !isNaN(amount)) {
        sum += parseInt(amount, 10);
      }
    });

    res.json({ sum });

  })

});

app.listen(PORT, () => {
  console.log(`Server 2 is running on http://localhost:${PORT}`);
});
