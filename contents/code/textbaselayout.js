/**
  * a base layout for drawing text
  * NOTE: this uses the abstract method getText(keyName) which you have to implement
  */
TextBaseLayout = function()
{
	/**
	  * initializes the symbol layout
	  * this overrides the method from BaseLayout
	  *
	  * @param painter the painter with which the code will draw
	  */
	this.initialize = function(painter)
	{
		// FIXME: This does not work yet! Somehow not all items are removed.
		for (var j = 0; j < layout.count; ++j)
		{
			layout.removeAt(parseInt(j));
		}
		
		print("after clear(): " + layout.count);
		
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
			var label = new Label();
			label.text = "<font color='" + painter.pen.color + "'>" + this.getText(keyName) + "</font>";
			
			// Add the label to our global layout.
			layout.addItem(label);
			
			// FIXME: remove...
			print(layout.count);
		}
		
		plasmoid.update();
	}
}

// inherit BaseLayout
TextBaseLayout.prototype = new BaseLayout();