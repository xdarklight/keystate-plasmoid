/**
  * an object which provides a vertical layout
  */
VerticalLayout = function()
{
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		// use half of the width
		var imageWidth = plasmoid.size.width / globals.keyInformationList.count();
		
		// minus the spacing (between the two rectangles)
		imageWidth -= globals.configuration.imageSpacing();
		
		return imageWidth;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		var imageHeight = plasmoid.size.height;
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * globals.configuration.imagePadding();
		
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
		yPos += globals.configuration.imagePadding();
		
		for (var i = 0; i < globals.keyInformationList.count(); i++)
		{
			var keyInfo = globals.keyInformationList.get(i);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), keyInfo.color());
		
			// calculate the new positions
			// yPos did not change
			xPos += globals.configuration.imageSpacing() + this.imageWidth()
		}
	}
}