import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.Component {

    getTotalPages() {

        return Math.ceil( this.props.totalItems / this.props.itemsPerPage );
    }

    makeClassName( text ) {

        return this.props.classNamePrefix + '__' + text;
    }

    handlePageClick( pageNumber) {

        this.props.onPageClick( pageNumber );
    }

    handleLeftArrowClick() {

        if ( this.props.activePage > 1 ) {

            let pageNumber = this.props.activePage - 1;

            this.props.onPageClick( pageNumber );
        }
    }

    handleRightArrowClick() {

        let totalPages = this.getTotalPages();

        if ( this.props.activePage < totalPages ) {

            let pageNumber = this.props.activePage + 1;

            this.props.onPageClick( pageNumber );
        }
    }

    render() {

        let classNameOfPage = this.makeClassName( 'page' );

        return (
            <div className={ this.props.classNamePrefix }>
                <span className={ classNameOfPage } 
                      onClick={ this.handleLeftArrowClick.bind(this) }>&lt;</span>
                {
                    new Array( this.getTotalPages() ).fill( undefined ).map( ( item, index ) => {

                        let pageNumber = index + 1;
                        let className = classNameOfPage;

                        if ( pageNumber === this.props.activePage ) {

                            className = `${classNameOfPage} ${classNameOfPage}--active`;
                        }

                        return  <span key={ pageNumber } 
                                      className={ className }
                                      onClick={ () => this.handlePageClick(pageNumber) }
                                >
                                    { pageNumber }
                                </span>
                    } )
                }
                <span className={ classNameOfPage } 
                      onClick={ this.handleRightArrowClick.bind(this) }>&gt;</span>
            </div>
        );
    }
}

Pagination.defaultProps = {

    totalItems: 99,
    itemsPerPage: 10,
    activePage: 1,
    classNamePrefix: 'pagination',
    onPageClick: () => {},
};

Pagination.propTypes = {

    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    classNamePrefix: PropTypes.string,
    onPageClick: PropTypes.func
};

export {

    Pagination
};