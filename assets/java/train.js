 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyAm6ODozmInXMXcB92XHPqzULyWJxzfPEo",
     autdDomain: "train-scheduler-681de.firebaseapp.com",
     databaseURL: "https://train-scheduler-681de.firebaseio.com",
     projectId: "train-scheduler-681de",
     storageBucket: "",
     messagingSenderId: "953113919199"
 };
 firebase.initializeApp(config);

 // Create a variable to reference tde database
 var database = firebase.database();

 //variables to hold our inputs
 var trainName = "";
 var destination = "";
 var firstTime = "";
 var frequency = "";

 //click function witd an event listener to submit
 $("button").on("click", function (event) {
     event.preventDefault();

     //get inputs
     trainName = $("#name-input").val().trim();
     destination = $("#destination-input").val().trim();
     firstTime = $("#time-input").val().trim();
     frequency = $("#frequency-input").val().trim();

     $("#name-input").val("");
     $("#destination-input").val("");
     $("#time-input").val("");
     $("#frequency-input").val("");

     //change what is saved in firebase
     database.ref().push({
         trainName: trainName,
         destination: destination,
         firstTime: firstTime,
         frequency: frequency
     });

 });

 database.ref().on("child_added", function (childSnapshot) {

     trainName = childSnapshot.val().trainName;
     destination = childSnapshot.val().destination;
     firstTime = childSnapshot.val().firstTime;
     frequency = childSnapshot.val().frequency;

     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     var currentTime = moment();
     console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

     var tRemainder = diffTime % frequency;
     console.log(tRemainder);

     var tMinutesTillTrain = frequency - tRemainder;
     console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

     var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     $("#addTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td>");
 }, function (errorObject) { 
    console.log("Errors handled: " + errorObject.code);
  });