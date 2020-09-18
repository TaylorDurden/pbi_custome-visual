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

import { State } from "./componentState";

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
      debugger;
      this.settings = VisualSettings.parse(dataView) as VisualSettings;
      let updateObj: State;
      const containerBackgroudColor = this.settings.groupCell.backgroundColor;
      const borderRadius = this.settings.groupCell.borderRadius;
      const groupName = this.settings.groupCell.groupName;
      //   console.log("this.reactRoot: ", this.reactRoot);
      if (dataView.table.rows.length > 0) {
        updateObj = this.getRowData(
          dataView,
          updateObj,
          containerBackgroudColor,
          borderRadius,
          groupName
        );
      } else {
        updateObj = this.getDefaultData(
          updateObj,
          containerBackgroudColor,
          borderRadius,
          groupName
        );
      }

      GroupCellCard.update(updateObj);
    } else {
      this.clear();
    }
  }

  private getDefaultData(
    updateObj: State,
    containerBackgroudColor: string,
    borderRadius: number,
    groupName: string
  ) {
    updateObj = {
      ytd_css_property: this.GetCssProperty(NA),
      yff_css_property: this.GetCssProperty(NA),
      gpy_css_property: this.GetCssProperty(NA),
      typeName: NA,
      backgroudColor: containerBackgroudColor,
      borderRadius: borderRadius,
      groupName: groupName,
      ytdvalue: NA,
      yffvalue: NA,
      gpyvalue: NA,
    };
    return updateObj;
  }

  private getRowData(
    dataView: powerbi.DataView,
    updateObj: State,
    containerBackgroudColor: string,
    borderRadius: number,
    groupName: string
  ) {
    const currentRow = dataView.table.rows[0];

    const ytd_index = this.GetColumnsIndex(dataView, "YTD");
    const yff_index = this.GetColumnsIndex(dataView, "FyFore");
    const gpy_index = this.GetColumnsIndex(dataView, "GOPY");
    const name_index = this.GetColumnsIndex(dataView, "TypeName");

    const typeName =
      name_index === -1 ? NA : dataView.table.rows[0][name_index].toString();

    const ytd: number =
      ytd_index === -1 ? Number.NaN : this.isNull(currentRow[ytd_index]);
    const yff: number =
      yff_index === -1 ? Number.NaN : this.isNull(currentRow[yff_index]);
    const gpy: number =
      gpy_index === -1 ? Number.NaN : this.isNull(currentRow[gpy_index]);
    //   console.log("this.settings: ", this.settings);
    updateObj = {
      ytd_css_property: this.GetCssProperty(ytd),
      yff_css_property: this.GetCssProperty(yff),
      gpy_css_property: this.GetCssProperty(gpy),
      typeName: typeName,
      backgroudColor: containerBackgroudColor,
      borderRadius: borderRadius,
      groupName: groupName,
      ytdvalue: this.formatValueString(ytd),
      yffvalue: this.formatValueString(yff),
      gpyvalue: this.formatValueString(gpy),
    };
    return updateObj;
  }

  private isNull(val) {
    return val === null || !val ? Number.NaN : Number(val.toString());
  }

  private formatValueString(number: number) {
    return isNaN(number) ? NA : Math.round(number * 100).toString() + "%";
  }

  private clear() {
    GroupCellCard.update(initialState);
  }

  private GetCssProperty(val) {
    const font_size = 16;
    if (val >= 0) {
      return {
        fontSize: font_size,
        backgroundColor: "#0097A9",
        color: "#ffffff",
      }; //绿色
    } else if (val < 0 && val >= -0.1) {
      return {
        fontSize: font_size,
        backgroundColor: "#FED141",
        color: "#ffffff",
      }; //黄色
    } else if (val < -0.1) {
      return {
        fontSize: font_size,
        backgroundColor: "#E87722",
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
    // console.log("this.settings:", this.settings);
    // console.log("VisualSettings.getDefault():", VisualSettings.getDefault());
    // return VisualSettings.enumerateObjectInstances(
    //   this.settings || VisualSettings.getDefault(),
    //   options
    // );
    const settings: VisualSettings =
      this.settings || <VisualSettings>VisualSettings.getDefault();
    return VisualSettings.enumerateObjectInstances(settings, options);
  }
}
