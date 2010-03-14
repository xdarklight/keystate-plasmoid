/**
  * an object which provides a horizontal layout
  */
HorizontalLayout = function()
{
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		// use the full width
		return plasmoid.size.width;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		// the height is half of the plasmoid's size...
		var imageHeight = plasmoid.size.height / globals.keyInformationList.count();
		
		// minus spacing (between the two rectangles)
		imageHeight -= globals.configuration.imageSpacing();
		
		// minus the padding
		imageHeight -= globals.configuration.imagePadding();
		
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
		
		// start at 0 + padding
		yPos = globals.configuration.imagePadding();
		
		for (var i = 0; i < globals.keyInformationList.count(); i++)
		{
			var keyInfo = globals.keyInformationList.get(i);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), keyInfo.color());
			
			// add the spacing
			yPos += globals.configuration.imageSpacing() + this.imageHeight();
		}
	}
}