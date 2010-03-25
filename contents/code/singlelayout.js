/**
  * an object which provides a single item layout
  */
SingleLayout = function()
{
	// say we're walking vertically
	this.walkHorizontal = false;
	
	/**
	  * returns the calculated size (in case of the SingleLayout the height)
	  * this overrides getCalculatedSize from RectangleLayout
	  */
	this.getCalculatedSize = function(originalSize)
	{
		var size = originalSize;
		
		// minus twice the image padding (top/bottom or left/right)
		size -= 2 * global.configuration.layoutConfiguration().getImagePadding();
		
		return size;
	}
	
	/**
	  * paints the image with the given painter to the screen
	  * this overrides paint from RectangleLayout
	  *
	  * @param painter the painter used to paint the image
	  */
	this.paint = function(painter)
	{
		var xPos = 0;
		var yPos = 0;
		
		// we're walking on the y-axis: start at the padded value
		yPos += global.configuration.layoutConfiguration().getImagePadding();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			var width = this.getWidth();
			var height = this.getHeight();
			
			// paint the icon
			painter.fillRect(xPos, yPos, width, height, keyContainer.color);
		}
	}
}

// inherit the rectangle layout
SingleLayout.prototype = new RectangleLayout();