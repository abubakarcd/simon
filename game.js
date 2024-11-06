     //randpmcolor storing in array of server
 var gamePattern=[];
 

//random color of user
var userClickedPattern=[];
//randomcolor
var buttonColors = ["red", "blue", "green","yellow"];

 //keypress detection
 $(document).on("keypress",propertiesByServer);
 
 function propertiesByServer(){
    //chnaging states
    var randomChosenColor=buttonColors[nextSequence()];

     //playing sound when game is started
     playSound(randomChosenColor);

     //saving in array
     gamePattern.push(randomChosenColor);
     
     //flash
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    
 }


var level =0;//level value

//random number generate
function nextSequence(){
    
    var randomNumber=Math.random()*4;
    //changing h1 when game is started
    $("h1").text("Level "+level);
    level=level+1;
    userClickedPattern=[];
    
    return Math.floor(randomNumber);
}

//handling button when it is pressed

$(".btn").on("click",function(){

    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
   //calling sound function
   playSound(userChosenColor);

   // calling animation function
   animatePress(userChosenColor);

   //calling check function
   checkAnswer(userClickedPattern.length);

});

//function to play sound 
function playSound(name){
     //audio playing
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//funtion to add animations when button is pressed
function animatePress(currentColour){
$("."+currentColour).addClass("pressed");
//setting timeout
setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
},100);
}
var j=0;
// //function to check colors 
function checkAnswer(currentlevel){
    //checking if arrays length is same for user and server.
 if(gamePattern.length==currentlevel){
    //checking sequence of arrays
    for (var i =0 ; i<=gamePattern.length;i++){
        if(gamePattern[i]==userClickedPattern[i]){

        j=1;
        
    }else{
        j=0;
        break;
    }
    
}if(j==1){
               
 setTimeout(propertiesByServer,1000);
    }
    else {
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
       
       $("body").addClass("game-over");
       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);

       $("h1").text("Game over , Press any key to restart.");
       
       setTimeout(startOver,1000);
    }

}

}
function startOver(){
 level=0;
 gamePattern=[];
 
 
}

