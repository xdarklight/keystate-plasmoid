/**
  * an object which provides a vertical layout
  */
VerticalLayout = function()
{
	// say we're walking horizontally
	this.walkHorizontal = true;
}

// inherit the rectangle layout
VerticalLayout.prototype = new RectangleLayout();