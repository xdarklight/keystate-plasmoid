/**
  * an object which provides a text layout
  */
TextLayout = function()
{
	/**
	  * initializes the symbol layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		// check if our orientation mode is horizontal
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// get the y coordinate at the very bottom minus the spacing (the current
			// yPosition is the spacing)
			var bottomPosition = plasmoid.size.height - this.yPosition;
			
			// move to the current x position and to the bottom position
			// (please note that we're at the start here, this means the current positions
			// is basically only the border spacing)
			painter.translate(this.xPosition, bottomPosition);
			
			// rotate by 270 degrees (this will make the text readable from
			// bottom to the top and new keys will appear on the right)
			painter.rotate(270);
			
			// move to the bottom position
			this.yPosition = bottomPosition;
		}
	}
	
	/**
	  * returns a text representation of the given key
	  */
	this.getText = function(keyContainer)
	{
		// return the key's text
		return keyContainer.text;
	}
	
	/**
	  * changes the position on the x or y axis so the painter
	  * doesn't overwrite the current items on the next run
	  * overwrites walk() from BaseLayout
	  */
	this.walk = function()
	{
		// our walking size is 1.5 times the font size
		// (1 character height plus half a character's height spacing)
		this.walkSize = 1.5 * this.fontSize;
		
		// we're always walking on the y axis in this layout (as we're rotating
		// in horizontal mode)
		this.yPosition += this.walkSize;
	}
}

// inherit TextBaseLayout
TextLayout.prototype = new TextBaseLayout();