import React from 'react'
import ItemFeed from '../../components/item-feed/item-feed'
import styles from './page-item-feed.module.css'
const PageItemFeed = () => {
  return (
    <div className={styles.wrap_page}>
      <ItemFeed />
    </div>
  )
}

export default PageItemFeed
