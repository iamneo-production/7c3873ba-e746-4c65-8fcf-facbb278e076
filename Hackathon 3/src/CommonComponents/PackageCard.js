import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { ControlPointIcon } from "@mui/icons-material/ControlPoint";
import FourGMobiledataIcon from "@mui/icons-material/FourGMobiledata";
import DialpadIcon from "@mui/icons-material/Dialpad";
export const PackageCard = ({ type, data }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: 200,
    marginTop: 5,
    borderRadius: 0,
    color: theme.palette.text.secondary,
    ":hover": {
      transform: "scale(1.04)",
      cursor: "pointer",
    },
  }));
  return (
    <Item>
      <Box>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="body1"
            style={{ fontWeight: "bold", color: "teal" }}
          >
            {type == "data" ? (
              <>{data?.title}GB Package </>
            ) : (
              <>{data?.title} </>
            )}
          </Typography>
          {type == "data" ? (
            <Box>
              <FourGMobiledataIcon
                sx={{ width: 50, height: 50, color: "black" }}
              />
            </Box>
          ) : (
            <Box>
              <DialpadIcon sx={{ width: 50, height: 50, color: "black" }} />
            </Box>
          )}

          <Typography
            variant="h6"
            style={{ fontWeight: "bold", marginLeft: 8 }}
          >
            Rs. {data?.price}
          </Typography>
          <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
            {data.days} Days valid
          </Typography>
          <Button size="small" variant="contained" style={{ marginTop: 15 }}>
            Select
          </Button>
        </Box>
        {/* <IconButton
          style={{ width: 15 }}
          aria-label="delete"
          size="small"
          onClick={handleAddNewEvent}
        >
          <ControlPointIcon
            fontSize="inherit"
            style={{ color: "green", width: 20, height: 20 }}
          />
        </IconButton> */}
      </Box>

      <Box
        sx={{
          height: 100,
          overflow: "hidden",
          overflowY: "auto",
        }}
      ></Box>
    </Item>
  );
};
