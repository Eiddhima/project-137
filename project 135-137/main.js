input_text = "";
status = "";
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();  
	video = createCapture(VIDEO);
	video.hide();
  video.size(300,290);
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  input_text = document.getElementById("input").value;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects_gotten; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          console.log(objects.length);
 
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects[i].label == input_text)
        {
          video.stop();
          objectDetector.detect(gotResult);
          document.getElementById("object_gotten").innerHTML = input_text+"is found";
          var synth = window.speechSynthesis;
          var utterThis = new SpeechSynthesisUtterance(input_text+"is found");
          synth.speak(utterThis);
        }
        else {
             document.getElementById("object_gotten").innerHTML = input_text+" is not found";
        }
      }
}


function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}