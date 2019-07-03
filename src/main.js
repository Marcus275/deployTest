import React  from 'react';
// import { Stage, Layer, Star, Text } from 'react-konva';


export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            area_length: '',
            processing: false,
            area_height: '',
            rectangles: [{length: 0, height: 0}]
        };
    }


    handleRectangleNameChange = idx => evt => {
        const newRectangles = this.state.rectangles.map((rectangle, sidx) => {
            if (idx !== sidx) return rectangle;
            let returnObject = {...rectangle};
            returnObject[evt.target.name] = evt.target.value;
            return returnObject
        });

        this.setState({rectangles: newRectangles});
    };


    handleAddRectangle = () => {
        this.setState({
            rectangles: this.state.rectangles.concat([{length: 0, height: 0}])
        });
    };

    handleRemoveRectangle = idx => () => {
        this.setState({
            rectangles: this.state.rectangles.filter((s, sidx) => idx !== sidx)
        });
    };


    renderRectangleInput() {
        return <div>
            <h4>Rectangles</h4>
            <p>Length and then height:</p>
            {this.state.rectangles.map((rectangle, idx) => (
                <div className="rectangle">
                    <input
                        type="number"
                        value={rectangle.length}
                        name={"length"}
                        onChange={this.handleRectangleNameChange(idx, "length")}
                    />
                    <input
                        type="number"
                        value={rectangle.height}
                        name={"height"}
                        onChange={this.handleRectangleNameChange(idx, 'height')}
                    />
                    <button
                        type="button"
                        onClick={this.handleRemoveRectangle(idx)}
                        className="small"
                    >
                        -
                    </button>
                </div>
            ))}
        </div>
    }

    handleChangeAbstract = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        console.log(this.state)
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Area to fill length:
                    <input type="text" name="area_length" onChange={this.handleChangeAbstract}/>
                    Area to fill height:
                    <input type="text" name="area_height" onChange={this.handleChangeAbstract}/>
                </label>
                {this.renderRectangleInput()}
                <button
                    type="button"
                    onClick={this.handleAddRectangle}
                    className="small"
                >
                    Add Rectangle
                </button>
                <button>Incorporate</button>
            </form>
        );
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('Handle submit called');
        this.setState({processing: true});
        let body = JSON.stringify({
            area_length: this.state.area_length,
            area_height: this.state.area_height,
            rectangles: this.state.rectangles
        });

        await fetch('/api/algorithms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((response) => {
            response.text().then((text) => {
                console.log(text)
                // let data = JSON.parse(text);
                // console.log(data);


                // this.setState({
                //     tweets: data.tweets,
                //     meta: data.meta,
                //     processing: 'f',
                //     filteredTweets: [],
                //     filtered: false,
                //     filterError: null,
                //     pagination: {
                //         currentPage: currentPage,
                //         currentResultsId: data.meta.currentResultsId,
                //         nextResultsId: data.meta.nextResultsId
                //
                //     }
                // });
            });

        });

    };
}



