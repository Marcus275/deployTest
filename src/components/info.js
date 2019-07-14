import React  from 'react';


export default class Info extends React.Component {
    render(){
        console.log('In info')
        console.log(this.props)
        return (
            <div>
                <p>X:{this.props.values.x}</p>
                <p>Y:{this.props.values.y}</p>
                <p>Width:{this.props.values.width}</p>
                <p>Height:{this.props.values.height}</p>
            </div>
        )
    }
}