import * as React from "react";

export interface State {
    typeName: string,
    ytdvalue: string,
    ytd_css_property: any,
    yffvalue: string,
    yff_css_property: any,
    gpyvalue: string,
    gpy_css_property: any,
}

const DEFAULT_CSS_PROPERTY = { backgroundColor: "#fff", color: "#000" };
const NA = "N.A";
const CountryMap = {
    Icon: [
        {
            name: "HONGKONG",
            displayName: "HK",
            path: "https://s1.ax1x.com/2020/09/02/wpkDd1.th.png"
        }, {
            name: "INDONESIA",
            displayName: "ID",
            path: "https://s1.ax1x.com/2020/09/02/wpAX9K.png"
        }, {
            name: "JAPAN",
            displayName: "JP",
            path: "https://s1.ax1x.com/2020/09/02/wpALh6.png"
        }, {
            name: "MALAYSIA",
            displayName: "MY",
            path: "https://s1.ax1x.com/2020/09/02/wpAj1O.png"
        }, {
            name: "PHILIPPINES",
            displayName: "PH",
            path: "https://s1.ax1x.com/2020/09/02/wpAqtx.png"
        }, {
            name: "SINGAPORE",
            displayName: "SG",
            path: "https://s1.ax1x.com/2020/09/02/wpAbA1.png"
        }, {
            name: "THAILAND",
            displayName: "TH",
            path: "https://s1.ax1x.com/2020/09/02/wpAvcD.png"
        }, {
            name: "VIETNAM",
            displayName: "VN",
            path: "https://s1.ax1x.com/2020/09/02/wpAxje.png"
        }
    ],
    backgroundMapImage: [
        {
            name: "HONGKONG",
            displayName: "HK",
            path: "https://s1.ax1x.com/2020/09/02/wSXBVg.png"
        }, {
            name: "INDONESIA",
            displayName: "ID",
            path: "https://s1.ax1x.com/2020/09/02/wSXt2t.png"
        }, {
            name: "JAPAN",
            displayName: "JP",
            path: "https://s1.ax1x.com/2020/09/02/wSXY8I.png"
        }, {
            name: "MALAYSIA",
            displayName: "MY",
            path: "https://s1.ax1x.com/2020/09/02/wSXJPA.png"
        }, {
            name: "PHILIPPINES",
            displayName: "PH",
            path: "https://s1.ax1x.com/2020/09/02/wSXNxP.png"
        }, {
            name: "SINGAPORE",
            displayName: "SG",
            path: "https://s1.ax1x.com/2020/09/02/wSXaKf.png"
        }, {
            name: "THAILAND",
            displayName: "TH",
            path: "https://s1.ax1x.com/2020/09/02/wSXdr8.png"
        }, {
            name: "VIETNAM",
            displayName: "VN",
            path: "https://s1.ax1x.com/2020/09/02/wSXwqS.png"
        }
    ]
}

export const initialState: State = {
    typeName: "Title",
    ytdvalue: NA,
    ytd_css_property: DEFAULT_CSS_PROPERTY,
    yffvalue: NA,
    yff_css_property: DEFAULT_CSS_PROPERTY,
    gpyvalue: NA,
    gpy_css_property: DEFAULT_CSS_PROPERTY,
}


export class ReactCircleCard extends React.Component<{}, State>{
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof ReactCircleCard.updateCallback === 'function') {
            ReactCircleCard.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        ReactCircleCard.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        ReactCircleCard.updateCallback = null;
    }

    private GetIconOrMapPath(type, typename) {
        var data = type === "icon" ? CountryMap.Icon : CountryMap.backgroundMapImage;
        for (var i = 0, len = data.length; i < len; i++) {
            var newTypeName = typename.replace(/\s*/g, "");
            if (data[i].name === newTypeName.toUpperCase() || data[i].displayName === newTypeName.toUpperCase()) {
                return data[i].path;
            }
        }
        return "";
    }
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    render() {
        const { typeName, ytdvalue, yffvalue, gpyvalue, ytd_css_property, yff_css_property, gpy_css_property } = this.state;
        const ytdbgc: React.CSSProperties = { ...ytd_css_property };
        const fyybgc: React.CSSProperties = { ...yff_css_property };
        const gpybgc: React.CSSProperties = { ...gpy_css_property };


        var backgroundImage = typeName.toUpperCase() === "GROUP" ? {} : { background: "url(" + this.GetIconOrMapPath("map", typeName) + ") no-repeat 100% 100%" };
        console.log(typeName);
        return (
            <div className="container" style={backgroundImage}>
                <div className="title-top label">{typeName.toUpperCase() === "GROUP" || typeName === "Title" ? "" : <img className="title-icon" src={this.GetIconOrMapPath("icon", typeName)}></img>}<span>{typeName}</span></div>
                <div className="label">Performance over Plan</div>
                <div className="label">
                    <div style={{ float: "left", width: "50%" }}>
                        <div style={{ float: "right", width: "80px", textAlign: "center", margin: "0 10px" }}>
                            <p className="value-view" style={ytdbgc}>{ytdvalue}</p>
                            <p className="value-label" >YTD</p>
                        </div>
                    </div>
                    <div style={{ float: "right", width: "50%" }}>
                        <div style={{ float: "left", width: "80px", textAlign: "center", margin: "0 10px" }}>
                            <p className="value-view" style={fyybgc}>{yffvalue}</p>
                            <p className="value-label">FY Fore</p>
                        </div>
                    </div>
                </div>
                <div className="label">Growth over Past year</div>
                <div className="label">
                    <span className="value-view" style={gpybgc}>{gpyvalue}</span>
                </div>
            </div>
        )
    }
}

export default ReactCircleCard;