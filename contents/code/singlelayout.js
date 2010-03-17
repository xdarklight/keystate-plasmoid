/**
  * an object which provides a single item layout
  */
SingleLayout = function()
{
	/**
	  * returns the calculated width of the image
	  */
	this.imageWidth = function()
	{
		var imageWidth = plasmoid.size.width;
		
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
		
		// start at 0 + padding
		yPos = globals.configuration.imagePadding();
		
		for (var i = 0; i < globals.keyInformation.count(); i++)
		{
			var keyContainer = globals.keyInformation.getContainer(i);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), keyContainer.color);
		}
	}
}