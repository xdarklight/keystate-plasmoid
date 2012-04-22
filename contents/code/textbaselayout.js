/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyName) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * initializes the symbol layout
	  * this overrides the method from BaseLayout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		// check if our orientation mode is horizontal
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
		{
			// Get the y coordinate at the very bottom minus the border spacing.
			// This is where we'll start drawing.
			var bottomPosition = plasmoid.size.height - this.guessBestBorderSpacing();
			
			// rotate by 270 degrees (this will make the text readable from
			// bottom to the top and new keys will appear on the right)
			painter.rotate(270);
			
			// since we're rotating we can't use the default border spacing
			// move the pointer on the x-axis to the border spacing so we're starting
			// at the correct position
			this.xPosition -= this.guessBestBorderSpacing();
		}
		else
		{
			// Simply add the border spacing.
			this.xPosition += this.guessBestBorderSpacing();
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
		// get the text for the given key
		var text = this.getText(keyName);
		
		// draw the text for the given key
		painter.drawText(this.xPosition, this.yPosition, text);
		
		// update the walking size
		// calculate the display length (the font size multiplied with the number of characters)
		// plus the image spacing (as we're not using the code from BaseLayout for this)
		this.walkSize = (this.fontSize * text.length) + this.guessBestImageSpacing();
	}
	
	/**
	  * changes the position on the x or y axis so the painter
	  * doesn't overwrite the current items on the next run
	  * overwrites walk() from BaseLayout
	  *
	  * @parameter pixels (optional) forces the layout to walk the given number of pixels
	  */
	this.walk = function(pixels)
	{
		var walkingSize = null;
		
		// was the pixel parameter given?
		if (pixels)
		{
			// just walk by the given number of pixels
			walkingSize = pixels;
		}
		else
		{
			// our walking size is the font size (1 character height;
			// this is mandatory so we're not overwriting existing text)
			// plus the configured item spacing (as we're not using the code from BaseLayout for this)
			this.walkSize = this.fontSize + this.guessBestImageSpacing();
			
			// our current walking size is simply the global walking size
			walkingSize = this.walkSize;
		}
		
		// we're always walking on the y axis in this layout (as we're rotating
		// in horizontal mode)
		this.yPosition += walkingSize;
	}
	
	/**
	  * try to guess an image spacing which looks fine on all systems/configurations
	  * this overrides the method from BaseLayout
	  */
	this.guessBestImageSpacing = function()
	{
		// get the average size
		var averageSize = this.calculateAverageSize();
		
		// calculate the image spacing (the spacing between two key items)
		// the lower limit is 25% of the average item size
		// the best spacing should be 75% of the font size
		// the upper limit is 50% of the average item size
		return Number.qBound(averageSize / 4, this.fontSize * 0.75, averageSize / 2);
	}
	
	/**
	  * try to guess a border spacing which looks fine on all systems/configurations
	  * this overrides the method from BaseLayout
	  */
	this.guessBestBorderSpacing = function()
	{
		// get the average size
		var averageSize = this.calculateAverageSize();
		
		// calculate the border spacing (the spacing between the border and the first/last item)
		// the lower limit is 1.75 times the font size (almost two lines)
		// the best settings should be 50% of the the average item size
		// the upper limit is the average item size itself
		return Number.qBound(this.fontSize * 1.75, averageSize / 2, averageSize);
	}
}

// inherit BaseLayout
TextBaseLayout.prototype = new BaseLayout();