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
		
		// calculate how often we have to subtract the spacing
		// we need to subtract spacing as soon as we have more than one rectangle
		var spacingCount = global.keyInformation.count() - 1;
		
		// minus twice the image padding (left and right)
		imageWidth -= 2 * global.configuration.layoutConfiguration().getImagePadding();
		
		// minus the spacing (between the two rectangles)
		imageWidth -= global.configuration.layoutConfiguration().getImageSpacing() * spacingCount;
		
		// divide through the number of keys
		imageWidth /= global.keyInformation.count();
		
		return imageWidth;
	}
	
	/**
	  * returns the calculated height of the image
	  */
	this.imageHeight = function()
	{
		return plasmoid.size.height;
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
		xPos += global.configuration.layoutConfiguration().getImagePadding();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			var width = this.imageWidth();
			var height = this.imageHeight();
			
			// paint the icon
			painter.fillRect(xPos, yPos, width, height, keyContainer.color);
		
			// calculate the new positions
			// yPos did not change
			xPos += global.configuration.layoutConfiguration().getImageSpacing() + width;
		}
	}
}