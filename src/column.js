/**
 * Column defines the columns of the datatable
 */

class Column {

    constructor( { prop, name, type="text", isEditable=false } ) {

        this.prop = prop;
        this.name = name;
        this.type = type;
        this.isEditable = isEditable;
    }
}

export {

    Column
};