import * as Environment from "../environment";
import ParkRide from "../objects/parkRide";
import RideType from "../objects/rideType";
import Transformer from "../services/transformer";
import { getRideId } from "../utilities/ridePicker";
import UiConstants from "./uiConstants";

const pickerToolId = "trafficManager-ride-picker";

const savedWeights: Map<string, number> = new Map();

let savedRideId: number | undefined;

let savedSpeedMedian: number = 60;

let savedSpeedVariation: number = 0;

export default class MainWindow {
  onClose?: () => void;

  private window?: Window;

  private ridesInPark: ParkRide[] = [];

  private selectedRide: ParkRide | undefined = undefined;

  private rideTypes: RideType[] = [];

  private speedMedian: number = savedSpeedMedian;

  private speedVariation: number = savedSpeedVariation;

  private createWindow(): Window {
    this.ridesInPark = ParkRide.getAllRides();
    const savedRideIndex = this.ridesInPark.findIndex((r) => r.rideId === savedRideId);
    const selectedRideIndex = savedRideIndex >= 0 ? savedRideIndex : 0;
    if (this.ridesInPark.length > 0) {
      this.selectedRide = this.ridesInPark[selectedRideIndex];
    }

    const ridesList: DropdownDesc = {
      type: "dropdown",
      name: "rideDropdown",
      x: UiConstants.margin,
      y: UiConstants.toolbarHeight + UiConstants.margin,
      width: UiConstants.fullWidthWidget() - UiConstants.tabSize - UiConstants.margin,
      height: UiConstants.widgetLineHeight,
      tooltip: "List of rides in the park",
      items: this.ridesInPark.map((r) => (Environment.isDevelopment ? `[${r.rideId}] ${r.name}` : r.name)),
      selectedIndex: selectedRideIndex,
      onChange: (i) => {
        if (i < this.ridesInPark.length) {
          this.selectedRide = this.ridesInPark[i];
          savedRideId = this.ridesInPark[i].rideId;
        }
      }
    };

    const ridePicker: ButtonDesc = {
      type: "button",
      name: "ridePicker",
      x: UiConstants.fullWidthWidget() + UiConstants.margin - UiConstants.tabSize,
      y: UiConstants.toolbarHeight + UiConstants.margin,
      width: UiConstants.tabSize,
      height: UiConstants.widgetLineHeight,
      tooltip: "Select a ride by clicking on it in the park",
      text: "Pick",
      onClick: () => this.toggleRidePicker()
    };

    this.rideTypes = RideType.getAvailableTypes();
    this.rideTypes.forEach((t) => {
      const saved = savedWeights.get(t.identifier);
      if (saved !== undefined) {
        t.weight = saved;
      }
    });

    const carListBox: GroupBoxDesc = {
      type: "groupbox",
      x: UiConstants.margin,
      y: ridesList.y + ridesList.height + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight * this.rideTypes.length + UiConstants.margin * 2.5,
      text: "Car type weights"
    };

    const carListGroup: WidgetBaseDesc[] = [];

    this.rideTypes.forEach((t: RideType, i: number) => {
      const widgetWidth: number = UiConstants.halfWidthWidget() - 2 * UiConstants.margin;
      const y: number = carListBox.y + 2 * UiConstants.margin + i * UiConstants.widgetLineHeight;

      carListGroup.push(<LabelWidget>{
        type: "label",
        name: `rideTypeLabel${i}`,
        x: carListBox.x + UiConstants.margin,
        y,
        width: widgetWidth,
        height: UiConstants.widgetLineHeight,
        text: t.name
      });

      carListGroup.push(<SpinnerDesc>{
        type: "spinner",
        name: `rideTypeWeight${i}`,
        x: carListBox.x + widgetWidth + UiConstants.margin,
        y,
        width: widgetWidth,
        height: UiConstants.widgetLineHeight,
        text: t.weight.toString(),
        onIncrement: () => this.updateWeight(i, 1),
        onDecrement: () => this.updateWeight(i, -1)
      });
    });

    const speedBox: GroupBoxDesc = {
      type: "groupbox",
      x: UiConstants.margin,
      y: carListBox.y + carListBox.height + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight * 2 + UiConstants.margin * 3,
      text: "Speed options"
    };

    const speedLabel: LabelDesc = {
      type: "label",
      x: speedBox.x + UiConstants.margin,
      y: speedBox.y + UiConstants.margin * 2,
      width: UiConstants.halfWidthWidget(),
      height: UiConstants.widgetLineHeight,
      text: "Speed:"
    };

    const speedSpinner: SpinnerDesc = {
      type: "spinner",
      name: "speedSpinner",
      x: speedBox.x + UiConstants.halfWidthWidget() - 2 * UiConstants.margin * 2,
      y: speedLabel.y,
      width: UiConstants.halfWidthWidget(),
      height: UiConstants.widgetLineHeight,
      text: this.speedMedian.toString(),
      onIncrement: () => this.updateSpeed(2),
      onDecrement: () => this.updateSpeed(-2)
    };

    const speedVariationLabel: LabelDesc = {
      type: "label",
      x: speedBox.x + UiConstants.margin,
      y: speedLabel.y + UiConstants.widgetLineHeight,
      width: UiConstants.halfWidthWidget(),
      height: UiConstants.widgetLineHeight,
      text: "Variation:"
    };

    const speedVariationDropdown: DropdownDesc = {
      type: "dropdown",
      x: speedSpinner.x,
      y: speedVariationLabel.y,
      width: UiConstants.halfWidthWidget(),
      height: UiConstants.widgetLineHeight,
      tooltip: "Variation in randomized speeds",
      items: ["None", "A little bit", "Some", "A lot"],
      selectedIndex: this.speedVariation,
      onChange: (i) => {
        this.speedVariation = i;
        savedSpeedVariation = i;
      }
    };

    const goButton: ButtonDesc = {
      type: "button",
      x: UiConstants.margin,
      y: speedBox.y + speedBox.height + UiConstants.margin,
      width: UiConstants.fullWidthWidget(),
      height: UiConstants.widgetLineHeight * 2,
      text: "Go",
      onClick: () => {
        if (this.selectedRide) {
          Transformer.go(this.selectedRide, this.rideTypes, this.speedMedian, this.speedVariation);
        }
      }
    };

    const window = ui.openWindow({
      classification: Environment.namespace,
      title: `${Environment.pluginName} (v${Environment.pluginVersion})`,
      width: UiConstants.windowWidth,
      height: goButton.y + goButton.height + UiConstants.margin,
      widgets: [
        ridesList,
        ridePicker,
        carListBox,
        ...carListGroup,
        speedBox,
        speedLabel,
        speedSpinner,
        speedVariationLabel,
        speedVariationDropdown,
        goButton
      ],
      onClose: () => {
        if (ui.tool && ui.tool.id === pickerToolId) {
          ui.tool.cancel();
        }
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

  private toggleRidePicker(): void {
    if (ui.tool && ui.tool.id === pickerToolId) {
      ui.tool.cancel();
      return;
    }
    this.activateRidePicker();
  }

  private activateRidePicker(): void {
    ui.activateTool({
      id: pickerToolId,
      cursor: "cross_hair",
      onDown: (e) => this.onRidePickerDown(e)
    });
  }

  private onRidePickerDown(args: ToolEventArgs): void {
    const rideId = getRideId(args);
    if (rideId === undefined) {
      return;
    }

    const ride = this.ridesInPark.find((r) => r.rideId === rideId);
    if (ride) {
      this.selectedRide = ride;
      savedRideId = ride.rideId;
      if (this.window) {
        const displayName = Environment.isDevelopment ? `[${ride.rideId}] ${ride.name}` : ride.name;
        this.window.findWidget<DropdownWidget>("rideDropdown").text = displayName;
      }
      if (ui.tool) {
        ui.tool.cancel();
      }
    }
  }

  private updateWeight(index: number, amount: number): void {
    if (!this.window) return;
    const rideType = this.rideTypes[index];
    rideType.weight += amount;

    // Clamp
    if (rideType.weight < 0) {
      rideType.weight = 0;
    }
    if (rideType.weight > 255) {
      rideType.weight = 255;
    }

    savedWeights.set(rideType.identifier, rideType.weight);
    this.window.findWidget<SpinnerWidget>(`rideTypeWeight${index}`).text = rideType.weight.toString();
  }

  private updateSpeed(amount: number): void {
    if (!this.window) return;
    this.speedMedian += amount;
    savedSpeedMedian = this.speedMedian;
    this.window.findWidget<SpinnerWidget>("speedSpinner").text = this.speedMedian.toString();
  }
}
