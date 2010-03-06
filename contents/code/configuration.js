/**
  * an object which holds all configuration related data
  */
Configuration = function()
{
	// configuration properties
	imageSpacing = 1;
	topAndBottomPadding = 2;
	numLockColor = new QColor();
	capsLockColor = new QColor();
	layoutName = "";
	font = new QFont("Sans Serif", 7);
	
	// internal constants
	numLockColorConfigName = "NumLockColor";
	capsLockColorConfigName = "CapsLockColor";
	imageSpacingConfigName = "ImageSpacing";
	imagePaddingConfigName = "ImagePadding";
	verticalLayoutConfigName= "VerticalLayout";
	horizontalLayoutConfigName= "HorizontalLayout";
	textLayoutConfigName = "TextLayout";
	fontConfigName = "Font";
	
	defaultFontKey = "FONT_FALLBACK,12,-1,5,50,0,0,0,0,0";
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getLayoutName = function()
	{
		// read the config file values
		var verticalLayoutConfigValue = plasmoid.readConfig(verticalLayoutConfigName);
		var horizontalLayoutConfigValue = plasmoid.readConfig(horizontalLayoutConfigName);
		var textLayoutConfigValue = plasmoid.readConfig(textLayoutConfigName);
		
		// parse the values from the config file
		var verticalLayout = Boolean(verticalLayoutConfigValue);
		var horizontalLayout = Boolean(horizontalLayoutConfigValue);
		var textLayout = Boolean(textLayoutConfigValue);
		
		// check which layout is enabled
		if (verticalLayout == true)
		{
			// the vertical layout is enabled
			return globals.constants.verticalLayoutName();
		}
		else if (textLayout == true)
		{
			// the text layout is enabled
			return globals.constants.textLayoutName();
		}
		else
		{
			// default to horizontal layout
			return globals.constants.horizontalLayoutName();
		}
	}
	
	/**
	  * reads the settings from the configuration file
	  * and fills the properties of the configuration object
	  */
	this.initialize = function()
	{
		// config values
		var numLockColorConfigValue = plasmoid.readConfig(numLockColorConfigName);
		var capsLockColorConfigValue = plasmoid.readConfig(capsLockColorConfigName);
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		
		// TODO: workaround for the font problem:
		// we cannot specify a default font in the kcfg xml file
		// instead we use a fake default font - the font's key is generated from
		// thake fake default and we can check if the font has been initialized correctly
		if (fontConfigValue.key == defaultFontKey)
		{
			// write the default font settings to the config file
			plasmoid.writeConfig(fontConfigName, font);
			
			// re-read the font from the config file
			fontConfigValue = plasmoid.readConfig(fontConfigName);
		}
		
		// save our settings internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		imageSpacing = parseInt(imageSpacingConfigValue);
		imagePadding = parseInt(imagePaddingConfigValue);
		font = fontConfigValue;
		
		// get the correct layout
		layoutName = this.getLayoutName();
	}
	
	/**
	  * returns the spacing between the two images
	  */
	this.imageSpacing = function()
	{
		return imageSpacing;
	}
	
	this.imagePadding = function()
	{
		return imagePadding;
	}
	
	/**
	  * returns the color for the num lock part
	  */
	this.numLockColor = function()
	{
		return numLockColor;
	}
	
	/**
	  * returns the color for the caps lock part
	  */
	this.capsLockColor = function()
	{
		return capsLockColor;
	}
	
	/**
	  * returns the name of the selected layout
	  */
	this.layoutName = function()
	{
		return layoutName;
	}
	
	/**
	  * returns the configured font
	  */
	this.font = function()
	{
		return font;
	}
}