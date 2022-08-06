import { Colour } from "../enums/colour";
import WeightDictionary from "../objects/weightDictionary";

export default class ColourMap {
  static primaryColours: WeightDictionary[] = [
    new WeightDictionary(Colour.Grey, 82),
    new WeightDictionary(Colour.White, 79),
    new WeightDictionary(Colour.Black, 79),
    new WeightDictionary(Colour.SaturatedRed, 23),
    new WeightDictionary(Colour.BrightRed, 22),
    new WeightDictionary(Colour.BrightRed, 22),
    new WeightDictionary(Colour.LightBlue, 35),
    new WeightDictionary(Colour.DarkBlue, 30),
    new WeightDictionary(Colour.DarkBrown, 39),
    new WeightDictionary(Colour.OliveGreen, 10),
    new WeightDictionary(Colour.DarkGreen, 20),
    new WeightDictionary(Colour.LightBrown, 23),
    new WeightDictionary(Colour.LightOrange, 13),
    new WeightDictionary(Colour.DarkOrange, 10),
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
