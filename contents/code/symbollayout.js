/**
  * an object which provides a symbol layout
  */
SymbolLayout = function()
{
	/**
	  * initializes the symbol layout
	  * this overrides the method from BaseLayout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		// are we drawing horizontal?
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
		{
			// set the start-position for the painter to the center of the plamoid
			// (otherwise it's at the very top, where we don't want it to be
			// as it would draw into non-visible area)
			this.yPosition = plasmoid.size.height / 2;
		}
	}
	
	/**
	  * returns a symbol representation for the given key
	  *
	  * @param keyName the name of the current key
	  */
	this.getText = function(keyName)
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
				// meta, super or hyper pressed: ⚑
				symbol = 9873;
				break;
		}
		
		// convert the keycode to a string
		return String.fromCharCode(symbol);
	}
}

// inherit TextBaseLayout
SymbolLayout.prototype = new TextBaseLayout();