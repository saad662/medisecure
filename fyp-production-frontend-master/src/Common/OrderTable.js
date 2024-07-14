import React from "react";
import Web3 from "web3";

const TableItem = ({ order, onClick, updatingOrderIds }) => {
  const { medicine_id, price, distributor, quantity, status } = order;

  const handleAccept = () => {
    onClick("accepted", order.order_id);
  };

  const handleReject = () => {
    onClick("rejected", order.order_id);
  };

  const convertWeiToBNB = (wei) => {
    return Web3.utils.fromWei(wei, "ether");
  };

  const isUpdating = updatingOrderIds[order.order_id];

  return (
    <tr>
      <td className="text-center text-muted">{medicine_id}</td>
      <td>
        <div className="widget-content-left flex2">
          <div className="widget-heading">{distributor}</div>
        </div>
      </td>
      <td className="text-center">{convertWeiToBNB(price)} BNB</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center">
        {status.toLowerCase() === "pending" && (
          <div className="badge badge-warning">{status}</div>
        )}
        {status.toLowerCase() === "accepted" && (
          <div className="badge badge-success">{status}</div>
        )}
        {status.toLowerCase() === "rejected" && (
          <div className="badge badge-danger">{status}</div>
        )}
      </td>
      <td className="text-center">
        {status.toLowerCase() === "pending" ? (
          isUpdating ? (
            "Loading..."
          ) : (
            <div>
              <button
                onClick={handleAccept}
                type="button"
                className="btn btn-primary btn-sm"
                aria-label="Accept Order"
                disabled={isUpdating}
              >
                Accept
              </button>
              &nbsp;
              <button
                onClick={handleReject}
                type="button"
                className="btn btn-danger btn-sm"
                aria-label="Reject Order"
                disabled={isUpdating}
              >
                Reject
              </button>
            </div>
          )
        ) : (
          // <div>
          //   <button
          //     onClick={handleAccept}
          //     type="button"
          //     className="btn btn-primary btn-sm"
          //     aria-label="Accept Order"
          //     disabled={isUpdating}
          //   >
          //     {isUpdating ? "Loading..." : "Accept"}
          //   </button>
          //   &nbsp;
          //   <button
          //     onClick={handleReject}
          //     type="button"
          //     className="btn btn-danger btn-sm"
          //     aria-label="Reject Order"
          //     disabled={isUpdating}
          //   >
          //     {isUpdating ? "Loading..." : "Reject"}
          //   </button>
          // </div>
          <i>No Action</i>
        )}
      </td>
    </tr>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th className="text-center">Medicine ID</th>
        <th>Distributor</th>
        <th className="text-center">Price Per Unit</th>
        <th className="text-center">Quantity</th>
        <th className="text-center">Status</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
  );
};

const OrderTable = ({ onClick = () => {}, orders, updatingOrderIds }) => {
  return (
    <div className="table-responsive">
      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
        <TableHead />
        <tbody>
          {orders.map((order, index) => (
            <TableItem
              key={index}
              order={order}
              onClick={onClick}
              updatingOrderIds={updatingOrderIds}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
