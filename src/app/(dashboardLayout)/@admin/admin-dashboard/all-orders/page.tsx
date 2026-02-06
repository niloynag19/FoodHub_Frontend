import { getAllOrdersAction } from "@/actions/order.actions";
import OrderStatusDropdown from "@/components/admin/OrderStatusDropdown";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
 // এটি পরে বানাচ্ছি

export const dynamic = "force-dynamic";

export default async function AllOrdersPage() {
  const result = await getAllOrdersAction();
  // Postman অনুযায়ী data.data তে লিস্ট আছে
  const orders = Array.isArray(result?.data?.data) ? result.data.data : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Total Orders: {orders.length}</h1>
        <p className="text-muted-foreground">Manage and monitor all customer activity.</p>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium uppercase">#{order.id.slice(-6)}</TableCell>
                <TableCell>
                  <div className="font-semibold">{order.customer?.name || "User"}</div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{order.deliveryAddress}</TableCell>
                <TableCell className="font-bold">{order.totalAmount} TK</TableCell>
                <TableCell>
                  <Badge className={order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-blue-500'}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}