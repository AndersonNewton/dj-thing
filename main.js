var track_1 = "";
var track_2 = "";
var status_1 = "";
var status_2 = "";

leftWX = 0;
leftWY = 0;
rightWX = 0;
rightWY = 0;
score_left = 0;
score_right = 0;

function preload() {

    track_1 = loadSound("music.mp3");
    track_2 = loadSound("music2.mp3");

}

function setup() {

    canvas = createCanvas(400, 500);
    canvas.position(725, 220);
    video = createCapture(VIDEO);
    video.hide();
    modal = ml5.poseNet(video, model_loaded);
    modal.on('pose', got_result);


}

function draw() {
    image(video, 0, 0, 470, 550);
    fill("red");
    stroke("red");
    status_1 = track_1.isPlaying();
    status_2 = track_2.isPlaying();
    if (score_left > 0.2) {
        circle(leftWX - 95, leftWY, 13);
        track_2.stop();
        if(status_1 == false){
            track_1.play()
            document.getElementById("songnm").innerHTML = "Peter Pan";
        }
        
    }
    if (score_right > 0.2) {
        circle(rightWX - 60, rightWY - 15, 13);
        track_1.stop();
        if(status_2 == false){
            track_2.play();
            document.getElementById("songnm").innerHTML = "Harry Potter Theme";
        }
        
    }
    



}

function model_loaded() {

    console.log("Model Loaded");


}

function got_result(results) {

    if (results.length > 0) {
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        score_right = results[0].pose.keypoints[10].score;

        leftWX = results[0].pose.leftWrist.x;
        leftWY = results[0].pose.leftWrist.y;
        // Left Wrist X : 236.68 & Y : 162.78
        //console.log("Left Wrist X : " +leftWX+ "& Y: " +leftWY);

        rightWX = results[0].pose.rightWrist.x;
        rightWY = results[0].pose.rightWrist.y;
        //console.log("right Wrist X : " +rightWX+ "& Y: " +rightWY);

    }

}



/*volume - track_name.setVolume(level)
level = 0 - 1 

Full Volume - 1
High Volume - 0.9
medium High - 0.8
little High - 0.7
Medium Volume - 0.5
little Low - 0.3
Very Low - 0.1
No volume - 0



Speed - Rate of the Track -- track_name.rate(level)
speed - 0.25 - 2.5

0.5 - Slow
1 - Normal
1.5 - Fast
2 - Twice as fast as Normal
2.5 - High Speed

*/



function playMusic() {

    track.play();
    track.setVolume(0.4);
    track.rate(1)

}

function stopMusic() {

    track.pause();

}