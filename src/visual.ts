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

import { ReactCircleCard, initialState } from "./component";
import IViewport = powerbi.IViewport;
const NA = "N.A";

export class Visual implements IVisual {

    private viewport: IViewport;
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private settings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(ReactCircleCard, {});
        this.target = options.element;
        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];

            this.settings = VisualSettings.parse(dataView) as VisualSettings;

            const currentRow = dataView.table.rows[0];

            const ytd_index = this.GetColumnsIndex(dataView, "YTD");
            const yff_index = this.GetColumnsIndex(dataView, "FyFore");
            const gpy_index = this.GetColumnsIndex(dataView, "GOPY");
            const name_index = this.GetColumnsIndex(dataView, "TypeName");

            var ytd: number = ytd_index === -1 ? Number.NaN : Number(currentRow[ytd_index].toString());
            var yff: number = yff_index === -1 ? Number.NaN : Number(currentRow[yff_index].toString());
            var gpy: number = gpy_index === -1 ? Number.NaN : Number(currentRow[gpy_index].toString());
            ReactCircleCard.update({
                ytd_css_property: this.GetCssProperty(ytd),
                yff_css_property: this.GetCssProperty(yff),
                gpy_css_property: this.GetCssProperty(gpy),
                typeName: name_index === -1 ? NA : dataView.table.rows[0][name_index].toString(),
                ytdvalue: this.formatValueString(ytd),
                yffvalue: this.formatValueString(yff),
                gpyvalue: this.formatValueString(gpy),
            });
        } else {
            this.clear();
        }
    }

    private formatValueString(number: number) {
        return isNaN(number) ? NA : (number * 100).toString() + "%";
    }

    private clear() {
        ReactCircleCard.update(initialState);
    }

    private GetCssProperty(val: number) {
        if (val >= 0) {
            return { backgroundColor: "#65ceb6", color: "#fff" };//绿色
        } else if (val < 0 && val >= -0.10) {
            return { backgroundColor: "#e2d63f", color: "#fff" };//黄色
        } else if (val < -0.10) {
            return { backgroundColor: "#ea7d0c", color: "#fff" };//橙色
        } else {//N.A
            return { backgroundColor: "#fff", color: "#000", fontWeight: "bold" };
        }
    }

    private GetColumnsIndex(dataView, displayName) {
        var columns = dataView.table.columns;
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

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}