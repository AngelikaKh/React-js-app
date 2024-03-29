import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Pagination from './Pagination';
import Table from './Table';
import { handleResponse } from '../../helpers';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        }
    }
//constructori nerqevy methodneri bajin a 
    componentDidMount() {
        this.fetchCurrencies()
    }

    fetchCurrencies() {
        this.setState({
            loading: true
        })

        fetch(`${API_URL}/cryptocurrencies?page=${this.state.page}&perPage=20`)
        .then( handleResponse )

        .then( (data) => {
            this.setState({
                loading: false,
                currencies: data.currencies,
                totalPages: data.totalPages
            })
        })
        
        .catch( () => {
            this.setState({
                loading:false
            })
        })
    }

    handlePaginationClick = (direction) => {
        let nextPage = this.state.page;
        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1
        this.setState(
            {page: nextPage}, 
            () => {
            this.fetchCurrencies()
        })
    }

    render() {
        const { loading, currencies, error, page, totalPages } = this.state
        if(loading){
            return(
                <div className="loading-container">
                    <Loading/>                    
                </div>
            );
        }
        return (
            <div>
                <Table currencies={ currencies } />
                
                <Pagination 
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                 />

            </div>
        );
    }

};


export default List;