import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const Cart = ({ cartItems, removeCartItem }) => {
  return (
    <Box p={3} boxShadow={2} borderRadius={8} bgcolor="#f8f8f8">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Your Order
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={item.data.title}
                secondary={
                  <>
                    <Typography variant="body1" color="textPrimary">
                      Rs.{item.data.basePrice}
                    </Typography>
                    {Object.keys(item.customizationOptions).map((optionId) => {
                      const option = item.data.customizationOptions.find(
                        (opt) => opt.id === parseInt(optionId)
                      );
                      return (
                        <Typography
                          key={optionId}
                          variant="body2"
                          color="textSecondary"
                        >
                          {option.name} + Rs.{" "}
                          {item.customizationOptions[optionId]}{" "}
                        </Typography>
                      );
                    })}
                  </>
                }
              />
              <IconButton
                edge="end"
                aria-label="remove"
                onClick={() => removeCartItem(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Typography variant="h6" fontWeight="bold" mt={2}>
        Total: Rs.{" "}
        {cartItems.reduce((total, item) => {
          const itemTotal =
            item.data.basePrice +
            Object.values(item.customizationOptions).reduce(
              (sum, optionPrice) => sum + optionPrice,
              0
            );
          return total + itemTotal;
        }, 0)}{" "}
      </Typography>
    </Box>
  );
};
