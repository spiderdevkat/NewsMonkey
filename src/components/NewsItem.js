import React from 'react'

const NewsItem = (props)=>{
    let { title, description, imageUrl, newsUrl, author, date ,source} = props ;
    function giveTitle(text) {
      if (!text || text.length === 0) {
        return "";
      }
      if (text.length > 45) {
        return text.slice(0, 45) + "..";
      }
      return text;
    }
    function giveDescription(text) {
      if (!text || text.length === 0) {
        return "";
      }
      if (text.length > 88) {
        return text.slice(0, 88) + "..";
      }
      return text;
    }
    return (
      <div className='my-3'>
        <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-danger">
              {source}
            </span>
        </div>
          <img src={!imageUrl ? "data:image/png;base64,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" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{giveTitle(title)}</h5>
            <p className="card-text">{giveDescription(description)}</p>
            <p className='card-text'><small className='text-muted'></small>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
