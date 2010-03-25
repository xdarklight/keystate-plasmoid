/**
  * an object which provides a horizontal layout
  */
HorizontalLayout = function()
{
	// say we're walking vertically
	this.walkHorizontal = false;
}

// inherit the rectangle layout
HorizontalLayout.prototype = new RectangleLayout();