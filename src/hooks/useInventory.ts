import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryItem } from "../types";

let MOCK_INVENTORY: InventoryItem[] = [
  { id: "1001", name: "Cyber Drive X2", sku: "CD-X2", category: "Hardware", quantity: 12, status: "CRITICAL", price: 450, image_url: "https://picsum.photos/seed/cdx2/100/100" },
  { id: "1002", name: "Neon Flux Coil", sku: "NF-C", category: "Components", quantity: 840, status: "OPTIMAL", price: 24, image_url: "https://picsum.photos/seed/nfc/100/100" },
  { id: "1003", name: "Quantum Processor", sku: "QP-9", category: "Hardware", quantity: 45, status: "STABLE", price: 1200, image_url: "https://picsum.photos/seed/qp9/100/100" },
  { id: "1004", name: "Plasma Emitter", sku: "PE-1", category: "Weaponry", quantity: 5, status: "CRITICAL", price: 890, image_url: "https://picsum.photos/seed/pe1/100/100" },
];

export function useInventory() {
  return useQuery<InventoryItem[]>({
    queryKey: ["inventory"],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return MOCK_INVENTORY;
    },
    staleTime: 5000,
  });
}

export function useUpdateQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, delta }: { id: string; delta: number }) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const item = MOCK_INVENTORY.find((i) => i.id === id);
      if (item) {
        item.quantity += delta;
      }
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}
