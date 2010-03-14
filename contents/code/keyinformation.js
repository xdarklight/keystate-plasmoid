/**
  * an object which describes a key
  */
KeyInformation = function()
{
	this.keyName = "";
	this.keyColor = new QColor();
	this.keyStatus = null;
	
	/**
	  * sets the name of the key
	  */
	this.setName = function(keyName)
	{
		this.keyName = keyName;
	}
	
	/**
	  * sets the color of the key
	  */
	this.setColor = function(keyColor)
	{
		this.keyColor = keyColor;
	}
	
	/**
	  * sets the status of the key
	  */
	this.setStatus = function(keyStatus)
	{
		this.keyStatus = keyStatus;
	}
	
	/**
	  * returns the name of the key
	  */
	this.name = function()
	{
		return this.keyName;
	}
	
	/**
	  * returns the color of the key
	  */
	this.color = function()
	{
		return this.keyColor;
	}
	
	/**
	  * returns the status of the key
	  */
	this.status = function()
	{
		return this.keyStatus;
	}
}