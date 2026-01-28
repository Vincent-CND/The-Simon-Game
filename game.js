$(document).ready( function(){
    
    let buttonColors = ["red","blue","green","yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let startingFlag = false;
    let level = 0;

    function nextSequence() {
        let randomNumber = Math.floor(Math.random()*4);

        var randomChoseColor = buttonColors[randomNumber];
    
        gamePattern.push(randomChoseColor);
        
        $("#" + randomChoseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

        playsound(randomChoseColor)
    };
    function playsound(name){
        if (name === "red"){
            var red_audio = new Audio("./sounds/red.mp3")
            red_audio.play()}
        else if (name === "blue"){
            var blue_audio = new Audio("./sounds/blue.mp3")
            blue_audio.play()
        }
        else if(name === "yellow"){
            var yellow_audio = new Audio("./sounds/yellow.mp3")
            yellow_audio.play()
        } 
        else if(name === "green"){
            var green_audio = new Audio("./sounds/green.mp3")
            green_audio.play()
        }
    }

    function animatePress(currentColour){
        $(currentColour).addClass("pressed")
        setTimeout( () => {$(currentColour).removeClass("pressed")},100)
    }

    function checkAnswer(currentLevel){
        
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");
            if (gamePattern.length === userClickedPattern.length){
                console.log("done");
                setTimeout( () => {nextSequence()},1000)
                userClickedPattern = [];
                level ++ 
                $("h1").text("Level " + level);

        }
        } else {
            console.log("defeat");
            $("body").addClass("game-over")
            setTimeout(() => {$("body").removeClass("game-over")},200)
            var wrong_audio = new Audio ("./sounds/wrong.mp3")
            wrong_audio.play()
            $("h1").text("Game Over, Press Any Key to Restart")
            startOver();
        }

    }

    function startOver(){
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        startingFlag = false;
    }

    $(".btn").click( function()  {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playsound(userChosenColour);
        animatePress($(this));
        

        checkAnswer(userClickedPattern.length - 1)
        }
    )


    $(document).keypress( (event) => {
        if(!startingFlag){
            nextSequence()
            level ++;
            $("h1").text("Level " + level)
            startingFlag = true;
            // level ++;

        }
    })


}
)