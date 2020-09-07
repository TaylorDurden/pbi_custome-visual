"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class GroupCellSettings {
  public backgroundColor: string = "white";
  public borderRadius: number = 0;
  public groupName: string = "";
}

export class VisualSettings extends DataViewObjectsParser {
  public groupCell: GroupCellSettings = new GroupCellSettings();
}
