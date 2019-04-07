 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyAm6ODozmInXMXcB92XHPqzULyWJxzfPEo",
     authDomain: "train-scheduler-681de.firebaseapp.com",
     databaseURL: "https://train-scheduler-681de.firebaseio.com",
     projectId: "train-scheduler-681de",
     storageBucket: "",
     messagingSenderId: "953113919199"
 };
 firebase.initializeApp(config);

 // Create a variable to reference the database
 var database = firebase.database();

 //variables to hold our inputs
 var trainName = "";
 var destination = "";
 var trainTime;
 var frequency;
 console.log(this);
 //click function with an event listener to submit
 $("click-button").on("click", function (event) {
     event.preventDefault();

     //get inputs
     trainName = $("#name-input").val().trim();
     destination = $("#destination-input"),val().trim();
     trainTime = $("#time-input").val().trim();
     frequency = $("#frequency-input").val().trim();

     //change what is saved in firebase
     database.ref().set({
         trainName: trainName,
         destination: destination,
         trainTime: trainTime,
         frequency: frequency
     });

 });