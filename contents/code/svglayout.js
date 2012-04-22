/**
  * an object which provides a SVG layout
  */
SvgLayout = function()
{
	this.svg = null;
	
	this.initialize = function(painter)
	{
		this.svg = new FrameSvg("keystate");
		this.svg.repaintNeeded = plasmoid.update;
		
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
	  * returns the calculated size (width or height)
	  */
	this.calculateSize = function(originalSize)
	{
		var size = originalSize;
		
		// calculate how often we have to subtract the spacing
		// we need to subtract spacing as soon as we have more than one rectangle
		var spacingCount = global.keyInformation.count() - 1;
		
		// minus twice the border spacing (top/bottom or left/right)
		size -= 2 * this.guessBestBorderSpacing();
		
		// minus the spacing (between the two rectangles)
		size -= this.guessBestImageSpacing() * spacingCount;
		
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
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param keyName the name of the current key
	  */
	this.drawKey = function(painter, keyName)
	{
		// Only draw the key if it's pressed.
		if (global.keyInformation.isPressed(keyName))
		{
			// Get the name of the element in the SVG.
			var elementName = this.getElementName(keyName);
			
			this.svg.resize(this.calculatedWidth(), this.calculatedHeight());
			this.svg.paint(painter, this.xPosition, this.yPosition, elementName);
		}
	}
	
	/**
	  * returns the name of the SVG which represents the given key
	  *
	  * @param keyName the name of the current key
	  */
	this.getElementName = function(keyName)
	{
		// determine the (english) text for the key
		switch (keyName)
		{
			case global.constants.metaPressedObjectName():
			case global.constants.superPressedObjectName():
			case global.constants.hyperPressedObjectName():
				// meta, super or hyper should use the 
				// same SVG.
				svgName = global.constants.metaPressedObjectName();
				break;
			
			default:
				// By default we use the name of the key as
				// name of the SVG.
				svgName = keyName;
				break;
		}
		
		// Strip whitespaces from the name.
		var cleanElementName = svgName.replace(" ", "");
		
		return cleanElementName;
	}
}

// inherit BaseLayout
SvgLayout.prototype = new BaseLayout();