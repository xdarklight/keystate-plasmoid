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
		var imageHeight = (plasmoid.size.height - 2 * global.configuration.layoutConfiguration().getImagePadding());
		
		// divide the height through the key count (so we get the height per key)
		imageHeight /= global.keyInformation.count();
		
		// minus spacing (between the two rectangles)
		imageHeight -= global.configuration.layoutConfiguration().getImageSpacing();
		
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
		yPos = global.configuration.layoutConfiguration().getImagePadding();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), keyContainer.color);
			
			// add the spacing
			yPos += global.configuration.layoutConfiguration().getImageSpacing() + this.imageHeight();
		}
	}
}