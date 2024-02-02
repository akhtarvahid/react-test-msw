import React from 'react'

const HeroTitle: React.FC<{title: string}> = ({ title }) => {
    return (
      <div>{title ? title : 'Vahid'}</div>
    )
}
export default HeroTitle;