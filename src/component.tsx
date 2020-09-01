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

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    render() {
        // const { typeName, ytdvalue, yffvalue, gpyvalue, ytd_background_color, yff_background_color, gpy_background_color } = this.state;
        const { typeName, ytdvalue, yffvalue, gpyvalue, ytd_css_property, yff_css_property, gpy_css_property } = this.state;
        const ytdbgc: React.CSSProperties = { ...ytd_css_property };
        const fyybgc: React.CSSProperties = { ...yff_css_property };
        const gpybgc: React.CSSProperties = { ...gpy_css_property };
        return (
            <div className="container">
                <div className="title-top label">{typeName}</div>
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