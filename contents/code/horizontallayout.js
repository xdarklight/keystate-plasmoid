/**
  * an object which provides a horizontal layout
  */
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
		var xPos = 0;
		var yPos = 0;
		
		// start at 0 + padding
		yPos = configuration.imagePadding();
		
		// calculate the image height
		var imageHeight = this.imageHeight();
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * configuration.imagePadding();
		
		// paint the icon
		painter.fillRect(xPos, yPos, this.imageWidth(), imageHeight, numColor);
		
		// add the spacing
		yPos += configuration.imageSpacing() + imageHeight + configuration.imagePadding();
		
		painter.fillRect(xPos, yPos, this.imageWidth(), imageHeight, capsColor);
	}
}