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
	  */
	this.walk = function()
	{
		// our walking size is either 1.5 times the font size
		// (1 character height plus half a character's height spacing)
		// or the configured item spacing - depending on which value is higher
		this.walkSize = Number.qMax(1.5 * this.fontSize, this.layoutConfiguration.imageSpacing());
		
		// we're always walking on the y axis in this layout (as we're rotating
		// in horizontal mode)
		this.yPosition += this.walkSize;
	}
}

// inherit TextBaseLayout
TextLayout.prototype = new TextBaseLayout();