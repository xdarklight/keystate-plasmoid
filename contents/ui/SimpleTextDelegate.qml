import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls

Item {
	property string displayText;

	width: theme.mSize(textLabel.font).width * displayText.length
	height: theme.mSize(textLabel.font).height

	QtControls.Label {
		id: textLabel

		font: plasmoid.configuration["Font"]
		color: plasmoid.configuration[colorConfigKey]

		text: displayText
	}
}
