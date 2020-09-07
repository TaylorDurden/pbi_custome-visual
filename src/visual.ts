"use strict";
import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

import { VisualSettings } from "./settings";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import "./../style/visual.less";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { GroupCellCard, initialState } from "./component";
import IViewport = powerbi.IViewport;
const NA = "N.A";

export class Visual implements IVisual {
  private viewport: IViewport;
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private settings: VisualSettings;

  constructor(options: VisualConstructorOptions) {
    this.reactRoot = React.createElement(GroupCellCard, {});
    this.target = options.element;
    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0];

      this.settings = VisualSettings.parse(dataView) as VisualSettings;
      //   console.log("this.reactRoot: ", this.reactRoot);

      const currentRow = dataView.table.rows[0];

      const ytd_index = this.GetColumnsIndex(dataView, "YTD");
      const yff_index = this.GetColumnsIndex(dataView, "FyFore");
      const gpy_index = this.GetColumnsIndex(dataView, "GOPY");
      const name_index = this.GetColumnsIndex(dataView, "TypeName");
      //   console.log("name_index：", name_index);
      //   console.log("dataView.table:", dataView.table);
      //   console.log(
      //     "dataView.table.rows[0][name_index].toString():",
      //     dataView.table.rows[0][name_index].toString()
      //   );
      const typeName =
        name_index === -1 ? NA : dataView.table.rows[0][name_index].toString();

      const ytd: number =
        ytd_index === -1
          ? Number.NaN
          : Number(currentRow[ytd_index].toString());
      const yff: number =
        yff_index === -1
          ? Number.NaN
          : Number(currentRow[yff_index].toString());
      const gpy: number =
        gpy_index === -1
          ? Number.NaN
          : Number(currentRow[gpy_index].toString());
      //   console.log("this.settings: ", this.settings);
      const containerBackgroudColor = this.settings.groupCell.backgroundColor;
      const borderRadius = this.settings.groupCell.borderRadius;

      GroupCellCard.update({
        ytd_css_property: this.GetCssProperty(ytd),
        yff_css_property: this.GetCssProperty(yff),
        gpy_css_property: this.GetCssProperty(gpy),
        typeName: typeName,
        backgroudColor: containerBackgroudColor,
        borderRadius: borderRadius,
        ytdvalue: this.formatValueString(ytd),
        yffvalue: this.formatValueString(yff),
        gpyvalue: this.formatValueString(gpy),
      });
    } else {
      this.clear();
    }
  }

  private formatValueString(number: number) {
    return isNaN(number) ? NA : Math.round(number * 100).toString() + "%";
  }

  private clear() {
    GroupCellCard.update(initialState);
  }

  private GetCssProperty(val: number) {
    const font_size = 16;
    if (val >= 0) {
      return {
        fontSize: font_size,
        backgroundColor: "#6ECEB2",
        color: "#ffffff",
      }; //绿色
    } else if (val < 0 && val >= -0.1) {
      return {
        fontSize: font_size,
        backgroundColor: "#F1BA24",
        color: "#ffffff",
      }; //黄色
    } else if (val < -0.1) {
      return {
        fontSize: font_size,
        backgroundColor: "#EB8B43",
        color: "#ffffff",
      }; //橙色
    } else {
      //N.A
      return {
        fontSize: font_size,
        backgroundColor: "#EEF1F4",
        color: "#0A3B32",
      };
    }
  }

  private GetColumnsIndex(dataView, displayName) {
    var columns = dataView.table.columns;
    // console.log("GetColumnsIndex columns:", columns);
    for (var i = 0, len = columns.length; i < len; i++) {
      if (columns[i].roles.hasOwnProperty(displayName)) {
        return columns[i].index;
      }
    }
    return -1;
  }

  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    // console.log("enumerateObjectInstances:");
    // console.log("options:", options);
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    );
  }
}
