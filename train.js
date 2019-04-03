$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYT2TEbZC0FISiR6AfWBP9GlicoLmv5mc",
    authDomain: "train-76b14.firebaseapp.com",
    databaseURL: "https://train-76b14.firebaseio.com",
    projectId: "train-76b14",
    storageBucket: "train-76b14.appspot.com",
    messagingSenderId: "308147866128"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  //capture click submit button
  $("#submit").on("click", function() {
    // grab inputs from HTML
    var name = $("#name")
      .val()
      .trim();
    console.log(name);
    var destination = $("#destination")
      .val()
      .trim();
    // console.log(destination);
    var time = $("#requestTime")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();
    database.ref().push({
      name,
      destination,
      time,
      frequency
    });
  });

  database.ref().on("child_added", function(childSnapshot) {
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var freq = childSnapshot.val().frequency;
    // console.log(dest);

    //time fun
    var freq = parseInt(freq);

    var currentTime = moment();

    var dConverted = moment(childSnapshot.val().time, "HH:mm").subtract(
      1,
      "years"
    );

    var trainTime = moment(dConverted).format("HH:mm");

    var tConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    var tDifference = moment().diff(moment(tConverted), "minutes");

    var tRemainder = tDifference % freq;

    var minsAway = freq - tRemainder;

    var nextTrain = moment().add(minsAway, "minutes");

    //add trains
    $("#currentTime").text(currentTime);
    $("#trainTable").append(
      "<tr><td id='nameDisplay'>" +
        childSnapshot.val().name +
        "</td><td id='destDisplay'>" +
        childSnapshot.val().dest +
        "</td><td id='freqDisplay'>" +
        childSnapshot.val().freq +
        "</td><td id='nextDisplay'>" +
        moment(nextTrain).format("HH:mm") +
        "</td><td id='awayDisplay'>" +
        minsAway +
        " minutes until arrival" +
        "</td></tr>"
    );
  });
});
