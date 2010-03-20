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
		var font = global.configuration.layoutConfiguration().getFont();
		var fontSize = font.pointSize;
		
		// make the yPos be the font size in pixels (this will make the text start
		// at the first position of the y-axis)
		var yPos = fontSize + global.configuration.layoutConfiguration().getImagePadding();
		var xPos = 0;
		
		// FIXME this is a workaround for some oddity in plamsa/javascript ;)
		// create a new pen
		var pen = new QPen();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			pen.color = keyContainer.color;
			
			// tell the painter to use our pen
			painter.pen = pen;
			
			// set our font
			painter.font = font;
			
			// draw the num text
			painter.drawText(xPos, yPos, keyContainer.text);
			
			// for the second text: add the spacing
			yPos += global.configuration.layoutConfiguration().getImageSpacing();
			
			// add the font size (so there's enough space for the text to display
			yPos += fontSize;
		}
	}
}