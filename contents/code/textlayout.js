/**
  * an object which provides a text layout
  */
TextLayout = function()
{
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
}

// inherit TextBaseLayout
TextLayout.prototype = new TextBaseLayout();