/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyName) which you have to implement
  */
TextBaseLayout = function()
{
	items = new Array();
	
	/**
	  * initializes the symbol layout
	  * this overrides the method from BaseLayout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		for (var j = 0; j < items.length; ++j)
		{
			var item = items[j];
			
			layout.removeItem(item);
			
			// HACK
			item.text = "";
		}
		
		// Reset our history array.
		items = new Array();
		
		// Is our layout supposed to be horizontal or vertical?
		if (this.layoutConfiguration.orientation() == global.constants.horizontalOrientation())
		{
			layout.orientation = QtHorizontal;
		}
		else
		{
			layout.orientation = QtVertical;
		}
	}
	
	/**
	  * paints the image with the given painter to the screen
	  *
	  * @param painter the painter used to paint the image
	  * @param keyName the name of the current key
	  */
	this.drawKey = function(painter, keyName)
	{
		// Only draw the key if it's pressed.
		if (global.keyInformation.isPressed(keyName))
		{
			// Create a new label which uses the text from the abstract getText() method.
			// Then apply the color from the painter to the label's text.
			var label = new Label(plasmoid);
			label.text = "<font color='" + painter.pen.color + "'>" + this.getText(keyName) + "</font>";
			
			// Add the label to our global layout.
			layout.addItem(label);
			
			items[items.length] = label;
		}
		
		plasmoid.update();
	}
}

// inherit BaseLayout
TextBaseLayout.prototype = new BaseLayout();