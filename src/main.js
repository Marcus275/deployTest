import React  from 'react';
// import { Stage, Layer, Star, Text } from 'react-konva';


export default class Main extends React.Component {
    render(){
        return <div>
            {this.create_form()}
        </div>
    }


    create_form(){
        return <div>
            <form
                id="input-form"
                method="post">
                <h2>
                    Input data
                </h2>
                <label>
                    <span className="text">user:</span>
                    <input type="email" name="email"/><br/>
                </label>
                <br/>
                <label>
                    <span className="text">password:</span>
                    <input type="password" name="password"/><br/>
                </label><br/>
                <div className="align-right">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    }
}



