/**
  * an object which provides a vertical layout
  */
VerticalLayout = function(config)
{
	// configuration stuff
	configuration = config;
	
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		// use the full width
		var imageWidth = plasmoid.size().width / 2;
		
		// minus the spaacing (between the two rectangles)
		imageWidth -= configuration.imageSpacing();
		
		return imageWidth;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		return plasmoid.size().height;
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
		
		// start with a padded value
		yPos += configuration.imagePadding();
		
		// calculate the image height
		var imageHeight = this.imageHeight();
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * configuration.imagePadding();
		
		// paint the icon
		painter.fillRect(xPos, yPos, this.imageWidth(), imageHeight, numColor);
		
		// calculate the new positions
		// yPos did not change
		xPos += configuration.imageSpacing() + this.imageWidth()
		
		painter.fillRect(xPos, yPos, this.imageWidth(), imageHeight, capsColor);
	}
}