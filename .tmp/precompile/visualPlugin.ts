import { Visual } from "../../src/visual";
var powerbiKey = "powerbi";
var powerbi = window[powerbiKey];

var rateperformance9A345A4BE9344FC09BC15E03F98169C0_DEBUG = {
    name: 'rateperformance9A345A4BE9344FC09BC15E03F98169C0_DEBUG',
    displayName: 'rate-performance',
    class: 'Visual',
    version: '1.0.0',
    apiVersion: '2.6.0',
    create: (options) => {
        if (Visual) {
            return new Visual(options);
        }

        console.error('Visual instance not found');
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["rateperformance9A345A4BE9344FC09BC15E03F98169C0_DEBUG"] = rateperformance9A345A4BE9344FC09BC15E03F98169C0_DEBUG;
}

export default rateperformance9A345A4BE9344FC09BC15E03F98169C0_DEBUG;