/**
  * an object which provides basic functions for a rectangle layout
  */
RectangleLayout = function()
{
	/**
	  * returns the calculated size (width or height)
	  */
	this.getCalculatedSize = function(originalSize)
	{
		var size = originalSize;
		
		// calculate how often we have to subtract the spacing
		// we need to subtract spacing as soon as we have more than one rectangle
		var spacingCount = global.keyInformation.count() - 1;
		
		// minus twice the image padding (top/bottom or left/right)
		size -= 2 * global.configuration.layoutConfiguration().getImagePadding();
		
		// minus the spacing (between the two rectangles)
		size -= global.configuration.layoutConfiguration().getImageSpacing() * spacingCount;
		
		// divide through the number of keys
		size /= global.keyInformation.count();
		
		return size;
	}
	
	this.getWidth = function()
	{
		var imageWidth = plasmoid.size.width;
		
		// check if we are walking horizontal
		if (this.walkHorizontal)
		{
			// if we're walking horizontal we need to calculate the
			// width of the image
			imageWidth = this.getCalculatedSize(imageWidth);
		}
		
		return imageWidth;
	}
	
	this.getHeight = function()
	{
		var imageHeight = plasmoid.size.height;
		
		// check if we're walking vertical
		if (!this.walkHorizontal)
		{
			// if we're walking vertical we need to calculate the
			// height of the image
			imageHeight = this.getCalculatedSize(imageHeight);
		}
		
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
		
		var padding = global.configuration.layoutConfiguration().getImagePadding();
		var spacing = global.configuration.layoutConfiguration().getImageSpacing();
		
		// start with a padded value
		if (this.walkHorizontal)
		{
			// we're walking on the x-axis: start at the padded value
			xPos += padding;
		}
		else
		{
			// we're walking on the y-axis: start at the padded value
			yPos += padding;
		}
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			var width = this.getWidth();
			var height = this.getHeight();
			
			// paint the icon
			painter.fillRect(xPos, yPos, width, height, keyContainer.color);
			
			// calculate the new positions
			if (this.walkHorizontal)
			{
				xPos += width + spacing;
			}
			else
			{
				yPos += height + spacing;
			}
		}
	}
}