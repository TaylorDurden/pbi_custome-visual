import * as React from "react";

export interface State {
    typeName: string,
    ytdvalue: string,
    // yffvalue: string,
    // gpyvalue: string,
    size: number,
    background?: string,
    borderWidth?: number
}

export const initialState: State = {
    typeName: "",
    ytdvalue: "",
    // yffvalue: "",
    // gpyvalue: "",
    size: 200
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
        // const { typeName, ytdvalue, yffvalue, gpyvalue, size, background, borderWidth } = this.state;
        const { typeName, ytdvalue, size, background, borderWidth } = this.state;
        const style: React.CSSProperties = { width: size, height: size, background, borderWidth };
        return (
            <div className="circleCard" style={style}>
                <p className="titletop lable">{typeName}</p>
                <p className="lable">Performance over Plan</p>
                <p className="lable">
                    <em className="valueview">{ytdvalue}</em>
                    <em className="valueview">0%</em>
                    {/* <em className="valueview">{yffvalue}</em> */}
                </p>
                <p className="lable">
                    <em className="valueview" >YTD</em>
                    <em className="valueview">FY Fore</em>
                </p>
                <p className="lable">Growth over Past year</p>
                <p className="lable">
                    <em className="valueview">0%</em>
                    {/* <em className="valueview">{gpyvalue}</em> */}
                </p>
            </div>
        )
    }
}

export default ReactCircleCard;