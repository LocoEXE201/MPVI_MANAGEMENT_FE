"use client";

import {
  CallApiPostToken,
  createNewSupplier,
  deleteSupplier,
  getSuppliersByCondition,
} from "@/api/services/service";
import { SupplierTable } from "@/components/layouts/table/SupplierTable";
import { useEffect, useState } from "react";
import { InputLabel } from "@mui/material";
import { CreateNewSupplier } from "@/api/services/api";
import { toast } from "react-toastify";
import { Button, Input, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

const SupplierComponent = () => {
  const [newSup, setNewSup]: any = useState({ supplerId: 1, supplierType: "Manufacturer" });
  const [suppliers, setSuppliers]: any = useState([]);
  const [searchName, setSearch] = useState("");
  const [selectSup, setSelectSup]: any = useState([]);

  const getSuppliers = async () => {
    getSuppliersByCondition(searchName).then((res) => {
      setSuppliers(res.result);
    });
  };

  useEffect(() => {
    getSuppliers();
  }, [searchName]);

  const cancelSupplier = async () => {
    selectSup.forEach((supId: any) => {
      deleteSupplier(supId);
    });
    getSuppliers();
    toast.success("Cancel successfull");
  };

  const createNSupplier = () => {
    if (!newSup?.supplierName||newSup?.supplierName?.length < 1) {
      toast.warning("Insert supplier name");
      return;
    }

    if (!newSup?.address||newSup?.address?.length < 1) {
      toast.warning("Insert supplier address");
      return;
    }

    if (!newSup?.phoneNumber||newSup?.phoneNumber?.length < 1) {
      toast.warning("Insert supplier phone number");
      return;
    }

    if (!newSup?.email||newSup?.email?.length < 1) {
      toast.warning("Insert supplier email");
      return;
    }

    if (!newSup?.contactPersonName||newSup?.contactPersonName?.length < 1) {
      toast.warning("Insert supplier contact person");
      return;
    }

    if (!newSup?.contractInformation||newSup?.contractInformation?.length < 1) {
      toast.warning("Insert supplier contact info");
      return;
    }

    console.log(JSON.stringify(newSup))
    createNewSupplier(newSup).then(() => {
      getSuppliers();
      setNewSup({ supplerId: 1, supplierType: "Manufacturer" })
      toast.success("Created successfull");
    });

    unhiddenNewContactdiv()
  };

  const unhiddenNewContactdiv = () => {
    const div = document.getElementById("newcontact");
    if (div?.classList.contains("hidden")) {
      div.classList.remove("hidden");
    } else {
      div?.classList.add("hidden");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1F5F9" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          paddingTop: "1rem",
        }}
      >
        <button
          onClick={unhiddenNewContactdiv}
          className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
        >
          New Contract
        </button>

        <button
          onClick={cancelSupplier}
          className="py-2 px-4 bg-transparent text-gray-700 font-semibold border border-gray-700 rounded hover:bg-gray-500 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
        >
          Cancel Contract
        </button>
      </div>
      <div style={{ paddingTop: "1rem", width: "95%", margin: "0 auto" }}>
        <SupplierTable
          suppliers={suppliers}
          selectedSUpState={[selectSup, setSelectSup]}
          searchState={[searchName, setSearch]}
        />
      </div>

      <div
        id="newcontact"
        className="text-black transition-all hidden absolute z-20 top-20 right-96 w-7/12 py-10 px-20 border rounded-md bg-white animate-appearance-in"
      >
        <InputLabel className="mb-2">Supllier Name</InputLabel>
        <input
          className="border mb-5 px-5 py-2 w-2/3"
          value={newSup?.supplierName}
          onChange={(event: any) =>
            setNewSup({ ...newSup, supplierName: event.target.value })
          }
        />
        <InputLabel className="mb-2">Address</InputLabel>
        <input
          value={newSup?.address}
          className="border mb-5 px-5 py-2 w-2/3"
          onChange={(event: any) =>
            setNewSup({ ...newSup, address: event.target.value })
          }
        />
        <InputLabel className="mb-2">Phone</InputLabel>
        <input
          className="border mb-5 px-5 py-2 w-2/3"
          value={newSup?.phoneNumber}
          onChange={(event: any) =>
            setNewSup({ ...newSup, phoneNumber: event.target.value })
          }
        />
        <InputLabel className="mb-2">Email</InputLabel>
        <input
          className="border mb-5 px-5 py-2 w-2/3"
          value={newSup?.email}
          onChange={(event: any) =>
            setNewSup({ ...newSup, email: event.target.value })
          }
        />
        <InputLabel className="mb-2">Contact Person</InputLabel>
        <input
          className="border mb-5 px-5 py-2 w-2/3"
          value={newSup?.contactPersonName}
          onChange={(event: any) =>
            setNewSup({ ...newSup, contactPersonName: event.target.value })
          }
        />
        <InputLabel className="mb-2"> Supllier Type</InputLabel>
        <select
          className="border mb-5 px-5 py-2"
          value={newSup?.supplierType}
          onChange={(event) =>
            setNewSup({ ...newSup, supplierType: event.target.value })
          }
        >
          <option>Manufacturer</option>
          <option>Distributor</option>
        </select>
        <InputLabel className="mb-2">Contact Info</InputLabel>
        <textarea
          className="border mb-5 px-5 py-2 w-full"
          value={newSup?.contractInformation}
          onChange={(event: any) =>
            setNewSup({ ...newSup, contractInformation: event.target.value })
          }
        />
        <div className="flex justify-between">
          <Button onPress={unhiddenNewContactdiv} className="border text-red-500">Close</Button>
          <Button onPress={createNSupplier} className="border text-blue-500">Create New</Button>
        </div>
      </div>

      {/* <ModalHeader className="flex flex-col gap-1">Create New Supllier</ModalHeader>
              <ModalBody>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={createNewSupplier}>
                  Post
                </Button>
              </ModalFooter> */}

      {/* )} */}
    </div>
  );
};

export default SupplierComponent;
