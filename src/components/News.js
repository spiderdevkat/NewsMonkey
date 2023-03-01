import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    capsFirstLetter=(text)=>{
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capsFirstLetter(this.props.category)}- NewsMonkey`;
    }  
  
  async updateNews(){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f7972f9c6bc452ba644a79910b01d33&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page+1,
            articles:parsedData.articles,
            loading:false
        })
  }
  async componentDidMount(){
    this.updateNews();
  }  

  handlePrevClick=async()=>{
    this.setState({page:this.state.page-1});
    this.updateNews();
  }
  handleNextClick=async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
        this.setState({page:this.state.page+1});
        this.updateNews();
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin:'30px 0px'}}>NewsMonkey- Top {this.capsFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div>
      </div>
    )
  }
}

export default News