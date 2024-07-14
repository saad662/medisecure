import React from "react";

const TableItem = ({ order, onClick }) => {
  const { productionStock, distributor, qty, status } = order;

  const handleAccept = () => {
    onClick("Accepted", order);
  };

  const handleReject = () => {
    onClick("Rejected", order);
  };

  return (
    <tr>
      <td className="text-center text-muted">
        {productionStock.medicine.name}
      </td>
      <td>
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left mr-3">
              <div className="widget-content-left">
                <img
                  style={{ objectFit: "contain" }}
                  width={40}
                  height={30}
                  className="rounded-circle"
                  src={require("../assets/images/logo.png")}
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="widget-content-left flex2">
              <div className="widget-heading">{distributor.name}</div>
              <div className="widget-subheading opacity-7">
                {distributor.email}
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="text-center">{productionStock.price * qty}</td>
      <td className="text-center">{qty}</td>
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
          <div>
            <button
              onClick={handleAccept}
              type="button"
              className="btn btn-primary btn-sm"
              aria-label="Accept Order"
            >
              Accept
            </button>
            &nbsp;
            <button
              onClick={handleReject}
              type="button"
              className="btn btn-danger btn-sm"
              aria-label="Reject Order"
            >
              Reject
            </button>
          </div>
        ) : (
          <i>No Action</i>
        )}
      </td>
    </tr>
  );
};

export default TableItem;
