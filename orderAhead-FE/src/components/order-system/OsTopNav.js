import React, { useState } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import OsIconDrop from './icons/OsIconDrop'

const OsTopNav = () => {
  const {url} = useRouteMatch()

  const OsItem = (props) => (<div className="os-header__item">{props.children}</div>)
  const OsLink = (props) => (<Link className="os-header__link" to={props.to}>{props.children}</Link>)
  const OsItemLink = (props) => (<OsItem><OsLink to={props.to}>{props.children}</OsLink></OsItem>)
  const OsItemDropdown = (props) => {
    const [isPopup, showPopup] = useState(false)
    const handlePopup = () => {
      showPopup(!isPopup)
    }
    return (
      <div className="os-header__item os-header-dropdown">
        <a className="os-header__link os-header-dropdown__link" href="javascript:void(0)" onClick={handlePopup}>
          {props.title} <OsIconDrop />
        </a>
        {isPopup && <div className="os-header-dropdown__content">
          {props.children}
        </div>}
      </div>
    )
  }

  return (
    <>
      <div className="os-header">
        <div className="os-container">
          <nav className="os-header__nav">
            <OsItemLink to={`${url}/home`}>Home</OsItemLink>
            <OsItemDropdown title="Categories">
              <OsItemLink to={`${url}/products`}>Category1</OsItemLink>
              <OsItemLink to={`${url}/products`}>Category2</OsItemLink>
            </OsItemDropdown>
            <OsItemLink to={`${url}/brands`}>Brand</OsItemLink>
          </nav>
        </div>
      </div>
    </>
  )
}

export default OsTopNav