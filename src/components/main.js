import React from 'react';
import Konva_Wrapper from './konva_wrapper'
import Info from './info.js'


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area_length: '',
            processing: false,
            area_height: '',
            rectangles: [{length: 0, height: 0}],
            points: [],
            values : {
                x : 0,
                y: 0,
                width: 0,
                height: 0
            }
        };
    }


    handleRectangleNameChange = idx => evt => {
        const newRectangles = this.state.rectangles.map((rectangle, sidx) => {
            if (idx !== sidx) return rectangle;
            let returnObject = {...rectangle};
            returnObject[evt.target.name] = evt.target.value;
            console.log(rectangle)
            console.log(returnObject)
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


    handleClick(values){
        console.log('Eureka!')
        console.log(values)
        this.setState({values: values})
    }


    renderRectangleInput() {
        return <div>
            <h4>Rectangles</h4>
            <p>Length, height, id:</p>
            {this.state.rectangles.map((rectangle, idx) => (
                <div className="rectangle">
                    <input
                        type="number"
                        value={rectangle.length}
                        name={"length"}
                        onChange={this.handleRectangleNameChange(idx)}
                    />
                    <input
                        type="number"
                        value={rectangle.height}
                        name={"height"}
                        onChange={this.handleRectangleNameChange(idx)}
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
        console.log(this.state);

        return (
            <div>
                <Info values={this.state.values} />
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
                <Konva_Wrapper points={this.state.points} area_length={this.state.area_length} area_height={this.state.area_height} handleClick={this.handleClick.bind(this)}/>
            </div>
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
                console.log(text);
                let data = JSON.parse(text);
                this.setState({points: data})
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



