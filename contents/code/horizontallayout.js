HorizontalLayout = function(config)
{
	// configuration stuff
	configuration = config;
	
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		// use the full width
		return plasmoid.size().width;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		// the height is half of the plasmoid's size...
		var imageHeight = plasmoid.size().height / 2;
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * configuration.iconPadding();
		
		// minus spacing (between the two rectangles)
		imageHeight -= configuration.imageSpacing();
		
		return imageHeight;
	}
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param numColor the color for the num lock part
	  * @param capsColor the color for the caps lock part
	  */
	this.paint = function(painter, numColor, capsColor)
	{
		var xPos = 1;
		var yPos = 1;
		
		// paint the icon
		painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), numColor);
		
		// calculate the new positions
		// xPos did not change
		yPos += configuration.imageSpacing() + this.imageHeight()
		
		painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), capsColor);
	}
}