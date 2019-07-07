const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/algorithms', (req, res) => {
    console.log('recieve post request');
    console.log(req.body);
    res.send(shelf_nf(req.body.rectangles, parseInt(req.body.area_length), parseInt(req.body.area_height)))
});


function shelf_nf(rectangles, W, H){
    let shelf = null;
    let shelf_count = 0;
    let points = [];


    for(let rectangle of rectangles){
        let to_add = [Math.max(rectangle.length, rectangle.height), Math.min(rectangle.length, rectangle.height)];
        // Need this null check? Just define shelf up top. Check later
        if(shelf == null) shelf = new Shelf(0, 0, W, parseInt(rectangles[0].height));
        if(Math.max(rectangle.length, rectangle.height) <= shelf.height){to_add = [Math.min(rectangle.length, rectangle.height), Math.max(rectangle.length, rectangle.height)]}

        if(to_add[0] + shelf.vertical > shelf.width || to_add[1] > shelf.height) {
            shelf = new Shelf(0, shelf.horizontal + shelf.height, W, to_add[1]);
            shelf_count += 1
        }
        // Try to fit on open shelf
        if(to_add[0] + shelf.vertical <= shelf.width && to_add[1] <= shelf.height) {
            shelf.vertical += to_add[0];
            let start_x = shelf.vertical - to_add[0];
            if(start_x < 0) start_x = 0;
            points.push(new Rectangle(start_x, shelf.horizontal + to_add[1], shelf.vertical, shelf.horizontal))
        }
    }
    console.log(points);
    return points
}

class Shelf {
    constructor(vertical, horizontal, width, height){
        this.vertical = vertical;
        this.horizontal = horizontal;
        this.width = width;
        this.height = height;
    }
}


class Rectangle {
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}


app.listen(port, () => console.log(`Listening on port ${port}`));




