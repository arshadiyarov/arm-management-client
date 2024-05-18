import { ActionType } from "shared";

export const actionTypeToString = (actionType: ActionType) => {
  switch (actionType) {
    case "add":
      return "Adding a product";
    case "update":
      return "Updating a product";
    case "sale":
      return "Retail sale";
    case "opt":
      return "Wholesale";
  }
};
