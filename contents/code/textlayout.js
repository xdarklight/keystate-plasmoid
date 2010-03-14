/**
  * an object which provides a text layout
  */
TextLayout = function()
{
	// public properties (should be set from the outside)
	this.numColor = new QColor();
	this.capsColor = new QColor();
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  */
	this.paint = function(painter)
	{
		var numText = i18n(globals.constants.textLayoutNumText());
		var capsText = i18n(globals.constants.textLayoutCapsText());
		
		var font = globals.configuration.font();
		var fontSize = font.pointSize;
		
		// FIXME this is a workaround for some oddity in plamsa/javascript ;)
		// create a new pen
		var pen = new QPen();
		pen.color = this.numColor;
		
		// tell the painter to use our pen
		painter.pen = pen;
		
		painter.font = font;
		
		// make the yPos be the font size in pixels (this will make the text start
		// at the first position of the y-axis)
		var yPos = fontSize + globals.configuration.imagePadding();
		
		// draw the num text
		painter.drawText(0, yPos, numText);
		
		// now draw the caps lock stuff
		pen.color = this.capsColor;
		
		// tell the painter to use our pen
		painter.pen = pen;
		
		// for the second text: add the spacing
		yPos += globals.configuration.imageSpacing();
		
		// add the font size (so there's enough space for the text to display
		yPos += fontSize;
		
		// draw the caps text
		painter.drawText(0, yPos, capsText);
	}
}