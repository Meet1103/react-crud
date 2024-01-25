import React from "react";

// React Hook Form Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// React Icon Imports
import { IoClose } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";

// CSS Imports
import "./EditPersonInfoModal.css";

// Edit person info modal validation schema
const editPersonInfoModalSchema = yup
  .object({
    name: yup.string().required("Name is required field"),
    email: yup
      .string()
      .required("Email is required field")
      .email("Email must be a valid email"),
    phone: yup.string().required("Phone is required field"),
    website: yup.string().required("Website is required field"),
  })
  .required();

const EditPersonInfoModal = ({
  selectedPersonInfoData,
  editPersonInfo,
  closeEditModal,
}) => {
  // React Hook Form Functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedPersonInfoData?.name,
      email: selectedPersonInfoData?.email,
      phone: selectedPersonInfoData?.phone,
      website: selectedPersonInfoData?.website,
    },
    resolver: yupResolver(editPersonInfoModalSchema),
  });

  // onSubmit -> Function to invoke editPersonInfo function which is recieved as an argument.
  const onSubmit = (editFormData) => {
    editPersonInfo(editFormData);
  };

  return (
    <div
      onClick={(e) =>
        e.target.className === "modal-background" ? closeEditModal() : null
      }
      className="modal-background"
    >
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">Edit Person Info</div>
          <div onClick={closeEditModal} className="close-modal-icon">
            <IoClose />
          </div>
        </div>
        <div className="modal-body">
          <div className="input-field-group">
            <label htmlFor="name">Name</label>
            <input type="text" {...register("name")} />
            <span className="error-message">{errors?.name?.message}</span>
          </div>
          <div className="input-field-group">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} />
            <span className="error-message">{errors?.email?.message}</span>
          </div>
          <div className="input-field-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" {...register("phone")} />
            <span className="error-message">{errors?.phone?.message}</span>
          </div>
          <div className="input-field-group">
            <label htmlFor="website">Website</label>
            <input type="text" {...register("website")} />
            <span className="error-message">{errors?.website?.message}</span>
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-modal-button" onClick={closeEditModal}>
            Cancel
          </button>
          <button
            className="edit-modal-button"
            onClick={handleSubmit(onSubmit)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPersonInfoModal;
