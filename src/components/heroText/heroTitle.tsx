import React from 'react'

const HeroTitle: React.FC<{title: string}> = ({ title }) => {
    return (
      <div>{title}</div>
    )
}
export default HeroTitle;