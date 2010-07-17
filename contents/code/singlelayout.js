/**
  * an object which provides a single item layout
  */
SingleLayout = function()
{
	// say we're walking vertically
	this.walkHorizontal = false;
	
	/**
	  * returns the calculated size (in case of the SingleLayout the height)
	  * this overrides calculateSize from RectangleLayout
	  */
	this.calculateSize = function(originalSize)
	{
		var size = originalSize;
		
		// minus twice the image padding (top/bottom or left/right)
		size -= 2 * this.padding;
		
		return size;
	}
}

// inherit the rectangle layout
SingleLayout.prototype = new RectangleLayout();