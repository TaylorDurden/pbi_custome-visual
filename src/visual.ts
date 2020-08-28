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
            this.viewport = options.viewport;
            const { width, height } = this.viewport;
            this.settings = VisualSettings.parse(dataView) as VisualSettings;
            const object = this.settings.circle;
            var a = dataView.table.columns[1].roles.TypeName;
            var ytd: number = Number(dataView.table.rows[0][this.GetColumnsIndex(dataView, "YTD")].toString());
            var yff: number = Number(dataView.table.rows[0][this.GetColumnsIndex(dataView, "FY Fore")].toString());
            var gpy: number = Number(dataView.table.rows[0][this.GetColumnsIndex(dataView, "Growth over Past year")].toString());
            ReactCircleCard.update({
                background: object && object.circleColor ? object.circleColor : undefined,
                ytd_background_color: this.GetBackgroundColor(ytd),
                yff_background_color: this.GetBackgroundColor(yff),
                gpy_background_color: this.GetBackgroundColor(gpy),
                typeName: dataView.table.rows[0][this.GetColumnsIndex(dataView, "TypeName")].toString(),
                ytdvalue: (ytd * 100).toString() + "%",
                yffvalue: (yff * 100).toString() + "%",
                gpyvalue: (gpy * 100).toString() + "%",
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactCircleCard.update(initialState);
    }

    private GetBackgroundColor(val: number) {
        if (val >= 0) {
            return "#65ceb6"//绿色
        } else if (val < 0 && val >= -0.10) {
            return "#e2d63f"//黄色
        } else if (val < -0.10) {
            return "#ea7d0c"//橙色
        }
    }

    private GetColumnsIndex(dataView, displayName) {
        var columns = dataView.table.columns;
        for (var i = 0, len = columns.length; i < len; i++) {
            if (columns[i].displayName === displayName) {
                return i;
            }
        }
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}