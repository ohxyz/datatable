import React from 'react';
import ReactDOM from 'react-dom';
import { Datatable } from '../../src/datatable';

var persons = [

    { height:  175,       name:    'Andrea'                    },
    { name:   'Annie',    sex:     'Female',   height:   180   },
    { name:   'Campbell', height:   175                        },
    { sex:    'Female',   name:    'Bennie',   height:   175   },
    { name:   'Cameron',  height:   173,       sex:     'Male' },
    { name:   'Zoomaa',   sex:     'Male'                      },
    { name:   'Benjamin', sex:     'Male',     height:   167   },
    { height:  167,       name:    'Anthony',  sex:     'Male' },
    { name:   'Anna',     sex:     'Female',   height:   169   },
    { name:   'Benson',   sex:     'Male'                      }

];

var persons = require( './mock100.json' );

var colDefs = [

    { prop: 'name', name: 'Name' },
    { prop: 'sex', name: 'Gender' },
    { prop: 'height', name: 'Height(cm)', type: 'text' },
];

ReactDOM.render(
    <Datatable classNamePrefix="datatable"
               items={ persons } 
               cols={ colDefs }
               itemsPerPage={ [ 15, 25, 75, 175, 500, 800 ] }
    />,
    document.getElementById('container')
);
