import React from 'react'

export default function(props){
    return(
        <div>
            Portfolio Details for {props.match.params.slug}
        </div>
    )
}