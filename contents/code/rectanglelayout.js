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
		
		// minus twice the border spacing (top/bottom or left/right)
		size -= 2 * this.layoutConfiguration.borderSpacing();
		
		// minus the spacing (between the two rectangles)
		size -= this.layoutConfiguration.imageSpacing() * spacingCount;
		
		// divide through the number of keys
		size /= global.keyInformation.count();
		
		return size;
	}
	
	this.calculatedWidth = function()
	{
		var width = plasmoid.size.width;
		
		// check if we are walking horizontal
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
		{
			// if we're walking horizontal we need to calculate the width
			width = this.calculateSize(width);
		}
		
		return width;
	}
	
	this.calculatedHeight = function()
	{
		var height = plasmoid.size.height;
		
		// check if we're walking vertical
		if (this.layoutConfiguration.orientation() != global.constants.horizontalOrientation())
		{
			// if we're walking vertical we need to calculate the height
			height = this.calculateSize(height);
		}
		
		return height;
	}
	
	/**
	  * initializes the rectangle layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		// check if we are walking horizontal
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
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
	  * @param keyName the name of the current key
	  */
	this.drawKey = function(painter, keyName)
	{
		// paint the icon
		painter.fillRect(this.xPosition, this.yPosition, this.calculatedWidth(), this.calculatedHeight(), painter.pen.color);
	}
}

// inherit BaseLayout
RectangleLayout.prototype = new BaseLayout();