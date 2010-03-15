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
		// the height the height of the plasmoid minus twice the image padding (top and bottom)
		var imageHeight = (plasmoid.size.height - 2 * globals.configuration.imagePadding());
		
		// divide the height through the key count (so we get the height per key)
		imageHeight /= globals.keyInformation.count();
		
		// minus spacing (between the two rectangles)
		imageHeight -= globals.configuration.imageSpacing();
		
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
		
		for (var i = 0; i < globals.keyInformation.count(); i++)
		{
			var name = globals.keyInformation.getName(i);
			var color = globals.keyInformation.getColor(name);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), color);
			
			// add the spacing
			yPos += globals.configuration.imageSpacing() + this.imageHeight();
		}
	}
}