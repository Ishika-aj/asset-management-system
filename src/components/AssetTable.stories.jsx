import AssetTable from "./AssetTable";

export default {
  title: "Components/AssetTable",
  component: AssetTable,
};

export const Empty = {
  args: { assets: [] },
};

export const WithData = {
  args: {
    assets: [
      {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        status: "assigned",
        assigned: true,
        assignedTo: "alice@example.com",
        assignedDate: "2025-11-10T10:00:00",
        returnDate: "2025-12-10T10:00:00",
      },
    ],
  },
};
