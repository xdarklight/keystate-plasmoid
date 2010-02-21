/**
  * an object which provides a text layout
  */
TextLayout = function(config)
{
	// configuration stuff
	configuration = config;
	constants = new Constants();
	
	// public properties (should be set from the outside)
	this.numLocked = false;
	this.capsLocked = false;
	this.numColor = new QColor();
	this.capsColor = new QColor();
	
	/**
	  * gets a "locked: yes" or "locked: no" string (localized)
	  *
	  * @param isLocked decides what text is returned (depends on whether the modifer is enabled or not)
	  */
	this.getLockedText = function(isLocked)
	{
		// check if the modifier is enabled
		if (isLocked)
		{
			// if so: return "locked = true" (localized)
			return i18n(constants.textLayoutPlaceholderLocked());
		}
		
		// otherwise: return "locked = false" (localized)
		return i18n(constants.textLayoutPlaceholderNotLocked());
	}
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  */
	this.paint = function(painter)
	{
		var numText = i18n(constants.textLayoutNumText());
		var capsText = i18n(constants.textLayoutCapsText());
		
		// FIXME this is a workaround for some oddity in plamsa/javascript ;)
		// create a new pen
		var pen = new QPen();
		pen.color = this.numColor;
		
		// tell the painter to use our pen
		painter.pen = pen;
		
		// use a special font
		var fontSize = 7;
		
		painter.font = new QFont("Arial", fontSize);
		
		// make the yPos be the font size in pixels (this will make the text start
		// at the first position of the y-axis)
		var yPos = fontSize + configuration.imagePadding();
		
		// draw the num text
		painter.drawText(0, yPos, numText);
		
		// now draw the caps lock stuff
		pen.color = this.capsColor;
		
		// tell the painter to use our pen
		painter.pen = pen;
		
		// for the second text: add the spacing
		yPos += configuration.imageSpacing();
		
		// add the font size (so there's enough space for the text to display
		yPos += fontSize;
		
		// draw the caps text
		painter.drawText(0, yPos, capsText);
	}
}