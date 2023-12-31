import React from 'react'
import Styles from './Features_footer.module.css';

const Features_footer = () => {
  return (
    <div className={Styles.featureFooter} >
        <button className={Styles.featureBtn} >Announcements</button>
        <button className={Styles.featureBtn} >something XYZ </button>
        <button className={Styles.featureBtn} >Talk to us </button>
        <button className={Styles.featureBtn} >Lodge an FIR </button>
        <button className={Styles.featureBtn} >Mint an NFT </button>
        <button className={Styles.featureBtn} >Give a tip </button>
    </div>
  )
}

export default Features_footer