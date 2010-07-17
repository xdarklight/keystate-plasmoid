/**
  * an object which provides a text layout
  */
TextLayout = function()
{
	/**
	  * returns a text representation of the given key
	  */
	this.getText = function(keyContainer)
	{
		// return the key's text
		return keyContainer.text;
	}
}

// inherit TextBaseLayout
TextLayout.prototype = new TextBaseLayout();