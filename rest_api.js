const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const vision = require('@google-cloud/vision');
const txtomp3 = require("text-to-mp3");

const client = new vision.ImageAnnotatorClient({ // Insert your account authorization key here
  keyFilename : 'key.json'
});

client
  .labelDetection('ad.jpg')
  .then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => fs.appendFileSync('labels.txt', ' ' + label.description));
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

//The code to obtain the .mp3

setTimeout(function(){
  var contents = fs.readFileSync('labels.txt', 'utf8');
  txtomp3.saveMP3(contents, "labels.mp3");
}, 10000);







// Given below is the code for face detection and its properties using google api

// client
//     .faceDetection('ad.jpg')
//     .then(result => {
//       const face = result[0].faceAnnotations;
//
//       console.log('Faces:');
// face.forEach((face, i) => {
//   console.log(`  Face #${i + 1}:`);
//   console.log(`    Joy: ${face.joyLikelihood}`);
//   console.log(`    Anger: ${face.angerLikelihood}`);
//   console.log(`    Sorrow: ${face.sorrowLikelihood}`);
//   console.log(`    Surprise: ${face.surpriseLikelihood}`);
// });
// });
