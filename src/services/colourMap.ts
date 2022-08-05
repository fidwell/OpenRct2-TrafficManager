import { Colour } from "../enums/colour";
import WeightDictionary from "../objects/weightDictionary";

export default class ColourMap {
  static primaryColours: WeightDictionary[] = [
    new WeightDictionary(Colour.Grey, 82),
    new WeightDictionary(Colour.White, 79),
    new WeightDictionary(Colour.Black, 79),
    new WeightDictionary(Colour.SaturatedRed, 67),
    new WeightDictionary(Colour.LightBlue, 65),
    new WeightDictionary(Colour.DarkBrown, 39),
    new WeightDictionary(Colour.DarkGreen, 30),
    new WeightDictionary(Colour.LightBrown, 23),
    new WeightDictionary(Colour.LightOrange, 23),
    new WeightDictionary(Colour.DarkYellow, 20),
    new WeightDictionary(Colour.Yellow, 16),
    new WeightDictionary(Colour.BrightPurple, 10)
  ];

  static secondaryColours: WeightDictionary[] = [
    new WeightDictionary(Colour.Grey, 82),
    new WeightDictionary(Colour.White, 79),
    new WeightDictionary(Colour.Black, 79),
    new WeightDictionary(Colour.DarkYellow, 20)
  ];
}
