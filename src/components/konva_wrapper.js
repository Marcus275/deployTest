import React  from 'react';
import { Stage, Layer, Text } from 'react-konva';
import Rectangle from './rectangle'
import Konva from 'konva';



export default class Konva_Wrapper extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        console.log('Input at Konva_wrapper');
        console.log(this.props.points);
        let rectangles = [];
        // Maybe put this in BE and pass rect objects along? If possible instead of sending points.
        for(let rectangle of this.props.points){
            let color = Konva.Util.getRandomColor();

            console.log(rectangle)
            console.log(typeof(rectangle.x2))
            rectangles.push(
                <Rectangle
                    x={rectangle.x1}
                    y={rectangle.y1}
                    width={rectangle.x2 - rectangle.x1}
                    height={rectangle.y2 - rectangle.y1}
                    color={color}
                />
            )
        }
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {rectangles}
                </Layer>
            </Stage>
        )
    }
}