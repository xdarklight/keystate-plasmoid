// constants
numLockObjectName = "Num Lock";
capsLockObjectName = "Caps Lock";

// global variables
numLockEnabled = false;
capsLockEnabled = false;

// style settings
iconPadding = 1;
imageSpacing = 1;

// the plasmoid's size
containerRectF = plasmoid.size();

numLockColor = new QColor();
capsLockColor = new QColor();
noColor = new QColor(0, 0, 0, 0);

// by default we want to be quite small
plasmoid.setPreferredSize(32, 32);

plasmoid.aspectRatioMode = Square;

/**
  * called when the configuration of the plasmoid changed
  */
plasmoid.configChanged = function()
{
	// re-read the config file
	initializeConfiguration();
	
	// then update the icon
	plasmoid.update();
}

/**
  * called when the size of the plasmoid changed
  */
plasmoid.sizeChanged = function()
{
	// the plasmoid's size changed -> update the icon
	plasmoid.update();
}

/**
  * called when the interface should be updated
  *
  * @param painter a QPainter with which you can paint the interface
  */
plasmoid.paintInterface = function(painter)
{
	// say we're busy
	plasmoid.busy = true;
	
	var imageWidth = containerRectF.width;
	var imageHeight = (containerRectF.height / 2) - (2 * iconPadding) - imageSpacing;
	
	var numColor;
	var capsColor;
	
	if (numLockEnabled)
	{
		numColor = numLockColor
	}
	else
	{
		numColor = noColor;
	}

	if (capsLockEnabled)
	{
		capsColor = capsLockColor
	}
	else
	{
		capsColor = noColor;
	}
	
	// paint the icon
	painter.fillRect(1, 1, imageWidth, imageHeight, numColor);
	painter.fillRect(1, 1 + imageSpacing + imageHeight, imageWidth, imageHeight, capsColor);
	
	// we're done
	plasmoid.busy = false;
}

/**
  * called when the DataEngines are updated
  *
  * @param name the name of the data source
  * @param data the DateEngine's data
  */
plasmoid.dataUpdated = function(name, data)
{
	var dataChanged = false;
	var currentModifierIsLocked = data.Locked;
	
	// check which modifier was changed
	switch (name)
	{
		case capsLockObjectName:
			// check the CAPS lock modifier
			if (capsLockEnabled != currentModifierIsLocked)
			{
				capsLockEnabled = currentModifierIsLocked;
				dataChanged = true;
			}
			
			break;
		case numLockObjectName:
			// check the NUM lock modifier
			if (numLockEnabled != currentModifierIsLocked)
			{
				numLockEnabled = currentModifierIsLocked;
				dataChanged = true;
			}
			
			break;
		default:
			// well... this shouldn't have happened :(
			// but anyway: dataChanged is false: we will not update
			break;
	}
	
	// only update if the data changed
	if (dataChanged)
	{
		plasmoid.update();
	}
}

/**
  * reads the settings from the configuration file
  */
initializeConfiguration = function()
{
	// constants
	var numLockColorConfigName = "NumLockColor";
	var capsLockColorConfigName = "CapsLockColor";
	var imageSpacingConfigName = "ImageSpacing";
	
	// config values
	var numLockColorConfigValue = plasmoid.readConfig(numLockColorConfigName);
	var capsLockColorConfigValue = plasmoid.readConfig(capsLockColorConfigName);
	var imageSpacingConfigValue = plasmoid.readConfig(imageSpacingConfigName);
	
	// save our settings internally
	numLockColor = new QColor(numLockColorConfigValue);
	capsLockColor = new QColor(capsLockColorConfigValue);
	imageSpacing = parseInt(imageSpacingConfigValue);
}

/**
  * initializes the plasmoid
  */
initializePlasmoid = function()
{
	// tell everyone we're busy
	plasmoid.busy = true;
	
	// read the config file
	initializeConfiguration();
	
	// register dataengines
	dataEngine("keystate").connectSource(numLockObjectName, plasmoid);
	dataEngine("keystate").connectSource(capsLockObjectName, plasmoid);
}

// initialize the plasmoid
initializePlasmoid();