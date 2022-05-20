import React, { useState } from 'react'

const data = [
  {
    question: 'What is the carbon footprint of an NFT?',
    answer:
      'Minting an NFT on the Solana Blockchain consumes as much energy as about 10 google searches. That\'s only 2 grams of carbon dioxide. A Plantoid consumes that much carbon dioxide in less than two hours!',
  },
  {
    question: 'How do Plantoids remove CO₂?',
    answer:
      'Plantoids remove CO₂ through carbon offest programs like Direct Air Carbon Capture provided by Climeworks and the purchasing of carbon credits.'
  },
  {
    question: 'Wen mint?',
    answer:
      'Follow us on Twitter and join our Discord to stay up to date. More information still to come!',
  },
]

const Faq = () => {
  const [selected, setSelected] = useState(null)

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }
  return (
    <div className="faq">
      <div className="wrapper">
        <div className="faq__inner">
          <div className="faq__column">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq__column">
            <div className="acordion">
              {data.map((item, index) => (
                <div className="acordion__item" key={index}>
                  <div
                    className="acordion__title"
                    onClick={() => toggle(index)}
                  >
                    <h4>{item.question}</h4>
                    <img
                      src="./assets/arrow-down.svg"
                      alt="arrow"
                      className={selected === index ? 'arrow-active' : null}
                    />
                  </div>
                  <div
                    className={
                      selected === index
                        ? 'acordion__content active-acordion'
                        : 'acordion__content'
                    }
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
