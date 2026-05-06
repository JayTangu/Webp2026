import React from 'react';
import IconButton from '@mui/material/IconButton'; // 注意路徑改為 @mui
import DeleteIcon from '@mui/icons-material/Delete'; // 圖示路徑改為 @mui/icons-material
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MultiButton = (num) => {
  var output = [];
  
  // 1. 購物車圖示按鈕
  output.push(
    <IconButton key="cart" color="primary" aria-label="add to shopping cart">
      <AddShoppingCartIcon />
    </IconButton>
  );

  // 2. 刪除圖示按鈕
  output.push(
    <IconButton key="delete" color="primary" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );

  // 3. 鬧鐘圖示按鈕
  output.push(
    <IconButton key="alarm" color="primary" aria-label="add an alarm">
      <AlarmIcon />
    </IconButton>
  );

  return output;
};

export default MultiButton;