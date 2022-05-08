import React from 'react'

const DATA = [
  {
    heading: 'Q2 2022',
    checked: ['Plantoids Alpha Version', 'Whitepaper'],
    text: [
      'Plantoids Alpha Version',
      'Whitepaper',
      'Twitter',
      'Discord (invite-only)',
      'Website release',
    ],
  },
  {
    heading: 'Q3 2022',

    text: [
      'Whitelist acceptance',
      'OG Generation reveal',
      'Plantoids Leadership Board',
      'OG Whitelist Mint',
      'New Landing page release',
    ],
  },
  {
    heading: 'Q4 2022',
    text: [
      'Marketplace',
      'Plantoids Leadership Board',
      'New Partner announcement',
      'Sustainable Plantoids merch drop',
      'Community events and WL giveaways for holders',
    ],
  },
]

console.log(DATA)
const Roadmap = () => {
  return (
    <div className="roadmap">
      <div className="wrapper">
        <div className="roadmap__inner">
          <h2>Roadmap</h2>
          <div className="roadmap__cards">
            {DATA.map((item, index) => {
              console.log(item)
              return (
                <div key={index} className="roadmap__card">
                  <h1>{item.heading}</h1>

                  <div className="roadmap__card__item">
                    {item.text.map((text, index) => {
                      return (
                        <div key={index}>
                          <span></span>
                          <p>{text}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* <div className="roadmap__card">1</div>
            <div className="roadmap__card">2</div>
            <div className="roadmap__card">3</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap
