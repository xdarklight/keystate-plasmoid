.pragma library

/*
 * Key = name of the datasource in plasma
 * Value = describes the configuration for this key
 */
var keyInformation = {
	"Num Lock": {
		visibilityConfigKey: "ShowNumLock",
		colorConfigKey: "NumLockColor",

		name: "Num",
		symbol: "#",

		isPressed: false,
	},
	"Caps Lock": {
		visibilityConfigKey: "ShowCapsLock",
		colorConfigKey: "CapsLockColor",

		name: "Caps",
		symbol: "⬇",

		isPressed: false,
	},
	"Shift": {
		visibilityConfigKey: "ShowShiftPressed",
		colorConfigKey: "ShiftPressedColor",

		name: "Shift",
		symbol: "⇧",

		isPressed: false,
	},
	"Ctrl": {
		visibilityConfigKey: "ShowCtrlPressed",
		colorConfigKey: "CtrlPressedColor",

		name: "Ctrl",
		symbol: "^",

		isPressed: false,
	},
	"Meta": {
		visibilityConfigKey: "ShowMetaPressed",
		colorConfigKey: "MetaPressedColor",

		name: "Meta",
		symbol: "⚑",

		isPressed: false,
	},
	"Super": {
		visibilityConfigKey: "ShowSuperPressed",
		colorConfigKey: "SuperPressedColor",

		name: "Super",
		symbol: "⚑",

		isPressed: false,
	},
	"Hyper": {
		visibilityConfigKey: "ShowHyperPressed",
		colorConfigKey: "HyperPressedColor",

		name: "Hyper",
		symbol: "⚑",

		isPressed: false,
	},
	"Alt": {
		visibilityConfigKey: "ShowAltPressed",
		colorConfigKey: "AltPressedColor",

		name: "Alt",
		symbol: "⎇",

		isPressed: false,
	},
	"AltGr": {
		visibilityConfigKey: "ShowAltGrPressed",
		colorConfigKey: "AltGrPressedColor",

		name: "AltGr",
		symbol: "_",

		isPressed: false,
	},
};

var indexToDataSourceName = new Array();

function getModel() {
	var model = new Array();

	for (var dataSourceName in keyInformation) {
		model.push(keyInformation[dataSourceName]);
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
