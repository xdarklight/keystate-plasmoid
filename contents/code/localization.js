/**
  * an object which holds all localization information
  */
Localization = function()
{
	this.keyTextInformation = new Array();
	
	// internal constants
	numLockedText = "Num";
	capsLockedText = "Caps";
	shiftPressedText = "Shift";
	controlPressedText = "Ctrl";
	altPressedText = "Alt";
	altgrPressedText = "AltGr";
	metaPressedText = "Meta";
	superPressedText = "Super";
	hyperPressedText = "Hyper";
	
	/**
	  * initializes all localization information
	  */
	this.initialize = function()
	{
		// loop through all key names
		for (var i in globals.keyNames)
		{
			var keyName = globals.keyNames[i];
			var text = "";
			
			// determine the (english) text for the key
			switch (keyName)
			{
				case globals.constants.numLockObjectName():
					// Num Lock
					text = numLockedText;
					break;
				case globals.constants.capsLockObjectName():
					/// Caps Lock
					text = capsLockedText;
					break;
				case globals.constants.shiftPressedObjectName():
					// Shift pressed
					text = shiftPressedText;
					break;
				case globals.constants.controlPressedObjectName():
					// CTRL pressed
					text = controlPressedText;
					break;
				case globals.constants.altPressedObjectName():
					// ALT pressed
					text = altPressedText;
					break;
				case globals.constants.altgrPressedObjectName():
					// AltGr pressed
					text = altgrPressedText;
					break;
				case globals.constants.metaPressedObjectName():
					// meta pressed
					text = metaPressedText;
					break;
				case globals.constants.superPressedObjectName():
					// super pressed
					text = superPressedText;
					break;
				case globals.constants.hyperPressedObjectName():
					// hyper pressed
					text = hyperPressedText;
					break;
			}
			
			// fill the localization information array with data
			this.keyTextInformation[keyName] = text;
		}
	}
	
	/**
	  * returns the localized text for the given key name
	  */
	this.getText = function(keyName)
	{
		var text = this.keyTextInformation[keyName];
		
		// check if the text object contains valid data
		if (!text)
		{
			// if not replace it by an empty string
			text = "";
		}
		
		// return the translated text
		return i18n(text);
	}
	
}