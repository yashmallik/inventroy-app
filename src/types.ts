export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  status: string;
  price: number;
  image_url: string;
}

export type TransitionType = "push" | "push_back" | "none";
