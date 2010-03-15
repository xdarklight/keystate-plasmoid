/**
  * an object which provides a text layout
  */
TextLayout = function()
{
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  */
	this.paint = function(painter)
	{
		var font = globals.configuration.font();
		var fontSize = font.pointSize;
		
		// make the yPos be the font size in pixels (this will make the text start
		// at the first position of the y-axis)
		var yPos = fontSize + globals.configuration.imagePadding();
		var xPos = 0;
		
		// FIXME this is a workaround for some oddity in plamsa/javascript ;)
		// create a new pen
		var pen = new QPen();
		
		for (var i = 0; i < globals.keyInformation.count(); i++)
		{
			var name = globals.keyInformation.getName(i);
			var text = globals.keyInformation.getText(name);
			
			pen.color = globals.keyInformation.getColor(name);
			
			// tell the painter to use our pen
			painter.pen = pen;
			
			// set our font
			painter.font = font;
			
			// draw the num text
			painter.drawText(xPos, yPos, text);
			
			// for the second text: add the spacing
			yPos += globals.configuration.imageSpacing();
			
			// add the font size (so there's enough space for the text to display
			yPos += fontSize;
		}
	}
}