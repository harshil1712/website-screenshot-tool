const readlineSync = require('readline-sync');
require('dotenv').config();
const TransloaditClient = require('transloadit')
const transloadit       = new TransloaditClient({
  authKey   : process.env.AUTH_KEY,
  authSecret: process.env.AUTH_SECRET
})

console.log('Welcome to Website Screenshot Tool');

var URL = readlineSync.question('Enter the url: ');

const params = {
    steps: {
        "screenshot": {
            "robot": "/html/convert",
            "result": true,
            "format": "png",
            "url": `${URL}`,
            "width": 1024
          },
          "resized": {
            "use": "screenshot",
            "robot": "/image/resize",
            "result": true,
            "gravity": "top",
            "height": 768,
            "imagemagick_stack": "v2.0.3",
            "resize_strategy": "fillcrop",
            "width": 1024,
            "zoom": false
          }
    },
  }
  
//   Upload image and create assembly.
  const opts = {
    params           : params,
    waitForCompletion: true
  }

  transloadit.createAssembly(opts, (err, result = {}) => {
    if (err) {
        console.log('It seems you entered an invalid URL.')
    } else {
        console.log(`Done. You can view the result at: ${JSON.stringify(result.results.screenshot[0].url)}`)
    }

  }, ({assemblyProgress}) => {
    // console.log(assemblyProgress)
  })