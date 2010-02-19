// global variables
numLockEnabled = false;
capsLockEnabled = false;

// the plasmoid's size
containerRectF = plasmoid.size();

// by default we want to be quite small
plasmoid.setPreferredSize(32, 32);
plasmoid.aspectRatioMode = Square;

plasmoid.include("constants.js");
plasmoid.include("configuration.js");

configuration = new Configuration();
constants = new Constants();

/**
  * called when the configuration of the plasmoid changed
  */
plasmoid.configChanged = function()
{
	// re-read the config file
	configuration.initialize();
	
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
	var imageHeight = (containerRectF.height / 2) - (2 * configuration.iconPadding()) - configuration.imageSpacing();
	
	var numColor;
	var capsColor;
	
	if (numLockEnabled)
	{
		numColor = configuration.numLockColor();
	}
	else
	{
		numColor = configuration.fullyTransparentColor();
	}

	if (capsLockEnabled)
	{
		capsColor = configuration.capsLockColor();
	}
	else
	{
		capsColor = configuration.fullyTransparentColor();
	}
	
	// paint the icon
	painter.fillRect(1, 1, imageWidth, imageHeight, numColor);
	painter.fillRect(1, 1 + configuration.imageSpacing() + imageHeight, imageWidth, imageHeight, capsColor);
	
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
		case constants.capsLockObjectName():
			// check the CAPS lock modifier
			if (capsLockEnabled != currentModifierIsLocked)
			{
				capsLockEnabled = currentModifierIsLocked;
				dataChanged = true;
			}
			
			break;
		case constants.numLockObjectName():
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
  * initializes the plasmoid
  */
initializePlasmoid = function()
{
	// tell everyone we're busy
	plasmoid.busy = true;
	
	// read the config file
	configuration.initialize();
	
	// register dataengines
	dataEngine(constants.engineName()).connectSource(constants.numLockObjectName(), plasmoid);
	dataEngine(constants.engineName()).connectSource(constants.capsLockObjectName(), plasmoid);
}

// initialize the plasmoid
initializePlasmoid();