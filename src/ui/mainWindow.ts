import * as Environment from "../environment";
import ParkRide from "../objects/parkRide";
import Transformer from "../services/transformer";
import UiConstants from "./uiConstants";
import RideType from "../objects/rideType";

export default class MainWindow {
  onUpdate?: () => void;

  onClose?: () => void;

  private window?: Window;

  private ridesInPark: ParkRide[];

  private selectedRide: ParkRide;

  private rideTypes: RideType[];

  private createWindow(): Window {
    this.ridesInPark = ParkRide.getAllRides();
    if (this.ridesInPark.length > 0) {
      [this.selectedRide] = this.ridesInPark;
    }

    const ridesList: DropdownWidget = {
      type: "dropdown",
      x: UiConstants.margin,
      y: UiConstants.toolbarHeight + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight,
      tooltip: "List of rides in the park",
      items: this.ridesInPark.map((r) => (Environment.isDevelopment ? `[${r.rideId}] ${r.name}` : r.name)),
      onChange: (i) => {
        if (this.ridesInPark.length >= i) {
          this.selectedRide = this.ridesInPark[i];
        }
      }
    };

    this.rideTypes = RideType.getAvailableTypes();

    const carListBox: GroupBoxWidget = {
      type: "groupbox",
      x: UiConstants.margin,
      y: ridesList.y + ridesList.height + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight * this.rideTypes.length + UiConstants.margin * 2.5,
      text: "Car type weights"
    };

    const carListGroup: WidgetBase[] = [];

    this.rideTypes.forEach((t: RideType, i: number) => {
      const widgetWidth: number = UiConstants.halfWidthWidget() - 2 * UiConstants.margin;
      const y: number = carListBox.y + 2 * UiConstants.margin + i * UiConstants.widgetLineHeight;

      carListGroup.push(<LabelWidget>{
        type: "label",
        name: `rideTypeLabel${i}`,
        x: carListBox.x + UiConstants.margin,
        y: y,
        width: widgetWidth,
        height: UiConstants.widgetLineHeight,
        text: t.name
      });

      carListGroup.push(<SpinnerWidget>{
        type: "spinner",
        name: `rideTypeWeight${i}`,
        x: carListBox.x + widgetWidth + UiConstants.margin,
        y: y,
        width: widgetWidth,
        height: UiConstants.widgetLineHeight,
        text: t.weight.toString(),
        onIncrement: () => this.updateWeight(i, 1),
        onDecrement: () => this.updateWeight(i, -1)
      });
    });

    const goButton: ButtonWidget = {
      type: "button",
      x: UiConstants.margin,
      y: carListBox.y + carListBox.height + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight * 2,
      text: "Go",
      onClick: () => {
        Transformer.go(this.selectedRide, this.rideTypes);
      }
    };

    const window = ui.openWindow({
      classification: Environment.namespace,
      title: `${Environment.pluginName} (v${Environment.pluginVersion})`,
      width: UiConstants.windowWidth,
      height: goButton.y + goButton.height + UiConstants.margin,
      widgets: [
        ridesList,
        carListBox,
        ...carListGroup,
        goButton
      ],
      onUpdate: () => {
        if (this.onUpdate) {
          this.onUpdate();
        }
      },
      onClose: () => {
        if (this.onClose) {
          this.onClose();
        }
      }
    });

    return window;
  }

  show(): void {
    if (this.window) {
      this.window.bringToFront();
    } else {
      this.window = this.createWindow();
    }
  }

  static close(): void {
    ui.closeWindows(Environment.namespace);
  }

  private updateWeight(index: number, amount: number): void {
    this.rideTypes[index].weight += amount;

    // Clamp
    if (this.rideTypes[index].weight < 0) {
      this.rideTypes[index].weight = 0;
    }

    if (this.rideTypes[index].weight > 255) {
      this.rideTypes[index].weight = 255;
    }

    this.window.findWidget<SpinnerWidget>(`rideTypeWeight${index}`).text = this.rideTypes[index].weight.toString();
  }
}
