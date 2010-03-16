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
	shiftPressedColor = new QColor();
	controlPressedColor = new QColor();
	altPressedColor = new QColor();
	layoutName = "";
	font = new QFont("Sans Serif", 7);
	showNumLock = true;
	showCapsLock = true;
	showShiftPressed = false;
	showControlPressed = false;
	showAltPressed = false;
	
	// internal constants
	numLockColorConfigName = "NumLockColor";
	capsLockColorConfigName = "CapsLockColor";
	shiftPressedColorConfigName = "ShiftPressedColor";
	controlPressedColorConfigName = "ControlPressedColor";
	altPressedColorConfigName = "AltPressedColor";
	imageSpacingConfigName = "ImageSpacing";
	imagePaddingConfigName = "ImagePadding";
	verticalLayoutConfigName= "VerticalLayout";
	horizontalLayoutConfigName= "HorizontalLayout";
	textLayoutConfigName = "TextLayout";
	singleLayoutConfigName = "SingleLayout";
	fontConfigName = "Font";
	showNumLockConfigName = "ShowNumLock";
	showCapsLockConfigName = "ShowCapsLock";
	showShiftPressedConfigName = "ShowShiftPressed";
	showControlPressedConfigName = "ShowControlPressed";
	showAltPressedConfigName = "ShowAltPressed";
	
	uninitializedFontFamily = "FONT_FALLBACK";
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getLayoutName = function()
	{
		// read the config file values
		var verticalLayoutConfigValue = plasmoid.readConfig(verticalLayoutConfigName);
		var horizontalLayoutConfigValue = plasmoid.readConfig(horizontalLayoutConfigName);
		var textLayoutConfigValue = plasmoid.readConfig(textLayoutConfigName);
		var singleLayoutConfigValue = plasmoid.readConfig(singleLayoutConfigName);
		
		// parse the values from the config file
		var verticalLayout = Boolean(verticalLayoutConfigValue);
		var horizontalLayout = Boolean(horizontalLayoutConfigValue);
		var textLayout = Boolean(textLayoutConfigValue);
		var singleLayout = Boolean(singleLayoutConfigValue);
		
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
		else if (singleLayout == true);
		{
			// the single layout is enabled
			return globals.constants.singleLayoutName();
		}
		
		// default to horizontal layout
		return globals.constants.horizontalLayoutName();
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
		var shiftPressedColorConfigValue = plasmoid.readConfig(shiftPressedColorConfigName);
		var controlPressedColorConfigValue = plasmoid.readConfig(controlPressedColorConfigName);
		var altPressedColorConfigValue = plasmoid.readConfig(altPressedColorConfigName);
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		var showNumLockConfigValue = plasmoid.readConfig(showNumLockConfigName);
		var showCapsLockConfigValue = plasmoid.readConfig(showCapsLockConfigName);
		var showShiftPressedConfigValue = plasmoid.readConfig(showShiftPressedConfigName);
		var showControlPressedConfigValue = plasmoid.readConfig(showControlPressedConfigName);
		var showAltPressedConfigValue = plasmoid.readConfig(showAltPressedConfigName);
		
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
		
		// save our settings internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		shiftPressedColor = new QColor(shiftPressedColorConfigValue);
		controlPressedColor = new QColor(controlPressedColorConfigValue);
		altPressedColor = new QColor(altPressedColorConfigValue);
		imageSpacing = parseInt(imageSpacingConfigValue);
		imagePadding = parseInt(imagePaddingConfigValue);
		font = fontConfigValue;
		showNumLock = Boolean(showNumLockConfigValue);
		showCapsLock = Boolean(showCapsLockConfigValue);
		showShiftPressed = Boolean(showShiftPressedConfigValue);
		showControlPressed = Boolean(showControlPressedConfigValue);
		showAltPressed = Boolean(showAltPressedConfigValue);
		
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
	  * returns the color for the shift pressed part
	  */
	this.shiftPressedColor = function()
	{
		return shiftPressedColor;
	}
	
	/**
	  * returns the color for the control pressed part
	  */
	this.controlPressedColor = function()
	{
		return controlPressedColor;
	}
	
	/**
	  * returns the color for the alt pressed part
	  */
	this.altPressedColor = function()
	{
		return altPressedColor;
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
	
	/**
	  * returns if the num lock modifier should be shown or not
	  */
	this.showNumLock = function()
	{
		return showNumLock;
	}
	
	/**
	  * returns if the caps lock modifier should be shown or not
	  */
	this.showCapsLock = function()
	{
		return showCapsLock;
	}
	
	/**
	  * returns if the shift pressed status should be shown or not
	  */
	this.showShiftPressed = function()
	{
		return showShiftPressed;
	}
	
	/**
	  * returns if the control pressed status should be shown or not
	  */
	this.showControlPressed = function()
	{
		return showControlPressed;
	}
	
	/**
	  * returns if the alt pressed status should be shown or not
	  */
	this.showAltPressed = function()
	{
		return showAltPressed;
	}
}