# *point-intercept*

## Description

*point-intercept* is a field-to-database application designed to use the line-point-intercept method for measuring ecological characteristics of a habitat.

The line-point-intercept method is commonly used to rapidly and accurately quantify vegetation and ground cover (Herrick et al 2005). A field ecologist lays a measuring tape of a designated length, or “transect”, at the site of interest and walks the line while stopping at incremented “points” to record data. Typically, a characterization of the soil surface is made and the species of plant intercepting a pin flag are recorded. Additional data can be incorporated depending on the researchers’ question, for example tree canopy cover, soil moisture, or shrub density.

A complete dataset for a project can be downloaded as a CSV file.


## Installation

To install, run `npm install` from the root of the application (server.js)  
To run an instance of the application on your local machine, first modify server.js to allow the server to connect to your local MongoDB database. Change line 34 to:  
`mongoose.connect(mongodb://localhost/point-intercept);`  
Then, from the root of the application (server.js) run `npm start`


## Dependencies
axios  
dotenv  
express  
material-table  
mongoose  
moment  
moment-timezone  
react  
react-csv  
react-dom  
react-router-dom  
react-scripts  
recharts  
@auth0/auth0-react  
@material-ui/core  
@material-ui/icons  


## Usage 

This application relies on three tiers/collections of data, stored within a MongoDB database: project, transect, and point. Point data belong to their parent transect and transect data belong to their parent project. Create a project to begin. In the field, the user can add a transect and record data at points along the transect. The point data collection form is set to increment by 0.25, allowing the field crew to take measurements every quarter meter. When the end of the transect has been reached, the user can enter the final point’s data and select “end transect”.
## Customization

To customize a species list, modify the file: client\src\components\RecordData\HitList.js  
Customization of data fields is possible, but requires work on both the back and front end, along with modifications to the database structure. Feel free to reach out to me for assistance and questions.

## Credits

I would like to thank [Nic Chappel](https://github.com/NicChappell) , Ian Smith, Colin Davis, and [Trenton Cornwall](https://github.com/trentoncornwall) for their contributions and assistance on development of this application.


## License

MIT License

Copyright (c) 2020 Richard A. Levy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
