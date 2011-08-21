/**
  * the layout configuration object which handles all 
  * layout related configuration (layout selection, fonts, etc.)
  */
LayoutConfiguration = function()
{
	selectedLayout = null;
	imageSpacing = null;
	font = new QFont("Sans Serif", 7);
	orientation = null;
	
	// internal constants
	uninitializedFontFamily = "FONT_FALLBACK";
	imageSpacingConfigName = "ImageSpacing";
	borderSpacingConfigName = "BorderSpacing";
	fontConfigName = "Font";
	advancedLayoutSettingsConfigName = "AdvancedLayoutSettings";
	
	/**
	  * initializes the layout configuration
	  */
	this.initialize = function()
	{
		// update the font settings
		this.updateFontSettings();
		
		// update the orientation settings
		this.updateOrientation();
		
		// then update the layout settings
		this.updateLayoutSettings();
	}
	
	/**
	  * updates the font settings
	  */
	this.updateFontSettings = function()
	{
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		
		// TODO: workaround for the font problem:
		// we cannot specify a default font in the kcfg xml file
		// instead we use a fake default font family -> we can compare
		// the fake font familiy and see if it already has been initialized
		if (fontConfigValue.family == uninitializedFontFamily)
		{
			// write the default font settings to the config file
			plasmoid.writeConfig(fontConfigName, font);
			
			// re-read the font from the config file
			fontConfigValue = plasmoid.readConfig(fontConfigName);
		}
		
		font = fontConfigValue;
	}
	
	/**
	  * updates the layout settings (depending on whether the user has chosen the 
	  * advanced or the simple layout)
	  */
	this.updateLayoutSettings = function()
	{
		// read the values from the config file
		var advancedLayoutSettingsConfigValue = plasmoid.readConfig(advancedLayoutSettingsConfigName);
		
		// create an instance of the selected layout
		global.layout.createSelectedLayout();
		
		// are we using the simple or the advanced layout settings?
		if (advancedLayoutSettingsConfigValue)
		{
			this.applyAdvancedLayoutSettings();
		}
		else
		{
			// simple layout settings are layout specific
			// thus we need a helper method which is able to get
			// the correct values from the current layout
			this.applySimpleLayoutSettings();
		}
	}
	
	/**
	  * applies some default settings (which aim to look good on all systems with any configuration)
	  */
	this.applySimpleLayoutSettings = function()
	{
		// get the (guessed) best image spacing settings from the layout
		imageSpacing = global.layout.layout().guessBestImageSpacing();
		
		// get the (guessed) best border spacing settings from the layout
		borderSpacing = global.layout.layout().guessBestBorderSpacing();
	}
	
	/**
	  * parses the advanced settings from the config file
	  */
	this.applyAdvancedLayoutSettings = function()
	{
		// config values
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var borderSpacingConfigValue = plasmoid.readConfig(borderSpacingConfigName);
		
		// save our settings internally
		imageSpacing = imageSpacingConfigValue;
		borderSpacing = borderSpacingConfigValue;
	}
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.selectedLayoutName = function()
	{
		// build an array with all available layout names in it
		var availableLayouts = new Array(
			global.constants.rectangleLayoutName(),
			global.constants.textLayoutName(),
			global.constants.symbolLayoutName(),
			global.constants.svgLayoutName());
		
		// Default to the SVG layout.
		var selectedLayoutName = global.constants.svgLayoutName();
		
		for (var i = 0; i < availableLayouts.length; i++)
		{
			var layoutName = availableLayouts[i];
			
			// read the value from the config file
			var layoutConfigValue = plasmoid.readConfig(layoutName);
			
			// check if the layout is enabled
			if (layoutConfigValue == true)
			{
				selectedLayoutName = layoutName;
				break;
			}
		}
		
		return selectedLayoutName;
	}
	
	this.updateOrientation = function()
	{
		var orientationList = new Array(
			global.constants.horizontalOrientation(),
			global.constants.verticalOrientation());
			
		// go through the list of possible layouts
		for (var i = 0; i < orientationList.length; i++)
		{
			var currentOrientation = orientationList[i];
			
			// read the value of the current orientation
			var orientationConfigValue = plasmoid.readConfig(currentOrientation);
			
			// check if the orientation is enabled
			if (orientationConfigValue == true)
			{
				orientation = currentOrientation;
				break;
			}
		}
	}
	
	/**
	  * returns the layout which was selected by the user
	  */
	this.selectedLayout = function()
	{
		return selectedLayout;
	}
	
	/**
	  * returns the spacing between the two images
	  */
	this.imageSpacing = function()
	{
		return imageSpacing;
	}
	
	/**
	  * returns the (top and bottom) border-spacing
	  */
	this.borderSpacing = function()
	{
		return borderSpacing;
	}
	
	/**
	  * returns the configured font
	  */
	this.font = function()
	{
		return font;
	}
	
	/**
	  * returns the configured orientation
	  */
	this.orientation = function()
	{
		return orientation;
	}
}