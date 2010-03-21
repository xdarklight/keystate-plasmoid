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
		var imageWidth = plasmoid.size.width;
	
		// divide through the number of keys
		imageWidth /= global.keyInformation.count();
		
		// minus the spacing (between the two rectangles)
		imageWidth -= global.configuration.layoutConfiguration().getImageSpacing();
		
		return imageWidth;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		var imageHeight = plasmoid.size.height;
		
		// minus twice the padding (top and bottom)
		imageHeight -= 2 * global.configuration.layoutConfiguration().getImagePadding();
		
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
		yPos += global.configuration.layoutConfiguration().getImagePadding();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			// paint the icon
			painter.fillRect(xPos, yPos, this.imageWidth(), this.imageHeight(), keyContainer.color);
		
			// calculate the new positions
			// yPos did not change
			xPos += global.configuration.layoutConfiguration().getImageSpacing() + this.imageWidth();
		}
	}
}