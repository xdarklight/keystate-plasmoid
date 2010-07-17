/**
  * an object which provides basic functions for a rectangle layout
  */
RectangleLayout = function()
{
	/**
	  * returns the calculated size (width or height)
	  */
	this.calculateSize = function(originalSize)
	{
		var size = originalSize;
		
		// calculate how often we have to subtract the spacing
		// we need to subtract spacing as soon as we have more than one rectangle
		var spacingCount = global.keyInformation.count() - 1;
		
		// minus twice the image padding (top/bottom or left/right)
		size -= 2 * this.padding;
		
		// minus the spacing (between the two rectangles)
		size -= this.spacing * spacingCount;
		
		// divide through the number of keys
		size /= global.keyInformation.count();
		
		return size;
	}
	
	this.calculatedWidth = function()
	{
		var imageWidth = plasmoid.size.width;
		
		// check if we are walking horizontal
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// if we're walking horizontal we need to calculate the
			// width of the image
			imageWidth = this.calculateSize(imageWidth);
		}
		
		return imageWidth;
	}
	
	this.calculatedHeight = function()
	{
		var imageHeight = plasmoid.size.height;
		
		// check if we're walking vertical
		if (this.orientation != global.constants.horizontalOrientation())
		{
			// if we're walking vertical we need to calculate the
			// height of the image
			imageHeight = this.calculateSize(imageHeight);
		}
		
		return imageHeight;
	}
	
	this.initialize = function()
	{
		// we've implemented rotating on our own
		this.canRotate = false;
		
		// check if we are walking horizontal
		if (this.orientation == global.constants.horizontalOrientation())
		{
			this.walkSize = this.calculatedWidth();
		}
		else
		{
			this.walkSize = this.calculatedHeight();
		}
	}
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param keyContainer the current key's container
	  */
	this.drawKey = function(painter, keyContainer)
	{
		// paint the icon
		painter.fillRect(this.xPosition, this.yPosition, this.calculatedWidth(), this.calculatedHeight(), keyContainer.color);
	}
}

// inherit BaseLayout
RectangleLayout.prototype = new BaseLayout();