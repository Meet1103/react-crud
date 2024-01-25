import React, { useState } from "react";

// React Toastify Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component Imports
import PersonInfoCard from "./components/person-info-card/PersonInfoCard";
import EditPersonInfoModal from "./components/edit-person-info-modal/EditPersonInfoModal";

// Mock Data Imports
import { personInfoData } from "./utils/personInfoData";

// CSS Imports
import "./App.css";

const App = () => {
  // personInfoList -> We are using personInfoList state to store person contact info
  const [personInfoList, setPersonInfoList] = useState(personInfoData);

  // showEditModal -> We are using showEditModal state to open/close the modal for editing persons info
  const [showEditModal, setShowEditModal] = useState(false);

  // editPersonInfoId -> We are using editPersonInfoId state to store ID of the person info card which user wants to edit
  const [editPersonInfoId, setEditPersonInfoId] = useState(null);

  // changingPersonInfoFavouriteStatus -> Function to change the status of the "favourite". It takes the ID of card which user wants to mark/unmark as favourite
  const changingPersonInfoFavouriteStatus = (id) => {
    // newPersonInfoList -> We are using map method on personInfoList array to change the favourite status of person info card
    const newPersonInfoList = personInfoList?.map((personInfo, index) =>
      id === personInfo?.id
        ? { ...personInfo, favourite: !personInfo?.favourite }
        : personInfo
    );

    // State Updates
    setPersonInfoList(newPersonInfoList);

    // Success Toast Message
    toast.success(
      "Selected card favourite status has been changed successfully",
      {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  };

  // closeEditModal -> Function to close edit person info modal.
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditPersonInfoId(null);
  };

  // selectedPersonInfoId -> Function to assign ID of card which user wants to edit to editPersonInfoId state and open edit modal.
  const selectedPersonInfoId = (id) => {
    setEditPersonInfoId(id);
    setShowEditModal(true);
  };

  // selectedPersonInfoData -> We are using find method on personInfoData to assign data of card which user wants to edit.
  const selectedPersonInfoData = editPersonInfoId
    ? personInfoList?.find(
        (personInfo, index) => personInfo.id === editPersonInfoId
      )
    : null;

  // editPersonInfo -> Function to edit person contact info card. It takes the data of the card which user wants to edit as an argument.
  const editPersonInfo = (editFormData) => {
    // editedPersonInfoList -> We are using map method on personInfoList array to edit the card which user want to edit based on id.
    const editedPersonInfoList = personInfoList?.map((personInfo, index) =>
      editPersonInfoId === personInfo?.id
        ? {
            ...personInfo,
            name: editFormData?.name,
            email: editFormData?.email,
            phone: editFormData?.phone,
            website: editFormData?.website,
          }
        : personInfo
    );

    // State Updates
    setPersonInfoList(editedPersonInfoList);
    setEditPersonInfoId(null);
    setShowEditModal(false);

    // Success Toast Message
    toast.success("Person info card has been edited successfully", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  // deletePersonInfo -> Function to delete person contact info card. It takes the ID of card which user wants to delete as an argument.
  const deletePersonInfo = (id) => {
    // filteredPersonInfoList -> We are using filter method on personInfoList array to remove the card which user want to delete based on id.
    const filteredPersonInfoList = personInfoList?.filter(
      (personInfo, index) => id !== personInfo?.id
    );

    // State Updates
    setPersonInfoList(filteredPersonInfoList);

    // Success Toast Message
    toast.success("Person info card has been deleted successfully", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className="app-container">
      <div className="card-list">
        {personInfoList?.map((personInfo, index) => (
          <div key={personInfo?.id}>
            <PersonInfoCard
              personInfo={personInfo}
              changingPersonInfoFavouriteStatus={
                changingPersonInfoFavouriteStatus
              }
              selectedPersonInfoId={selectedPersonInfoId}
              deletePersonInfo={deletePersonInfo}
            />
          </div>
        ))}
      </div>
      {showEditModal && (
        <EditPersonInfoModal
          selectedPersonInfoData={selectedPersonInfoData}
          editPersonInfo={editPersonInfo}
          closeEditModal={closeEditModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
