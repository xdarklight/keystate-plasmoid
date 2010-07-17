/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyContainer) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * sets the walking size
	  */
	this.initialize = function()
	{
		this.walkSize = this.fontSize;
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