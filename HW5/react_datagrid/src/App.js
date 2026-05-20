import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function App() {
  const openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";
  
  // 狀態管理
  const [allData, setAllData] = useState([]);         // 原始資料
  const [searchKeyword, setSearchKeyword] = useState(""); // 搜尋關鍵字
  const [filteredData, setFilteredData] = useState([]);   // 過濾後的展示資料

  // 定義 DataGrid 欄位名稱與對應的資料 key 值
  const columns = [
    { field: 'title', headerName: '名稱', flex: 1, minWidth: 300 },
    { field: 'location', headerName: '地點', flex: 1, minWidth: 250 },
    { field: 'price', headerName: '票價', width: 150 }
  ];

  // Component Mount 時載入 API 資料
  useEffect(() => {
    fetch(openUrl)
      .then(res => res.json())
      .then(json => {
        // 將深層的 showInfo 展開，並幫每筆資料補上 DataGrid 嚴格要求的唯一 id
        const formattedData = json.map((item, index) => ({
          id: index, 
          title: item.title,
          location: item.showInfo?.[0]?.location || "暫無資訊",
          price: item.showInfo?.[0]?.price || "-"
        }));
        setAllData(formattedData);
        setFilteredData(formattedData);
      })
      .catch(err => console.error("API 載入失敗:", err));
  }, []);

  // 當搜尋關鍵字 (searchKeyword) 改變時，自動重新篩選資料
  useEffect(() => {
    const filtered = allData.filter(item => 
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchKeyword, allData]);

  return (
    <Box sx={{ p: 4, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#04AA6D', mb: 3 }}>
        景點觀光展覽資訊
      </Typography>

      {/* 搜尋輸入框 */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="名稱搜尋"
          variant="outlined"
          size="small"
          placeholder="輸入關鍵字自動過濾..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      {/* DataGrid 表格本體 */}
      <Box sx={{ height: 630, width: '100%', bgcolor: 'background.paper' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // 預設每頁顯示 10 筆資料
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}