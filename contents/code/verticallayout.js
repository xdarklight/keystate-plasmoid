/**
  * an object which provides a vertical layout
  */
VerticalLayout = function(config)
{
	// configuration stuff
	configuration = config;
	
	// public properties (should be set from the outside)
	this.numColor = new QColor();
	this.capsColor = new QColor();
	
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		// use half of the width
		var imageWidth = plasmoid.size().width / 2;
		
		// minus the spacing (between the two rectangles)
		imageWidth -= configuration.imageSpacing();
		
		return imageWidth;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		var imageHeight = plasmoid.size().height;
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * configuration.imagePadding();
		
		return imageHeight;
	}
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  */
	this.paint = function(painter)
	{
		var xPos = 0;
		var yPos = 0;
		
		// start with a padded value
		yPos += configuration.imagePadding();
		
		// paint the icon
		painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), this.numColor);
		
		// calculate the new positions
		// yPos did not change
		xPos += configuration.imageSpacing() + this.imageWidth()
		
		painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), this.capsColor);
	}
}