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
	altgrPressedColor = new QColor();
	metaPressedColor = new QColor();
	superPressedColor = new QColor();
	hyperPressedColor = new QColor();
	layoutName = "";
	font = new QFont("Sans Serif", 7);
	showNumLock = true;
	showCapsLock = true;
	showShiftPressed = false;
	showControlPressed = false;
	showAltPressed = false;
	showAltgrPressed = false;
	showmetaPressed = false;
	showsuperPressed = false;
	showHyperPressed = false;
	
	// internal constants
	numLockColorConfigName = "NumLockColor";
	capsLockColorConfigName = "CapsLockColor";
	shiftPressedColorConfigName = "ShiftPressedColor";
	controlPressedColorConfigName = "ControlPressedColor";
	altPressedColorConfigName = "AltPressedColor";
	altgrPressedColorConfigName = "AltGrPressedColor";
	metaPressedColorConfigName = "MetaPressedColor";
	superPressedColorConfigName = "SuperPressedColor";
	hyperPressedColorConfigName = "HyperPressedColor";
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
	showAltgrPressedConfigName = "ShowAltGrPressed";
	showMetaPressedConfigName = "ShowMetaPressed";
	showSuperPressedConfigName = "ShowSuperPressed";
	showHyperPressedConfigName = "ShowHyperPressed";
	
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
	  * reads the key color settings form the config file and parses them
	  */
	this.initializeKeyColors = function()
	{
		// read the values from the config file
		var numLockColorConfigValue = plasmoid.readConfig(numLockColorConfigName);
		var capsLockColorConfigValue = plasmoid.readConfig(capsLockColorConfigName);
		var shiftPressedColorConfigValue = plasmoid.readConfig(shiftPressedColorConfigName);
		var controlPressedColorConfigValue = plasmoid.readConfig(controlPressedColorConfigName);
		var altPressedColorConfigValue = plasmoid.readConfig(altPressedColorConfigName);
		var altgrPressedColorConfigValue = plasmoid.readConfig(altgrPressedColorConfigName);
		var metaPressedColorConfigValue = plasmoid.readConfig(metaPressedColorConfigName);
		var superPressedColorConfigValue = plasmoid.readConfig(superPressedColorConfigName);
		var hyperPressedColorConfigValue = plasmoid.readConfig(hyperPressedColorConfigName);
		
		// parse the values and store them internally
		numLockColor = new QColor(numLockColorConfigValue);
		capsLockColor = new QColor(capsLockColorConfigValue);
		shiftPressedColor = new QColor(shiftPressedColorConfigValue);
		controlPressedColor = new QColor(controlPressedColorConfigValue);
		altPressedColor = new QColor(altPressedColorConfigValue);
		altgrPressedColor = new QColor(altgrPressedColorConfigValue);
		metaPressedColor = new QColor(metaPressedColorConfigValue);
		superPressedColor = new QColor(superPressedColorConfigValue);
		hyperPressedColor = new QColor(hyperPressedColorConfigValue);
	}
	
	/**
	  * reads the shown keys settings form the config file and parses them
	  */
	this.initializeShownKeys = function()
	{
		// read the values from the config file
		var showNumLockConfigValue = plasmoid.readConfig(showNumLockConfigName);
		var showCapsLockConfigValue = plasmoid.readConfig(showCapsLockConfigName);
		var showShiftPressedConfigValue = plasmoid.readConfig(showShiftPressedConfigName);
		var showControlPressedConfigValue = plasmoid.readConfig(showControlPressedConfigName);
		var showAltPressedConfigValue = plasmoid.readConfig(showAltPressedConfigName);
		var showAltgrPressedConfigValue = plasmoid.readConfig(showAltgrPressedConfigName);
		var showMetaPressedConfigValue = plasmoid.readConfig(showMetaPressedConfigName);
		var showSuperPressedConfigValue = plasmoid.readConfig(showSuperPressedConfigName);
		var showHyperPressedConfigValue = plasmoid.readConfig(showHyperPressedConfigName);
		
		// parse the values and store them internally
		showNumLock = Boolean(showNumLockConfigValue);
		showCapsLock = Boolean(showCapsLockConfigValue);
		showShiftPressed = Boolean(showShiftPressedConfigValue);
		showControlPressed = Boolean(showControlPressedConfigValue);
		showAltPressed = Boolean(showAltPressedConfigValue);
		showAltgrPressed = Boolean(showAltgrPressedConfigValue);
		showMetaPressed = Boolean(showMetaPressedConfigValue);
		showSuperPressed = Boolean(showSuperPressedConfigValue);
		showHyperPressed = Boolean(showHyperPressedConfigValue);
	}
	
	/**
	  * reads the settings from the configuration file
	  * and fills the properties of the configuration object
	  */
	this.initialize = function()
	{
		// config values
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var imagePaddingConfigValue = plasmoid.readConfig(imagePaddingConfigName);
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
		
		// save our settings internally
		imageSpacing = parseInt(imageSpacingConfigValue);
		imagePadding = parseInt(imagePaddingConfigValue);
		font = fontConfigValue;
		
		// get the correct layout
		layoutName = this.getLayoutName();
		
		// initialize the key settings
		this.initializeShownKeys();
		this.initializeKeyColors();
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
	  * returns the color for the alt gr pressed part
	  */
	this.altgrPressedColor = function()
	{
		return altgrPressedColor;
	}
	
	/**
	  * returns the color for the meta pressed part
	  */
	this.metaPressedColor = function()
	{
		return metaPressedColor;
	}
	
	/**
	  * returns the color for the super pressed part
	  */
	this.superPressedColor = function()
	{
		return superPressedColor;
	}
	
	/**
	  * returns the color for the hyper pressed part
	  */
	this.hyperPressedColor = function()
	{
		return hyperPressedColor;
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
	
	/**
	  * returns if the alt gr pressed status should be shown or not
	  */
	this.showAltgrPressed = function()
	{
		return showAltgrPressed;
	}
	
	/**
	  * returns if the meta pressed status should be shown or not
	  */
	this.showMetaPressed = function()
	{
		return showMetaPressed;
	}
	
	/**
	  * returns if the super pressed status should be shown or not
	  */
	this.showSuperPressed = function()
	{
		return showSuperPressed;
	}
	
	/**
	  * returns if the hyper pressed status should be shown or not
	  */
	this.showHyperPressed = function()
	{
		return showHyperPressed;
	}
}