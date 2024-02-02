import React from 'react'

const HeroTitle: React.FC<{title?: string}> = ({ title }) => {
    return (
      <h1>{title ? title : 'Vahid'}</h1>
    )
}
export default HeroTitle;