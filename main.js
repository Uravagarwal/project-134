state= "";
video = "";
object = [];
sound = "";
function preload()
{
   sound = loadSound("lovetone.mp3");
}

function setup()
{
   canavs = createCanvas(400,400);
   canavs.center();
   video.hide();
}

function draw()
{
   image(video,0,0,400,400);
   if(state != "")
   {
    intialize.detect(video, res);
    for(a=0;a<object.length;a++)
    {
        document.getElementById("status").innerHTML="Status: Object Detecting";
        document.getElementById("number_of_objects").innerHTML="number of objects: "+object.length;

        fill ("red");
        p = floor(object[a].confidence)*100;
        stroke ("yellow");
        nofill ();
        text(object[a].label ,object[a].x , object[a].y);
        rect(object[a].x , object[a].y,object[a].width , object[a].height);
        if(object[0].label == "person")
        {
          document.getElementById("status").innerHTML="Baby detected";
          sound.stop();
        }
        else
        {
          document.getElementById("status").innerHTML="Baby not detected";
          sound.play();
        }
        if(object.length == 0)
        {
           document.getElementById("status").innerHTML="Baby not detected";
          sound.play();
        }
    }
   }
}

function start()
{
    intialize = ml5.objectDetector("cocossd", hi);
    document.getElementById("status").innerHTML="Status: Object Detecting";
}

function hi()
{
    console.log("model loaded");
    state = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function res(error,result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        object = result;
    }
}