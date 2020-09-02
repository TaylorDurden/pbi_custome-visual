"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class CircleSettings {
    public BackgroundColor: string = "white";
}

export class VisualSettings extends DataViewObjectsParser {
    public Background_color: CircleSettings = new CircleSettings();
}