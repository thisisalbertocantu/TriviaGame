$(document).ready(function(){
	
	var questions = [
		{
			question : "How many colors are there in the rainbow?",
			choices : ["6", "7", "8", "9"],
			answer : "7",
			correct : "assets/images/winner-1.gif",
			incorrect : "assets/images/wrong-1.gif",
			timeup : "assets/images/timeup-1.gif"
		},
		{
			question : "How many degrees are found in a circle?",
			choices : ["180", "190", "360", "90"],
			answer : "360",
			correct : "assets/images/winner-2.gif",
			incorrect : "assets/images/wrong-2.gif",
			timeup : "assets/images/timeup-2.gif"
		},
		{
			question : "What was the very first women's magazine called?",
			choices : ["Elle", "Vogue", "The Ladies Mercury"],
			answer : "The Ladies Mercury",
			correct : "assets/images/winner-3.gif",
			incorrect : "assets/images/wrong-3.gif",
			timeup : "assets/images/timeup-3.gif"
		},
		{
			question : "How many points does a compass have",
			choices : ["28", "29", "30", "32"],
			answer : "32",
			correct : "assets/images/winner-4.gif",
			incorrect : "assets/images/wrong-4.gif",
			timeup : "assets/images/timeup-4.gif"
		},
		{
			question : "Who composed the music for the ballets Sleeping Beauty and Swan Lake",
			choices : ["Tolstoi", "Tchaikovsky"],
			answer : "Tchaikovsky",
			correct : "assets/images/winner-5.gif",
			incorrect : "assets/images/wrong-5.gif",
			timeup : "assets/images/timeup-5.gif"
		},
		{
			question : "How many American cents make up a dime?",
			choices : ["10", "15", "25"],
			answer : "10",
			correct : "assets/images/winner-6.gif",
			incorrect : "assets/images/wrong-6.gif",
			timeup : "assets/images/timeup-6.gif"
		},
		{
			question : "How many strings does a cello have ?",
			choices : ["2", "3","4","5"],
			answer : "4",
			correct : "assets/images/winner-7.gif",
			incorrect : "assets/images/wrong-7.gif",
			timeup : "assets/images/timeup-7.gif"
		},
		{
			question : "Which fictional character was also known as Lord Greystoke?",
			choices : ["Tarzan", "Lord George", "Bugs Bunny"],
			answer : "Tarzan",
			correct : "assets/images/winner-8.gif",
			incorrect : "assets/images/wrong-8.gif",
			timeup : "assets/images/timeup-8.gif"
		},
		{
			question : "What was Che Guevara's nationality",
			choices : ["Argentinian", "Chilenian", "Brazilian", "Mexican"],
			answer : "Argentinian",
			correct : "assets/images/winner-9.gif",
			incorrect : "assets/images/wrong-9.gif",
			timeup : "assets/images/timeup-9.gif"
		},
		{
			question : "Which two numbers are used in binary code?",
			choices : ["0 and 1", "1 and 2", "1 and 10", "0 and 2"],
			answer : "0 and 1",
			correct : "assets/images/winner-10.gif",
			incorrect : "assets/images/wrong-10.gif",
			timeup : "assets/images/timeup-10.gif"
		}
	];

	/* DOM */
	var section = $("<section id='main'>");
	var row = $("<div class='row'>");
	var col = $("<div class='col-md-8 col-md-offset-2'>");
	var well = $("<div class='well'>");
	var h3 = $("<h3 class='text-center'>");
	var h4 = $("<h4 class='text-center'>");
	var button = $("<button class='btn btn-default'>");

	
	/*	========================================================
		Start the Game
		========================================================	*/

	$(".container").on("click", ".btn-start", function(){
		$(".game-rule").fadeOut(1000);
		setTimeout(game.loadQuestion, 1000);
	});

	/*	=============================================================
		User selects the answer to play
		=============================================================	*/

	$(".container").on("click", ".btn-answer", function(){
		section.html('');
		well.html('');
		clearInterval(game.setIntervalFlag);
		if($(this).attr('data-name') === questions[game.currentQuestion].answer){
			game.correctAnswer();
		}
		else{
			game.incorrectAnswer();
		}
	});

	/*	========================================================
		Once the result is shown, it will reset the question
		========================================================	*/
	$(".container").on("click", ".btn-reset", function(){
		game.reset();
	});

	var game = {
		/* Assigning 'questions' array to 'gameQuestions' */
		gameQuestions : questions,
		
		/* To keep track of current question */
		currentQuestion : 0,

		/* Trackers : To keep track of correct/incorrect answers and time left */
		correctAnswerCounter : 0,
		wrongAnswerCounter : 0,
		unanswerCounter : 0,
		timeCounter : 30,
		
		/* Flags To clearTimeout and to clearInterval */
		setIntervalFlag : '',
		setTimeoutFlag : '',

		
		/*	========================================================
				Load question and their choices from gameQuestions.
				Generate HTML elements.
				Keep timer go on.
			========================================================	*/
		loadQuestion : function(){
			// console.log("loadQuestion");
			clearTimeout(game.setTimeoutFlag);
			section.html('');
			well.html('');

			h3.html('Time Left : <span id="time-left">30</span>');
			game.setIntervalFlag = setInterval(game.timer, 1000);

			h4.html(game.gameQuestions[game.currentQuestion].question);
			well.append(h3).append(h4);

			for (var i = 0; i< game.gameQuestions[game.currentQuestion].choices.length; i++){
      			var button = $("<button class='btn btn-default btn-block btn-answer'>");
      			button.attr('data-name', game.gameQuestions[game.currentQuestion].choices[i]);
      			button.text(game.gameQuestions[game.currentQuestion].choices[i]);
      			well.append(button);
    		}

    		col.append(well);
			row.append(col);
			section.append(row);
			$(".container").append(section);
		},

		/*	==============================================
				Let the timer go on from 30 to 0 seconds.
				When timeCounter reaches 0, call timeUp().
			==============================================	*/
		timer : function(){
			game.timeCounter--;
			$("#time-left").text(game.timeCounter);
			if(game.timeCounter === 0){
				$("#time-left").text('Time Up !');
				game.timeUp();
			}
		},

		/*	========================================================
				If user doen't select any answer in given time,
				execute this function.
			========================================================	*/
		timeUp : function(){
			// console.log("timeUp");
			clearInterval(game.setIntervalFlag);
			game.unanswerCounter++;
			game.generateHTML('', '', 'There is no more time :( !', 'Correct Answer is : ' + game.gameQuestions[game.currentQuestion].answer);
			game.gifGenerator(game.gameQuestions[game.currentQuestion].timeup, "Time-up");
			game.currentStatus();
		},

		/*	========================================================
				Keep track of correctAnswerCounter and generate gif
			========================================================	*/
		correctAnswer : function(){
			// console.log("correctAnswer");
			game.correctAnswerCounter++;
			game.generateHTML('', '', 'Congrats, You are right.', game.gameQuestions[game.currentQuestion].answer);
			game.gifGenerator(game.gameQuestions[game.currentQuestion].correct, "Correct");
			game.currentStatus();
		},

		/*	========================================================
				Keep track of wrongAnswerCounter and generate gif
			========================================================	*/
		incorrectAnswer : function(){
			// console.log("incorrectAnswer");
			game.wrongAnswerCounter++;
			game.generateHTML('', '', 'Ups, unfortunately it is not correct!!!', 'Correct answer is : ' + game.gameQuestions[game.currentQuestion].answer);
			game.gifGenerator(game.gameQuestions[game.currentQuestion].incorrect, "Incorrect");
			game.currentStatus();
		},

		/*	========================================================
				Generate/Display GIF image based on answer
			========================================================	*/

		gifGenerator : function(paramSrc, paramAlt){
			var row = $("<div class='row'>");
			var col = $("<div class='col-md-6 col-md-offset-3'>");
			var img = $("<img class='img-responsive text-center'>");
			
			img.attr({
				src: paramSrc,
				alt: paramAlt,
				width: '100%'
			});
			col.append(img);
			row.append(col);
			well.append(row);
		},

		/*	========================================================
				Checks if there are questions available	in gameQuestions or not.
				If yes, go to next question.
				If no, print result.
			========================================================	*/
		currentStatus : function(){
			if(game.currentQuestion === game.gameQuestions.length - 1){
      			setTimeout(game.result, 5000);
    		}else {
      			setTimeout(game.nextQuestion, 5000);
    		}
		},

		/*	========================================================
				Load next question from gameQuestions if there is.
				If there isn't, call result()
			========================================================	*/
		nextQuestion : function(){
			// console.log("nextQuestion");
			game.timeCounter = 30;
			game.currentQuestion++;
			
			if(game.currentQuestion < game.gameQuestions.length)
				game.setTimeoutFlag = game.loadQuestion();
			else
				game.setTimeoutFlag = game.result();
		},

		/*	========================================================
				Generate result based on users answer.
			========================================================	*/

		result : function(){
			// console.log(game.correctAnswerCounter + " " + game.wrongAnswerCounter);
			clearTimeout(game.setTimeoutFlag);
			game.generateHTML('', '', 'Result', 'Total Correct : ' 
				+ game.correctAnswerCounter + " " 
				+ 'Total Incorrect : ' + game.wrongAnswerCounter + " "
				+ " " + 'Total Unanswered : ' + game.unanswerCounter);
			var button = $("<button class='btn btn-default btn-block btn-reset'>");
			button.text('Reset');
			well.append(button);
		},


		/*	========================================================
				Reset the Game
			========================================================	*/
		reset : function(){
			// console.log("reset");
			game.currentQuestion = 0;
			game.correctAnswerCounter = 0;
			game.wrongAnswerCounter = 0;
			game.timeCounter = 30;
			clearTimeout(game.setTimeoutFlag);
			clearInterval(game.setIntervalFlag);
			game.setIntervalFlag = '';
			game.setTimeoutFlag = '';
			section.html('');
			well.html('');
			game.loadQuestion();
		},

		/*	========================================================
				Generic function to generate HTML Page/Section
			========================================================	*/
		generateHTML : function(sectionTag, wellTag, h3Tag, h4Tag){
			
			section.html(sectionTag);
			well.html(wellTag);
			
			h3.html(h3Tag);
			h4.text(h4Tag);
			
			well.append(h3).append(h4);
			col.append(well);
			row.append(col);
			section.append(row);
			
			$(".container").append(section);
		}
	}
});