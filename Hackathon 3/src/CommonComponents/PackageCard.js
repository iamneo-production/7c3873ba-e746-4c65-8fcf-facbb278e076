import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FourGMobiledataIcon from "@mui/icons-material/FourGMobiledata";
import DialpadIcon from "@mui/icons-material/Dialpad";

const StyledTitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#094087",
  color: "white",
  padding: theme.spacing(1),
  borderRadius: "8px",
  marginBottom: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const PackageCard = ({ type, data, onAddToOrder }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (optionId, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionId]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOptions({});
  };

  const handleAddtoOrder = () => {
    const itemWithOptions = {
      data: {
        id: data.id,
        title: data.title,
        basePrice: data.basePrice,
        customizationOptions: data.customizationOptions,
      },
      type: type,
      customizationOptions: selectedOptions,
    };
    onAddToOrder(itemWithOptions);
    setModalOpen(false);
    setSelectedOptions({});
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const calculateTotalPrice = () => {
    let totalPrice = data.basePrice;
    for (const optionId in selectedOptions) {
      totalPrice += selectedOptions[optionId];
    }
    return totalPrice.toFixed(2);
  };

  return (
    <Box
      p={3}
      boxShadow={2}
      borderRadius={8}
      bgcolor="#f8f8f8"
      sx={{
        textAlign: "center",
        ":hover": {
          transform: "scale(1.04)",
          cursor: "pointer",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#e8e8e8"
        borderRadius={8}
        p={1}
      >
        <Box
          bgcolor="#094087"
          color="white"
          width="100%"
          textAlign="center"
          borderRadius={8}
          p={1}
        >
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            {type === "data" ? `${data?.title}` : data?.title}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={2}
          mb={2}
        >
          {type === "data" ? (
            <div>
              <FourGMobiledataIcon
                sx={{ width: 50, height: 50, color: "black" }}
              />
              <Typography
                variant="h4"
                style={{ marginTop: "8px", color: "black" }}
              >
                {data?.quota} GB
              </Typography>
            </div>
          ) : (
            <DialpadIcon sx={{ width: 50, height: 50, color: "black" }} />
          )}

          <Typography
            variant="h5"
            style={{ fontWeight: "bold", marginTop: "8px" }}
          >
            Rs. {data?.basePrice}
          </Typography>
          <hr
            style={{ width: "50%", marginTop: "16px", marginBottom: "16px" }}
          />
          <Typography variant="subtitle2">
            {data.additionalInfo &&
              data.additionalInfo.map((info, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="flex-start"
                  marginBottom="4px"
                >
                  <Box component="span" marginRight="8px" fontSize="14px">
                    &bull;
                  </Box>
                  <Typography variant="body2" style={{ textAlign: "left" }}>
                    {info}
                  </Typography>
                </Box>
              ))}
          </Typography>
          <Box marginTop="16px">
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#0C356A", color: "white" }}
              onClick={handleOpenModal}
            >
              Get Package
            </Button>
          </Box>
          <Typography variant="caption" color="textSecondary">
            Terms & Conditions apply
          </Typography>
        </Box>
      </Box>

      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
          <StyledTitleBox>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {data.title}
            </Typography>
          </StyledTitleBox>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box fontWeight="bold">Base Price:</Box> Rs. {data.basePrice}
          </DialogContentText>

          {data.customizationOptions && data.customizationOptions.length > 0 ? (
            <Box>
              <DialogContentText>
                <Box fontWeight="bold">Customization Options:</Box>
              </DialogContentText>
              {data.customizationOptions.map((option) => (
                <FormControl fullWidth key={option.id} margin="normal">
                  <InputLabel>{option.name}</InputLabel>
                  <Select
                    value={selectedOptions[option.id] || ""}
                    onChange={(e) =>
                      handleOptionChange(option.id, parseFloat(e.target.value))
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {option.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.price}>
                        {opt.label} (+Rs. {opt.price})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </Box>
          ) : (
            <DialogContentText>
              No customization options available.
            </DialogContentText>
          )}

          <DialogContentText>
            <Box fontWeight="bold" fontSize="20px">
              Total Price: Rs. {calculateTotalPrice()}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
          <Button
            onClick={handleAddtoOrder}
            style={{ backgroundColor: "#0C356A", color: "white" }}
            variant="contained"
            size="large"
          >
            Add to Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
