const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const path = require('path')

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());


app.post('/store-file', (req, res) => {
  const { file, data } = req.body;

  if (!file || !data) {
    return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
  }

  // const filePath = "/Users/lib-user/Documents/MACs-Winter24/Cloud-Computing/Assignments/Assignment-4-Kubernetes/gke-deployment/volume/" + file;
  // Container Application
  const filePath = "/ashish_PV_dir/" + file;
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ file, error: 'Error while storing the file to the storage.' });
    }
    res.json({ file, message: 'Success.' });
  });
});

app.get("/", (req,res) => {
  res.status(200).json({ message: "You are viewing container 1 deployed on Kubernetes - 3 CICD Test - Always Image" })
})
app.post('/calculate', (req, res) => {
  const { file, product } = req.body;

  if (!file || !product) {
    return res.status(400).json({ file, error: 'Invalid JSON input.' });
  }
    console.log("Request to Server 2");
    axios.post('http://gke-node-service-2:3001/process', { fileName: file, product }) // change here --> servername
      .then((response) => {
        res.json({ file, ...response.data });
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response);
          res.status(500).json({ file, ...error.response.data });
        }
        else{
        console.log("Error line 38 \n", error)
        res.status(500).json({ file, error: "Internal Server Error" })
        }
      });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.log("Here check --> issue - line 60")
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.log("Here check --> issue - line 65")
});

app.listen(PORT, () => {
  console.log(`Server 1 is running on http://localhost:${PORT}`);
});


// New comment