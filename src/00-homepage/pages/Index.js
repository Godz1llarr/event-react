import React from 'react'
import './../styles/Index.scss'
import Menu from '../../components/Menu'
import YellowWave from '../components/YellowWave'

function Index() {
  return (
    <>
      <div className="y-index-container">
        <section className="y-section y-section-nav">
          <div className="y-logo-wrap">SEIZEE</div>
          <div className="y-nav-right">
            <div className="y-icon-round y-cart-icon"></div>
            <div className="y-icon-round y-member-icon"></div>
            <div className="y-menu">MENU</div>
          </div>
        </section>
        <section className="y-section y-section-carousel">
          carousel
          <YellowWave />
        </section>
        <section className="y-section y-section-search">search</section>
        <section className="y-section y-section-merch">merch</section>
        <section className="y-section y-section-about">about</section>
        <section className="y-section y-section-event">event</section>
        <section className="y-section y-section-forum">forum</section>
        <section className="y-section y-section-dotown">dotown</section>
        <section className="y-section y-section-footer">footer</section>
      </div>
    </>
  )
}

export default Index
