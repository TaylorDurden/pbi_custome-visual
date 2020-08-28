import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var reactCircleCard9A345A4BE9344FC09BC15E03F98169C0: IVisualPlugin = {
    name: 'reactCircleCard9A345A4BE9344FC09BC15E03F98169C0',
    displayName: 'ReactCircleCard',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["reactCircleCard9A345A4BE9344FC09BC15E03F98169C0"] = reactCircleCard9A345A4BE9344FC09BC15E03F98169C0;
}

export default reactCircleCard9A345A4BE9344FC09BC15E03F98169C0;