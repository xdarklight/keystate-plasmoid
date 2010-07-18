/**
  * the layout configuration object which handles all 
  * layout related configuration (layout selection, fonts, etc.)
  */
LayoutConfiguration = function()
{
	this.selectedLayout = null;
	this.imageSpacing = 1;
	this.font = new QFont("Sans Serif", 7);
	this.preferredSizeEnabled = true;
	this.preferredWidth = 24;
	this.preferredHeight = 24;
	this.orientation = null;
	
	// internal constants
	uninitializedFontFamily = "FONT_FALLBACK";
	imageSpacingConfigName = "ImageSpacing";
	borderSpacingConfigName = "BorderSpacing";
	fontConfigName = "Font";
	preferredSizeEnabledConfigName = "PreferredSizeEnabled";
	preferredWidthConfigName = "PreferredWidth";
	preferredWidthConfigName = "PreferredHeight";
	advancedLayoutSettingsConfigName = "AdvancedLayoutSettings";
	
	/**
	  * initializes the layout configuration
	  */
	this.initialize = function()
	{
		var fontConfigValue = plasmoid.readConfig(fontConfigName);
		
		// TODO: workaround for the font problem:
		// we cannot specify a default font in the kcfg xml file
		// instead we use a fake default font family -> we can compare
		// the fake font familiy and see if it already has been initialized
		if (fontConfigValue.family == uninitializedFontFamily)
		{
			// write the default font settings to the config file
			plasmoid.writeConfig(fontConfigName, this.font);
			
			// re-read the font from the config file
			fontConfigValue = plasmoid.readConfig(fontConfigName);
		}
		
		this.font = fontConfigValue;
		
		// update the layout settings
		this.updateLayoutSettings();
		
		// create an instance of the selected layout
		global.layout.instantiateSelectedLayout();
		
		// update the preferred size of the plasmoid
		global.layout.updatePreferredSize();
	}
	
	/**
	  * updates the layout settings (depending on whether the user has chosen the 
	  * advanced or the simple layout)
	  */
	this.updateLayoutSettings = function()
	{
		// update the orientation settings
		this.updateOrientation();
		
		var advancedLayoutSettingsConfigValue = plasmoid.readConfig(advancedLayoutSettingsConfigName);
		var preferredSizeEnabledConfigValue = plasmoid.readConfig(preferredSizeEnabledConfigName);
		
		this.preferredSizeEnabled = preferredSizeEnabledConfigValue;
		
		if (advancedLayoutSettingsConfigValue)
		{
			this.applyAdvancedLayoutSettings();
		}
		else
		{
			this.applySimpleLayoutSettings();
		}
	}
	
	/**
	  * applies some default settings (which aim to look good anywhere)
	  */
	this.applySimpleLayoutSettings = function()
	{
		// the average of the width and the height
		var averageSize = (plasmoid.size.height + plasmoid.size.width) / 2;
		
		// calculate the image spacing (the spacing between two key items)
		// the lower limit is 3px
		// the best settings should be 25% of the the height which is available per key
		// the upper limit is 15% of the average size
		this.imageSpacing = Number.qBound(3, averageSize / global.keyInformation.count() / 4, averageSize / 100 * 15);
		
		// calculate the border spacing
		// the lower limit is 10px
		// the best settings should be 50% of the the height which is available per key
		// the upper limit is 20% of the average size
		this.borderSpacing = Number.qBound(10, averageSize / global.keyInformation.count() / 2, averageSize / 100 * 20);
	}
	
	/**
	  * parses the advanced settings from the config file
	  */
	this.applyAdvancedLayoutSettings = function()
	{
		// config values
		var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
		var borderSpacingConfigValue = plasmoid.readConfig(borderSpacingConfigName);
		var preferredWidthConfigValue = plasmoid.readConfig(preferredWidthConfigName);
		var preferredHeightConfigValue = plasmoid.readConfig(preferredWidthConfigName);
		
		// save our settings internally
		this.imageSpacing = imageSpacingConfigValue.toInt();
		this.borderSpacing = borderSpacingConfigValue.toInt();
		this.preferredWidth = preferredWidthConfigValue.toInt();
		this.preferredHeight = preferredHeightConfigValue.toInt();
	}
	
	/**
	  * gets the layout name depending on the configuration options
	  */
	this.getSelectedLayoutName = function()
	{
		// build an array with all available layout names in it
		var availableLayouts = new Array(
			global.constants.rectangleLayoutName(),
			global.constants.textLayoutName(),
			global.constants.symbolLayoutName());
		
		// default to horizontal layout
		var selectedLayoutName = global.constants.rectangleLayoutName();
		
		for (var i = 0; i < availableLayouts.length; i++)
		{
			var layoutName = availableLayouts[i];
			
			// read the value from the config file
			var layoutConfigValue = plasmoid.readConfig(layoutName);
			
			// check if the layout is enabled
			if (layoutConfigValue)
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
			if (Boolean(orientationConfigValue))
			{
				this.orientation = currentOrientation;
				break;
			}
		}
	}
	
	/**
	  * returns the layout which was selected by the user
	  */
	this.getSelectedLayout = function()
	{
		return this.selectedLayout;
	}
	
	/**
	  * returns the spacing between the two images
	  */
	this.getImageSpacing = function()
	{
		return this.imageSpacing;
	}
	
	/**
	  * returns the (top and bottom) border-spacing
	  */
	this.getBorderSpacing = function()
	{
		return this.borderSpacing;
	}
	
	/**
	  * returns the configured font
	  */
	this.getFont = function()
	{
		return this.font;
	}
	
	/**
	  * returns whether the user prefers a size or not
	  */
	this.getPreferredSizeEnabled = function()
	{
		return this.preferredSizeEnabled;
	}
	
	/**
	  * returns the preferred width of the plasmoid
	  */
	this.getPreferredWidth = function()
	{
		return this.preferredWidth;
	}
	
	/**
	  * returns the preferred height of the plasmoid
	  */
	this.getPreferredHeight = function()
	{
		return this.preferredHeight;
	}
	
	/**
	  * returns the configured orientation
	  */
	this.getOrientation = function()
	{
		return this.orientation;
	}
}