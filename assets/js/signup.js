// array of circles
var circles = [];

// position where circles shouldn't be close to, center of form
var xPos = 0, yPos = 0;


// css site recommended debouncing for this part so can look laggy but better for site
var resizeTimer;

$(window).on('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
  	yPos = view.size.height/2; xPos = view.size.width/2;
  	console.log(xPos+' '+yPos+' '+$('div').css('height')+ ' ' + $('div').css('width'));
	$('#sign').css('top', (yPos = view.size.height/2)-parseFloat($('div').css('height'))/2+'px');
	$('#sign').css('left', (xPos = view.size.width/2)-parseFloat($('div').css('width'))/2+'px');
  }, 100);
});


// On load, set position and clear out any "Thank you for submission" thingies.
$(document).ready(function()
{
	$('.msg').fadeOut(2000);
	console.log($('div').css('height')+ ' ' + $('div').css('width'));
	$('#sign').css('top', (yPos = view.size.height/2)-parseFloat($('div').css('height'))/2+'px');
	$('#sign').css('left', (xPos = view.size.width/2)-parseFloat($('div').css('width'))/2+'px');
	$('#sign').show();
});


// dictionary of sounds
var sounDict = [];


//set up music arrays
var numPercussion = 36, numMusic = 33; 
var percussion = [], music = [];
for(var i=0; i<numPercussion; i++) percussion.push(i+1);
for(var i=0; i<numMusic; i++) music.push(i+1);

var pC = 0, pM = 0;
var allNums = [];
function getSound(ch)
{

	var num = (ch+'').charCodeAt(0);

	
	// stringy thingy for returning
	mFile = '';

	// if character previously assigned to sound
	if(ch in sounDict)
	{
		mFile = sounDict[ch];
	}
	//otherwise if it's a left-side of keyboard (roughly :p), return percussion
	else if(num < 70 || 'qwertyuiop'.includes(ch))
	{
		pC ++;
		//if out of percussion, return p1
		if(percussion.length === 0)
			mFile = 'p1';
		else
		{
			//return random percussion
			var ind = 0;
			mFile = 'p'+percussion[ind = Math.floor(Math.random()*percussion.length)];
			percussion.splice(ind, 1);
		}
	}
	// otherwise, return music
	else
	{
		pM ++;
		//if out of music, return s1
		if(music.length === 0)
			mFile = 's1';
		else
		{
			//return random music
			var ind = 0;
			mFile = 's'+music[ind = Math.floor(Math.random()*music.length)];
			music.splice(ind, 1);
		}
	}
	sounDict[ch] = mFile;

	// for the ardent developer, go to console to track annoying sounds in your music development and delete them from /sounds, renumber files and change numPercuss/numMusic
	console.log('Think '+mFile+'.mp3 was mildly annoying? Delete it!');
	return new Howl({src: ['sounds/'+mFile+'.mp3']});
}

// make color array
colArray = [];
for(i=0; i<300; i++)
{
	// random color to fill dem circles
	var r = 256*Math.random(), b = 256*Math.random(), g = 256*Math.random();

	colArray.push('rgb('+r+','+g+','+b+')');
}

// part of futile attempts to position circles away from form
function dist(x, y, x2, y2) {return Math.sqrt((x2-x)*(x2-x) + (y2-y)*(y2-y));}


function onKeyDown(event) 
// if this dont work, i dont blame you - some errors w/ Howler.js and form submission...
{
	num = (event.key+'').charCodeAt(0);

	// futile attempts to position circles away from form, they're too big for that :p
	var x = xPos, y = yPos;
	while(dist(x, y, xPos, yPos) < 100)
	{ 
		x = Math.random()*(view.size.width);
		y = Math.random()*(view.size.height);
	}
	
	// make circle
	mc = new Path.Circle(new Point(x, y), 500);
	


	//color it randomly
	mc.fillColor = colArray[num];

	// add to array
	circles.push(mc);

	// and make a sound!
	getSound(event.key).play();
}

function onFrame()
{
	// every second, change circle color and shrink 
	for(var i=0; i<circles.length; i++)
	{
		// hi random internet user like nikhil singh, change this for slower or faster colors.
		circles[i].fillColor.hue += 3; 
		circles[i].scale(.9);
	}

	// destroy debilitated small circles
	for(var i=0; i<circles.length; i++)
	{
		if(circles[i].width < 1) circles.splice(i);
	}
}