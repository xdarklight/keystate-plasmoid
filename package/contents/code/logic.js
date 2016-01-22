.pragma library

/*
 * Key = name of the datasource in plasma
 * Value = describes the configuration for this key
 */
var keyInformation = {
	"Num Lock": {
		visibilityConfigKey: "ShowNumLock",
		colorConfigKey: "NumLockColor",

		sortIndex: 0,

		name: "Num",
		symbol: "#",

		isPressed: false,
	},
	"Caps Lock": {
		visibilityConfigKey: "ShowCapsLock",
		colorConfigKey: "CapsLockColor",

		sortIndex: 1,

		name: "Caps",
		symbol: "⬇",

		isPressed: false,
	},
	"Shift": {
		visibilityConfigKey: "ShowShiftPressed",
		colorConfigKey: "ShiftPressedColor",

		sortIndex: 2,

		name: "Shift",
		symbol: "⇧",

		isPressed: false,
	},
	"Ctrl": {
		visibilityConfigKey: "ShowCtrlPressed",
		colorConfigKey: "CtrlPressedColor",

		sortIndex: 3,

		name: "Ctrl",
		symbol: "^",

		isPressed: false,
	},
	"Meta": {
		visibilityConfigKey: "ShowMetaPressed",
		colorConfigKey: "MetaPressedColor",

		sortIndex: 4,

		name: "Meta",
		symbol: "⚑",

		isPressed: false,
	},
	"Super": {
		visibilityConfigKey: "ShowSuperPressed",
		colorConfigKey: "SuperPressedColor",

		sortIndex: 5,

		name: "Super",
		symbol: "⚑",

		isPressed: false,
	},
	"Hyper": {
		visibilityConfigKey: "ShowHyperPressed",
		colorConfigKey: "HyperPressedColor",

		sortIndex: 6,

		name: "Hyper",
		symbol: "⚑",

		isPressed: false,
	},
	"Alt": {
		visibilityConfigKey: "ShowAltPressed",
		colorConfigKey: "AltPressedColor",

		sortIndex: 7,

		name: "Alt",
		symbol: "⎇",

		isPressed: false,
	},
	"AltGr": {
		visibilityConfigKey: "ShowAltGrPressed",
		colorConfigKey: "AltGrPressedColor",

		sortIndex: 8,

		name: "AltGr",
		symbol: "_",

		isPressed: false,
	},
};

var indexToDataSourceName = new Array();

function isKeyDisplayed(plasmoid, keyInfo)
{
	var isConfiguredToShow = plasmoid.configuration[keyInfo.visibilityConfigKey];

	if (!isConfiguredToShow) {
		return false;
	}

	return keyInfo.isPressed;
}

function getKeyColor(plasmoid, keyInfo)
{
	if (keyInfo.isPressed) {
		return plasmoid.configuration[keyInfo.colorConfigKey].toString();
	}

	return null;
}

function getModel(plasmoid) {
	var model = new Array();

	for (var dataSourceName in keyInformation) {
		if (isKeyDisplayed(plasmoid, keyInformation[dataSourceName])) {

			var keyElement = {
				sortIndex: 0,
				name: null,
				symbol: null,
				keyColor: "",
			};

			keyElement.sortIndex = keyInformation[dataSourceName].sortIndex;
			keyElement.name = keyInformation[dataSourceName].name;
			keyElement.symbol = keyInformation[dataSourceName].symbol;
			keyElement.keyColor = getKeyColor(plasmoid, keyInformation[dataSourceName]);

			model.push(keyElement);
		}
	}

	return model;
}

function getDataSources() {
	return Object.keys(keyInformation);
}

function setData(data) {
	indexToDataSourceName = new Array();

	for (var dataSourceName in data) {
		indexToDataSourceName.push(dataSourceName);

		if (!data[dataSourceName] || !keyInformation[dataSourceName]) {
			continue;
		}

		// The keystate dataengine also sends "Pressed" for "Locked" keys.
		keyInformation[dataSourceName].isPressed = data[dataSourceName].Pressed;
	}
}
