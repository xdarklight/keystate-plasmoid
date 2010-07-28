/**
  * an object which provides a text layout
  */
TextLayout = function()
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
			
			// since we're rotating we can't use the default border spacing
			// move the pointer on the x-axis to the border spacing so we're starting
			// at the correct position
			this.xPosition -= this.layoutConfiguration.borderSpacing();
		}
	}
	
	/**
	  * returns a text representation of the given key
	  *
	  * @param keyName the name of the current key
	  */
	this.getText = function(keyName)
	{
		var text = i18nc("displayed in case no translation was found for the current key", "UNKNOWN (%1)", keyName);
		
		// determine the localized text for the key
		switch (keyName)
		{
			case global.constants.numLockObjectName():
				// Num Lock
				text = i18nc("The 'Num Lock' key modifier", "Num");
				break;
			case global.constants.capsLockObjectName():
				/// Caps Lock
				text = i18nc("The 'Caps Lock' key modifier", "Caps");
				break;
			case global.constants.shiftPressedObjectName():
				// Shift pressed
				text = i18nc("The 'Shift' key was pressed", "Shift");
				break;
			case global.constants.controlPressedObjectName():
				// CTRL pressed
				text = i18nc("The 'Ctrl' key was pressed", "Ctrl");
				break;
			case global.constants.altPressedObjectName():
				// ALT pressed
				text = i18nc("The 'Alt' key was pressed", "Alt");
				break;
			case global.constants.altgrPressedObjectName():
				// AltGr pressed
				text = i18nc("The 'AltGr' key was pressed", "AltGr");
				break;
			case global.constants.metaPressedObjectName():
				// meta pressed
				text = i18nc("The 'Meta' key was pressed", "Meta");
				break;
			case global.constants.superPressedObjectName():
				// super pressed
				text = i18nc("The 'Super' key was pressed", "Super");
				break;
			case global.constants.hyperPressedObjectName():
				// hyper pressed
				text = i18nc("The 'Hyper' key was pressed", "Hyper");
				break;
		}
		
		return text;
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
			this.walkSize = this.fontSize + this.layoutConfiguration.imageSpacing();
			
			// our current walking size is simply the global walking size
			walkingSize = this.walkSize;
		}
		
		// we're always walking on the y axis in this layout (as we're rotating
		// in horizontal mode)
		this.yPosition += walkingSize;
	}
}

// inherit TextBaseLayout
TextLayout.prototype = new TextBaseLayout();