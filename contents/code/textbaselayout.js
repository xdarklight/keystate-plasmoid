/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyContainer) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * sets the walking size and the start position for the painter
	  */
	this.initialize = function()
	{
		// set the walking size
		this.walkSize = this.fontSize;
		
		// are we drawing horizontal?
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// set the start-position for the painter to the center of the plamoid
			// (otherwise it's at the very top, where we don't want it to be
			// as it would draw into non-visible area)
			this.yPosition = plasmoid.size.height / 2;
		}
	}
	
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
	}
}

// inherit BaseLayout
TextBaseLayout.prototype = new BaseLayout();