import React from 'react'
import {FaEdit , FaTrash} from "react-icons/fa";

const List = ({items,removeItem ,editItem}) => {
  return (
    <div className='container'>
     {items.map((item)=>{//item  items   d/c       no container css
        const { title , id }=item;// id use as a key for map method
        return(
            <ul className='listItems' key={id}>
                <li className='listItems2'>
                     {title}
                     <div style={{float : "right"}}>
                        <button type='button' 
                        className='edit-btn' 
                        onClick={()=>editItem(id)}>
                              <FaEdit />         
                        </button>
                        <button type='button' 
                        className='delete-btn' 
                        onClick={()=>removeItem(id)}>
                              <FaTrash />
                        </button>

                     </div>
                </li>
            </ul>
        )
     })}        
    </div>
  )
}

export default List;