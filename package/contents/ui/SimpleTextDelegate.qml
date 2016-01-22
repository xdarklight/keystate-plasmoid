import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls

Item {
	property string displayText;

	width: theme.mSize(plasmoid.configuration["Font"]).width * displayText.length
	height: theme.mSize(plasmoid.configuration["Font"]).height

	QtControls.Label {
		id: textLabel

		font: plasmoid.configuration["Font"]
		color: keyColor

		text: displayText
	}
}
