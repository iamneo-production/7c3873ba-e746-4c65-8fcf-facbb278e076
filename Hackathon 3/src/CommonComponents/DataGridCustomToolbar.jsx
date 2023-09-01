import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React from "react";

const DataGridCustomToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{ pl: 2, pr: 2, borderBottom: 1, borderColor: "#A3A3A3" }}
    >
      <Box width="100%" sx={{ mb: 0.5 }}>
        <Box>
          <GridToolbarColumnsButton
            sx={{
              mr: "16px",
              color: "#525252",
            }}
          />
          <GridToolbarFilterButton
            sx={{
              mr: "16px",
              color: "#525252",
            }}
          />
          <GridToolbarDensitySelector
            sx={{
              mr: "16px",
              color: "#525252",
            }}
          />
          <GridToolbarExport
            sx={{
              mr: "16px",
              color: "#525252",
            }}
          />
        </Box>
      </Box>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
