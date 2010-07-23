/**
  * the base layout - all layouts should inherit this.
  * NOTE: there's the abstract method drawKey(painter, keyContainer) which you have to implement!
  */
BaseLayout = function()
{
	// convenience variables (so one doesn't have to get them from the globals object every time)
	this.xPosition = 0;
	this.yPosition = 0;
	this.spacing = 0;
	this.borderSpacing = 0;
	this.font = null;
	this.fontSize = 0;
	this.orientation = null;
	
	// the number of pixels the drawing code will walk after a key has been painted
	this.walkSize = 0;
	
	// a boolean flag which indicates if rotating is possible or not.
	this.canRotate = true;
	
	/**
	  * paints the current layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.paint = function(painter)
	{
		// initialize the layout
		this.initializeLayout(painter);
		
		// paint the keys
		this.paintKeys(painter);
	}
	
	/**
	  * initializes the layout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initializeLayout = function(painter)
	{
		// setup the internal variables
		this.setup();
		
		// start at a padded position
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// we're walking on the x-axis: start at the padded value
			this.xPosition += this.borderSpacing;
		}
		else
		{
			// we're walking on the y-axis: start at the padded value
			this.yPosition += this.borderSpacing;
		}
		
		// initialize the layout (if necessary)
		this.initialize(painter);
		
		// append the spacing to the walking size
		this.walkSize += this.spacing;
	}
	
	/**
	  * sets up all internal variables (including the convenience variables)
	  */
	this.setup = function()
	{
		this.xPosition = 0;
		this.yPosition = 0;
		this.walkSize = 0;
		
		// update our internal variables with the values from the configuration
		this.font = global.configuration.layoutConfiguration().getFont();
		this.fontSize = this.font.pointSize;
		this.borderSpacing = global.configuration.layoutConfiguration().getBorderSpacing();
		this.spacing = global.configuration.layoutConfiguration().getImageSpacing();
		this.orientation = global.configuration.layoutConfiguration().getOrientation();
	}
	
	/**
	  * paints all keys
	  */
	this.paintKeys = function(painter)
	{
		// FIXME this is a workaround for some oddity in plasma/the javascript interpreter ;)
		// create a new pen
		var pen = new QPen();
		
		for (var i = 0; i < global.keyInformation.count(); i++)
		{
			var keyContainer = global.keyInformation.getContainer(i);
			
			// tell our pen which color it has
			pen.color = keyContainer.color;
			
			// tell the painter to use our pen
			painter.pen = pen;
			
			// set our font
			painter.font = this.font;
			
			// draw the current key
			this.drawKey(painter, keyContainer);
			
			// walk (update the positions on the x/y axis)
			this.walk();
		}
	}
	
	/**
	  * changes the position on the x or y axis so the painter
	  * doesn't overwrite the current items on the next run
	  */
	this.walk = function()
	{
		// change the positions on the correct axis
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// we're walking on the x-axis: move on the x-axis
			this.xPosition += this.walkSize;
		}
		else
		{
			// we're walking on the y-axis: move on the y-axis
			this.yPosition += this.walkSize;
		}
	}
	
	/**
	  * base implementation which can be overwritten to initialize the layout
	  * walkSize and canRotate should be set by this method
	  */
	this.initialize = function()
	{
		// base implementation does nothing
	}
	
	/**
	  * calculates the average size may be available for an item
	  * (ignoring any borders, spacing and other values)
	  */
	this.calculateAverageSize = function()
	{
		var size = null;
		
		// are we horizontal or vertical?
		if (this.orientation == global.constants.horizontalOrientation())
		{
			// we're horizontal - use the width as base value
			size = plasmoid.size.width;
		}
		else
		{
			// we're vertical - use the height as base value
			size = plasmoid.size.height;
		}
		
		// the average size an item may take
		return size / global.keyInformation.count();
	}
	
	/**
	  * try to guess a border spacing which looks fine on all systems/configurations
	  */
	this.guessBestBorderSpacing = function()
	{
		var averageSize = this.calculateAverageSize();
		
		// calculate the border spacing (the spacing between the border and the first/last item)
		// the lower limit is 8px
		// the best settings should be 50% of the the average item size
		// the upper limit is 20% of the average item size
		return Number.qBound(8, averageSize / 2, averageSize / 100 * 20);
	}
	
	/**
	  * try to guess an image spacing which looks fine on all systems/configurations
	  */
	this.guessBestImageSpacing = function()
	{
		var averageSize = this.calculateAverageSize();
		
		// calculate the image spacing (the spacing between two key items)
		// the lower limit is 3px
		// the best settings should be 25% of the average item size
		// the upper limit is 15% of the average item size
		return Number.qBound(3, averageSize / 4, averageSize / 100 * 15);
	}
}