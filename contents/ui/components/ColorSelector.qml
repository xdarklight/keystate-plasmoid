import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls
import QtQuick.Layouts 1.0 as QtLayouts
import QtQuick.Dialogs 1.1 as QtDialogs

Item {
	id: colorSelector

	property alias color: colorDialog.color

	width: childrenRect.width
	height: childrenRect.height

	QtControls.GroupBox {
		flat: true

		QtLayouts.RowLayout {
			QtDialogs.ColorDialog {
				id: colorDialog
			}

			Rectangle {
				color: colorDialog.color

				width: 200
				height: theme.mSize(theme.defaultFont).height
				
				border {
					width: mouseArea.containsMouse ? 3 : 1
					color: Qt.darker(colorDialog.color, 1.5)
				}
			}

			MouseArea {
				id: mouseArea
				anchors.fill: parent
				hoverEnabled: true

				onClicked: {
					colorDialog.open()
				}
			}
		}
	}
}
