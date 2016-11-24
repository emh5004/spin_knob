function volumeKnob(id,ticks,incrementCall,decrementCall)
{
	this.DOM = document.getElementById(id);
	this.dial = document.createElement("div");
		this.dial.id = "dial";
		this.dial.innerHTML = "&bull;"
		this.dial.style.height = 2*(this.DOM.offsetHeight/3)
		this.dial.style.width = 2*(this.DOM.offsetWidth/3)
		this.dial.style.top = this.DOM.offsetHeight/6
		this.dial.style.left = this.DOM.offsetWidth/6
		this.dial.style.borderRadius = this.DOM.offsetHeight/3 + "px"
		this.DOM.appendChild(this.dial);
	this.ticks = ticks;
	this.rads = (Math.PI * 2) / ticks;
	this.radius = this.DOM.offsetHeight/3;
	this.positions = {}
	for(var x = 0; x < ticks; x++)
	{
		this.positions[x] = {x:(Math.cos((this.rads)*x) * this.radius) + (this.DOM.offsetWidth/2),y:(Math.sin((this.rads)*x) * this.radius) + (this.DOM.offsetHeight/2),radians:this.rads*x};
		var div = document.createElement("div")
		div.className = "marker";
		div.style.left = this.positions[x].x;
		div.style.top = this.positions[x].y-2;
		div.style.transform = "rotate(" + this.rads * x + "rad)"
		this.DOM.appendChild(div)
	}
	this.lastPosition = 0;
	this.currentPosition = 0;
	var self = this;
	this.DOM.addEventListener("touchmove",function(e){
		var divX = e.targetTouches[0].clientX - (self.DOM.offsetLeft + (self.DOM.offsetWidth/2))
		var divY = -(e.targetTouches[0].clientY - (self.DOM.offsetTop + (self.DOM.offsetHeight/2)))
		var rad = Math.PI/2 - Math.atan(divY/divX);
		if(divX < 0)
		{
			rad += Math.PI;
		}

		document.getElementById("dial").style.transform = "rotate(" + rad + "rad)"
		for(var x = 0; x < ticks; x++)
		{
			var next = x + 1;
			var nextRad;
			try
			{
				nextRad = self.positions[next].radians
			}
			catch(err)
			{
				nextRad = Math.PI * 2
			}
			if(self.positions[x].radians < rad && rad < nextRad)
			{
				self.currentPosition = x;
			}
		}
		if (self.currentPosition != self.lastPosition)
		{
			if(self.currentPosition - 1 == self.lastPosition || (self.currentPosition == 0 && self.lastPosition == ticks - 1))
			{
				self.lastPosition = self.currentPosition
				incrementCall();
			}
			if(self.currentPosition + 1 == self.lastPosition || (self.currentPosition == ticks - 1 && self.lastPosition == 0))
			{
				self.lastPosition = self.currentPosition
				decrementCall();
			}
		}

	});
	
		this.DOM.addEventListener("touchstart",function(e){
		e.preventDefault();
		var divX = e.targetTouches[0].clientX - (self.DOM.offsetLeft + (self.DOM.offsetWidth/2))
		var divY = -(e.targetTouches[0].clientY - (self.DOM.offsetTop + (self.DOM.offsetHeight/2)))
		var rad = Math.PI/2 - Math.atan(divY/divX);
		if(divX < 0)
		{
			rad += Math.PI;
		}
		for(var x = 0; x < ticks; x++)
		{
			var next = x + 1;
			var nextRad;
			try
			{
				nextRad = self.positions[next].radians
			}
			catch(err)
			{
				nextRad = Math.PI * 2
			}
			if(self.positions[x].radians < rad && rad < nextRad)
			{
				self.currentPosition = x;
				self.lastPosition = x;
			}
		}
	});
}