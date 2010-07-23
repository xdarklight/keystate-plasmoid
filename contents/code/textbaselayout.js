/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyContainer) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param keyContainer the current key's container
	  */
	this.drawKey = function(painter, keyContainer)
	{
		// get the text for the given key
		var text = this.getText(keyContainer);
		
		// draw the text for the given key
		painter.drawText(this.xPosition, this.yPosition, text);
		
		// update the walking size
		// we're either walking the lenght of the text plus 1 character (= a blank) 
		// or the configured item spacing - depending on which value is higher
		this.walkSize = Number.qMax(this.fontSize * (text.length + 1), this.layoutConfiguration.imageSpacing());
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