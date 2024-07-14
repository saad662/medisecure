import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MedicineCard from "../../../Common/MedicineCard";
import Web3 from "web3";
import MedisecureABI from "../../../MedisecureABI.json";
import Swal from "sweetalert2";

const ViewMedicines = ({ user, history }) => {
  const [medicines, setMedicines] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts);
          const web3 = new Web3(window.ethereum);
          const contractAddress = "0xb93746FfC6eb1D679365680E9f4C54f3394a53e5";
          console.log(web3.utils.toChecksumAddress(contractAddress));
          if (!web3.utils.isAddress(contractAddress)) {
            throw new Error(`Provided address ${contractAddress} is invalid.`);
          }

          const contractInstance = new web3.eth.Contract(
            MedisecureABI,
            contractAddress
          );
          setWeb3(web3);
          setContract(contractInstance);
          getMedicines(contractInstance);
        } catch (error) {
          console.error("Error requesting accounts: ", error);
          Swal.fire({
            title: "Error",
            text: `Failed to request accounts: ${error.message}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } else {
        throw new Error("No Ethereum provider found. Install MetaMask.");
      }
    } catch (error) {
      console.error("Error initializing Web3: ", error);
      Swal.fire({
        title: "Error",
        text: `Failed to initialize Web3: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const getMedicines = async (contractInstance, userName) => {
    console.log(user.name);
    try {
      const medicine = await contractInstance.methods
        .view_medicine_by_manufacturer(user.name)
        .call();
      console.log(medicine);
      setMedicines(medicine);
    } catch (error) {
      console.error("Error retrieving medicines: ", error);
      Swal.fire({
        title: "Error",
        text: `Failed to retrieve medicines: ${error.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    if (user && user.name && contract) {
      getMedicines(contract, user.name);
    }
  }, [user, contract]);

  return (
    <div className="d-flex flex-row flex-wrap">
      {medicines.length === 0 ? (
        <h3>No medicines found</h3>
      ) : (
        medicines.map((e) => {
          console.log(e);

          return (
            <div key={e.medicine_id} className="d-flex m-2">
              <MedicineCard
                medicineId={e.medicine_id}
                name={e.name}
                manufacturer={e.manufacturer}
                description={e.description}
                category={e.category}
                formula={e.formula}
                chemicals={e.chemicals}
                antibiotic={e.antibiotic}
                goToAddStocks={() => {
                  history.push("/stocks/add");
                }}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = ({ Register, Login }) => ({
  isLoading: Register.isLoading,
  error: Register.error,
  user: Login.user,
});

export default connect(mapStateToProps)(ViewMedicines);
