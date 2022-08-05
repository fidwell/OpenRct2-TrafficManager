export default class UiConstants {
  static windowWidth: number = 200;
  static margin: number = 10;
  static tabSize: number = 30;
  static toolbarHeight: number = 10;
  static widgetLineHeight: number = 14;

  static fullWidthWidget(): number {
    return UiConstants.windowWidth - UiConstants.margin * 2;
  }

  static halfWidthWidget(): number {
    return (UiConstants.windowWidth - UiConstants.margin * 3) / 2;
  }
}
