import React from 'react'
import styles from './aside.module.css'
import Image from 'next/image'
import logo from './logo.png'

const Aside = () => {
  return (
    <aside className={styles.aside}>
        <Image src={logo} alt="Logo da Code Connect"
        />
    </aside>
  )
}

export default Aside