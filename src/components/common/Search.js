import React from 'react';
import Loading from './Loading';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import { withRouter } from 'react-router-dom';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(e) {
        const searchQuery = e.target.value;
        this.setState({ searchQuery });

        if(!searchQuery) {
            return false
        }
        this.setState({ loading: true });
        
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then(data => {
            this.setState({ 
                searchResults: data,
                loading: false
            });
        });
    }

    handleRedirect(currencyId) {
        this.setState({
            searchQuery: '',
            searchResults: []
        })
        this.props.history.push(`/currency/${currencyId}`)
    }

    renderSearchResults() {
        const { loading, searchResults, searchQuery } = this.state;
        if(!searchQuery){
            return ''
        }
        if(searchResults.length > 0) {
            return(
                <div className="Search-result-container">
                    { searchResults.map(result => {
                        return(
                            <div 
                                className="Search-result"
                                key={result.id}
                                onClick={() => this.handleRedirect(result.id)}
                            >
                                
                                { result.name } ({ result.symbol })

                            </div>
                    );
                })
                  }
                </div>
            );
        }
    }

    render() {
        const { loading, searchResults, searchQuery } = this.state;
        return(
            <div className="Search">
                <div>
                    <span className="Search-icon"/>
                    <input 
                        type="text" 
                        placeholder="Currency name"
                        className="Search-input"
                        onChange={ this.handleChange }
                        value={ searchQuery }
                    />

                    {  
                        loading && 
                            <div className="Search-loading">
                                <Loading 
                                    width = '20px'
                                    height = '20px'  
                                  />
                            </div>
                      }

                </div>

                    { this.renderSearchResults() }

            </div>
        );
    }
};

export default withRouter(Search);