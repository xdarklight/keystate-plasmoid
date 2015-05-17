import QtQuick 2.0
import QtQuick.Controls 1.2 as QtControls
import QtQuick.Layouts 1.0 as QtLayouts
import QtQuick.Dialogs 1.1 as QtDialogs

Item {
	id: fontSelector

	property alias font: fontDialog.font

	width: childrenRect.width
	height: childrenRect.height

	QtControls.GroupBox {
		flat: true

		QtLayouts.RowLayout {
			QtDialogs.FontDialog {
				id: fontDialog
			}

			QtControls.TextField {
				font: fontDialog.font
				text: "%1 %2".arg(fontDialog.font.family).arg(fontDialog.font.pointSize)
				readOnly: true
			}

			QtControls.Button {
				text: i18n("Choose...")

				onClicked: {
					fontDialog.open()
				}
			}

			MouseArea {
				id: mouseArea
				anchors.fill: parent
				hoverEnabled: true

				onClicked: {
					fontDialog.open()
				}
			}
		}
	}
}
