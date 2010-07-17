/**
  * an object which provides a symbol layout
  */
SymbolLayout = function()
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
			painter.drawText(xPos, yPos, this.getSymbol(keyContainer.name));
			
			// for the second text: add the spacing
			yPos += global.configuration.layoutConfiguration().getImageSpacing();
			
			// add the font size (so there's enough space for the text to display
			yPos += fontSize;
		}
	}
	
	/**
	  * returns a symbol representation for the given key
	  */
	this.getSymbol = function(keyName)
	{
		var symbol = 077; // ? will be the default value
		
		// determine the (english) text for the key
		switch (keyName)
		{
			case global.constants.numLockObjectName():
				// Num Lock: #
				symbol = 043;
				break;
			case global.constants.capsLockObjectName():
				/// Caps Lock: ⬇
				symbol = 11015;
				break;
			case global.constants.shiftPressedObjectName():
				// Shift pressed: ⇧
				symbol = 8679;
				break;
			case global.constants.controlPressedObjectName():
				// CTRL pressed: ^
				symbol = 94;
				break;
			case global.constants.altPressedObjectName():
				// ALT pressed: ⎇
				symbol = 9095;
				break;
			case global.constants.altgrPressedObjectName():
				// AltGr pressed: _
				symbol = 95;
				break;
			case global.constants.metaPressedObjectName():
			case global.constants.superPressedObjectName():
			case global.constants.hyperPressedObjectName():
				// meta, super or hyper pressed: ⚐
				symbol = 9872;
				break;
		}
		
		// convert the keycode to a string
		return String.fromCharCode(symbol);
	}
}