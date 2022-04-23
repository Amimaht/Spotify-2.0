import React from 'react'

function Search({search,setSearch}) {

  return (
    <div className="max-w-[500px] bg-[#1a1a1a] rounded-full overflow-hidden border-2 border-[white] p-1.5 flex items-center">
        <div className = "h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse"/>
        <input type="text" 
        value = {search} 
        onChange={(e)=> setSearch(e.target.value)}
        className= "bg-[#1a1a1a] text-white border-none lg:w-full focus:ring-0 text-xs" 
        placeholder= "Search..." />
    </div>
  )
}

export default Search