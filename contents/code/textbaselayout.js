/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyName) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param keyName the name of the current key
	  */
	this.drawKey = function(painter, keyName)
	{
		// get the text for the given key
		var text = this.getText(keyName);
		
		// draw the text for the given key
		painter.drawText(this.xPosition, this.yPosition, text);
		
		// update the walking size
		// calculate the display length (the font size multiplied with the number of characters)
		// plus the image spacing (as we're not using the code from BaseLayout for this)
		this.walkSize = (this.fontSize * text.length) + this.layoutConfiguration.imageSpacing();
	}
	
	/**
	  * try to guess an image spacing which looks fine on all systems/configurations
	  * this overrides the method from BaseLayout
	  */
	this.guessBestImageSpacing = function()
	{
		// calculate the image spacing (the spacing between two key items)
		// this is 75% times the font size (almost one line)
		return this.fontSize * 0.75;
	}
	
	/**
	  * try to guess a border spacing which looks fine on all systems/configurations
	  * this overrides the method from BaseLayout
	  */
	this.guessBestBorderSpacing = function()
	{
		// get the average size
		var averageSize = this.calculateAverageSize();
		
		// calculate the border spacing (the spacing between the border and the first/last item)
		// the lower limit is 1.75 times the font size (almost two lines)
		// the best settings should be 50% of the the average item size
		// the upper limit is the average item size itself
		return Number.qBound(this.fontSize * 1.75, averageSize / 2, averageSize);
	}
}

// inherit BaseLayout
TextBaseLayout.prototype = new BaseLayout();