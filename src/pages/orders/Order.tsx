import { LoadingData } from "@/components/loading";
import { Section } from "@/components/section";
import OrdersTable from "@/components/table/OrdersTable";
import { TableTitle } from "@/components/title";
import { usegetOrders } from "@/hooks/order/get-all-orders";
import { OrderDataFull } from "@/types";
import { useState } from "react";

const Order = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: ordersData = [], isLoading, error } = usegetOrders();
  
  return (
    <Section>
      <div className="flex justify-between items-center mb-4">
        <TableTitle>Orders Table</TableTitle>
      </div>
      {isLoading ? (
        <LoadingData className="w-full flex justify-center mt-2" />
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="h-[calc(100vh-290px)] overflow-y-auto scrollbar-hide border rounded-md">
          {ordersData?.length > 0 ? (
            <OrdersTable
              ordersData={ordersData as OrderDataFull[]}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No orders found </p>
            </div>
          )}
        </div>
      )}
    </Section>
  );
};

export default Order