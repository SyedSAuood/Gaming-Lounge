import React, { useState } from 'react'
import Menu from './Menu'
import Ranking from './Ranking'

const Rankinghome = () => {
  const [active, setActive] = useState([])

  const [category, setCategory] = useState("Gaming")

  console.log(category)
  return (
    <div className="mt-12 mx-auto py-8">
      <div className="max-w-screen-lg mx-auto bg-[#2f323a] rounded-lg shadow-lg p-8">
        <Menu active={active} setActive={setActive} setCategory={setCategory} />
        <Ranking gamename={category} />
      </div>
    </div>
  )
}

export default Rankinghome