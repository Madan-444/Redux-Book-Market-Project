import React from 'react'
import {connect} from 'react-redux'
import { filterByGenre, getGenre } from '../redux/action'

const mapStateToProps = store=> {
    const {categoryList} = store
    return {categoryList}
}

function FilterbyGenre({filterByGenre,categoryList,getGenre}) {
    React.useEffect(()=> {
        filterByGenre()
        getGenre('All')
    },[])
    console.log("my category in filter component",categoryList)
    return (
        <div className='filter-by-benre-container'>
            <p>Filter by Genre:</p>
            <select onChange={(e)=> getGenre(e.target.value)}>
                {categoryList.map((eachGenre,index)=> {
                    return (
                        <option key={index}>{eachGenre}</option>
                    )
                })}
            </select>
        </div>
    )
}
const mapDispatchToProps = dispatch=> {
    return {
        filterByGenre: ()=> dispatch(filterByGenre()),
        getGenre: (genre)=> dispatch(getGenre(genre))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (FilterbyGenre)
