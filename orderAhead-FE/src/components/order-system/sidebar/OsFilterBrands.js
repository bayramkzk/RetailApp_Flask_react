import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OsIconDown from '../icons/OsIconDown';
import OsIconRight from '../icons/OsIconRight';
import OsLoading from '../OsLoading';

const OsFilterBrands = () => {
  const [isCollapsed, setCollapsed] = useState(false)
  const handleClick = () => setCollapsed(!isCollapsed)
  const isLoading = useSelector(state=>state.isLoading)
  const brands = useSelector(state=>state.brands)

  return (
    <div className="os-sidebar-widget">
      <div className="os-sidebar-widget__header" onClick={handleClick}>
        <div className="os-sidebar-widget__heading">Brands</div>
        {isCollapsed && <OsIconRight />}
        {!isCollapsed && <OsIconDown />}
      </div>
      {!isCollapsed &&
      <div className="os-sidebar-widget__content">
        {isLoading && <OsLoading />}
        {!isLoading &&
        <ol className="os-sidebar-widget__list os-sidebar-list">
          {brands.map(brand => <li className="os-sidebar-list__item"><Link className="os-sidebar-list__link" to={brand.link}>{brand.name}</Link></li>)}
        </ol>}
      </div>}
    </div>
  );
};

export default OsFilterBrands;