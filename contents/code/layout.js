Layout = function(config)
{
	// internal variables
	configuration = config;
	constants = new Constants();
	
	/**
	  * returns the color of a key depending on whether it's locked or not
	  *
	  * @param keyLocked decides if the key is locked or not
	  * @param keyColor the color if the key is locked, otherwise a neutral color is returned
	  */
	this.getColor = function(keyLocked, keyColor)
	{
		if (keyLocked)
		{
			return keyColor;
		}
		
		return configuration.fullyTransparentColor();
	}
	
	/**
	  * paints the icon to the screen
	  *
	  * @param painter the painter used to paint the icon
	  * @param numLocked decides if the num key is locked or not
	  * @param capsLocked decides if the caps key is locked or not
	  */
	this.paintIcon = function(painter, numLocked, capsLocked)
	{
		var layout = null;
		
		// get the colors
		var numColor = this.getColor(numLocked, configuration.numLockColor());
		var capsColor = this.getColor(capsLocked, configuration.capsLockColor());
		
		// handle the current layout
		switch (configuration.layoutName())
		{
			case constants.horizontalLayoutName():
				// include the layout code
				plasmoid.include("horizontallayout.js");
				
				// get the layout
				layout = new HorizontalLayout(configuration);
				
				break;
			case constants.verticalLayoutName():
				// include the layout code
				plasmoid.include("verticallayout.js");
				
				// get the layout
				layout = new VerticalLayout(configuration);
				
				break;
		}
		
		// paint the layout
		layout.paint(painter, numColor, capsColor);
	}
}