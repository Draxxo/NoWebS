var player = new Tone.Player("music/noob.mp3").toMaster();
//play as soon as the buffer is loaded
player.autostart = true;
player.volume.value = -6;

/*
function findScreenCoords(mouseEvent)
{
	var xpos;
	var ypos;
	if (mouseEvent)
	{
		//FireFox
		xpos = mouseEvent.screenX;
		ypos = mouseEvent.screenY;
	}
	else
	{
		//IE
		xpos = window.event.screenX;
		ypos = window.event.screenY;
	}

	new Tone.Oscillator(xpos, "sine").toMaster().start();
}
document.body.onmousemove = findScreenCoords;*/