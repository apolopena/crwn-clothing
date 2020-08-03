import React from 'react';
import { withRouter } from 'react-router-dom';

import { 
  MenuItemContainer,
  ImageContainer,
  ContentContainer
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer 
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
    <ImageContainer 
      className='background-image'
      imageUrl={imageUrl} 
    />
    <ContentContainer className="content">
      <h1>{title.toUpperCase()}</h1>
      <span>SHOP NOW</span>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);