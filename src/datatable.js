import React from 'react';
import PropTypes from 'prop-types';
import { Column } from './column.js';
import { Pagination } from './pagination.js';
import '../sass/main.scss';

const SORT_ASC = 1;
const SORT_DESC = -1;
const SORT_NONE = 0;

class Datatable extends React.Component {

    constructor( props ) {

        super( props );

        this.sortSettings = {

            prop: '',
            order: SORT_NONE
        };

        this.items = this.props.items;

        this.state = {

            items: this.items.slice( 0, this.props.itemsPerPage[0] ),
            sortClassName: '',
            numberPerPage: this.props.itemsPerPage[0],
            activePage: 1,
        };
    }

    makeClassName( text ) {

        return this.props.classNamePrefix + '__' + text;
    }

    getItemsByPageNumber( pageNumber, itemsPerPage ) {

        return this.items.slice( (pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage )
    }

    handleHeaderCellClick( propName ) {

        if ( this.props.shouldEnableSort === false ) {

            return;
        }

        let sortClassName = '';

        if ( this.sortSettings.prop === propName ) {

            switch( this.sortSettings.order ) {

                case 0:
                    this.sortSettings.order = SORT_ASC;
                    sortClassName = this.props.classNamePrefix + '--sort-asc';
                    break;

                case 1:
                    this.sortSettings.order = SORT_DESC;
                    sortClassName = this.props.classNamePrefix + '--sort-desc';
                    break;

                case -1:
                    this.sortSettings.order = SORT_NONE;
                    sortClassName = '';
                    break;

                default:
                    break;
            }
        }
        else {

            this.sortSettings.order = 1;
            sortClassName = this.props.classNamePrefix + '--sort-asc';
        }

        this.sortSettings.prop = propName;
        this.items = this.props.items.slice();

        if ( this.sortSettings.order !== 0 ) {

            this.items.sort( ( item1, item2 ) => { 

                let v1 = item1[ propName ] === undefined ? '' : item1[ propName ].toString();
                let v2 = item2[ propName ] === undefined ? '' : item2[ propName ].toString();

                if ( v1 === v2 ) {

                    return 0;
                }

                return ( v1 < v2 ? -1 : 1 ) * this.sortSettings.order;
            } );
        }

        this.setState( { 

            items: this.getItemsByPageNumber( this.state.activePage, this.state.numberPerPage ),
            sortClassName: sortClassName
        } );
    }

    handleRowClick( object ) {

        this.props.onRowClick( object );
    }

    handleRowCellClick( content ) {

        this.props.onRowCellClick( content );
    }

    handlePageClick( pageNumber ) {

        this.setState( {

            items: this.getItemsByPageNumber( pageNumber, this.state.numberPerPage ),
            activePage: pageNumber
        } )
    }

    renderCell( content, title ) {

        return  <span className={ this.makeClassName( 'cell-content' ) } >
                    { content }
                </span>
    }

    renderRow( object, index ) {

        return  <div className={ this.makeClassName( 'row' ) } 
                     key={ index } 
                     onClick={ () => this.handleRowClick( object ) } 
                >
                {
                    this.props.cols.map( col =>

                        <span className={ this.makeClassName( 'body-cell' ) } 
                              key={ col.prop }
                        >
                        { 
                            this.renderCell( object[ col.prop ], col.name ) 
                        }
                        </span>
                    )
                }
                </div>
    }

    renderHeader() {
        
        let classNameOfHeader = this.makeClassName( 'header' );
        let classNameOfCell = this.makeClassName( 'header-cell' );
        let classNameOfCellOnSort = `${classNameOfCell} ${this.state.sortClassName}`;

        let columnDefs = this.props.cols;

        return  <div className={ classNameOfHeader }>
                {
                    columnDefs.map( ( colDef, index ) => {

                        let column = new Column( colDef );
                        let className = this.sortSettings.prop === colDef.prop 
                                      ? classNameOfCellOnSort
                                      : classNameOfCell;

                        return  <span key={ index } 
                                      className={ className }
                                      onClick={ () => this.handleHeaderCellClick( column.prop ) }
                                >
                                    <span
                                        className={ this.makeClassName( 'cell-content' ) }
                                    >
                                         { column.name }
                                    </span>
                                </span>
                    } )
                }
                </div>
    }

    renderBody() {

        return  <div className={ this.makeClassName( 'body' ) }>
                {
                    this.state.items.map( ( item, index ) => this.renderRow( item, index ) )
                }
                </div>
    }

    renderFooter() {

        return  <div className={ this.makeClassName( 'footer' ) }></div>
    }


    handlePerPageChange( event ) {

        let numberPerPage =  parseInt(event.target.value);
        let items = this.getItemsByPageNumber( this.state.activePage, numberPerPage );
        let totalPages = Math.ceil( this.items.length / numberPerPage );
        let activePage = this.state.activePage;

        if ( items.length === 0 ) {

            items = this.getItemsByPageNumber( totalPages, numberPerPage );
            activePage = totalPages;
        }

        this.setState( { 

            items: items,
            numberPerPage: numberPerPage,
            activePage: activePage,
        } );
    }

    renderItemsPerPage() {

        return  <div className={ this.makeClassName( 'per-page' ) }>
                    <select onChange={ this.handlePerPageChange.bind(this) } >
                    {
                        this.props.itemsPerPage.map( num =>

                            <option key={num} value={num} >{num}</option> 
                        )
                    }
                    </select>
                </div>
    }

    renderPagination() {

        return  <Pagination totalItems={ this.props.items.length }
                            itemsPerPage={ this.state.numberPerPage }
                            activePage={ this.state.activePage }
                            onPageClick={ this.handlePageClick.bind(this) } 
                />
    }

    render() {

        return  <div className={ this.props.classNamePrefix } >
                    <div className={ this.makeClassName( 'table' ) }>
                        { this.renderHeader() }
                        { this.renderBody() }
                        { this.renderFooter() }
                    </div>
                    <div className={ this.makeClassName( 'addons' ) }>
                        { this.renderItemsPerPage() }
                        { this.renderPagination() }
                    </div>
                </div>

    }
}

Datatable.defaultProps = {

    items: [],
    cols: [],
    classNamePrefix: 'datatable',
    shouldEnableSort: true,
    itemsPerPage: [ 10, 20, 30 ],
    onRowClick: () => {}
};

Datatable.propTypes = {

    items: PropTypes.array,
    cols: PropTypes.array,
    classNamePrefix: PropTypes.string,
    shouldEnableSort: PropTypes.bool,
    itemsPerPage: PropTypes.array,
    onRowClick: PropTypes.func
};

export {

    Datatable
};