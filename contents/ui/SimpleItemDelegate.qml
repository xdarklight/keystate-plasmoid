import QtQuick 2.0

Item {
	visible: isPressed && plasmoid.configuration[visibilityConfigKey]

	width: visible ? 40 : 0
	height: visible ? 20 : 0
}
