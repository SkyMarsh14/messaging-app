import styled from "styled-components";
import { useRef, useEffect, useContext, useState } from "react";
import UserContext from "../helper/UserContext";
import ENDPOINTS from "../api/EndPoints";
import { useNavigate } from "react-router-dom";

const FlexWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
const DialogContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.secondaryBgColor};
  border-radius: 1.5em;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;
const DialogOption = styled.div`
  padding: 0.7em 0;
  font-size: 1em;
  cursor: pointer;
  border-top: ${({ theme }) => theme.modalSeparator};
  color: ${(props) => props.$color || "inherit"};
`;
const DialogTitle = styled.div`
  font-size: 1.2em;
  font-weight: 700;
  padding: 1.2em 0;
`;
const HiddenForm = styled.form``;
const FileInput = styled.input`
  visibility: hidden;
`;
const FullScreenModal = ({ setShowModal }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const uploadUrl = ENDPOINTS.profile();
  const bgRef = useRef(null);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  function hideModal() {
    setShowModal(false);
  }
  function handleClickOutside(e) {
    if (!dialogRef.current.contains(e.target)) {
      hideModal();
    }
  }
  function handleFileSelect(e) {
    e.preventDefault();
    inputRef.current.click(); // This will hide the modal.
    setShowModal(true);
  }
  async function handleFileChange(e) {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      console.log("Uploading file:", file?.name, file?.size, file?.type);
      for (const pair of formData.entries())
        console.log("formData entry:", pair[0], pair[1]);
      const response = await fetch(uploadUrl, {
        body: formData,
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (response.status === 401) {
        console.error("Invalid or expired authorization");
        localStorage.clear();
        return navigate("/login");
      }
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && hideModal();
    });
    return () => {
      document.removeEventListener("keydown", hideModal);
    };
  });

  return (
    <FlexWrapper ref={bgRef} onClick={handleClickOutside}>
      <DialogContainer ref={dialogRef} open={true}>
        <DialogTitle>Change Profile Photo</DialogTitle>
        <DialogOption $color="#485AEF" onClick={handleFileSelect}>
          Upload Photo
        </DialogOption>
        {user?.profileFileId && (
          <DialogOption $color="#ED4956">Remove Current Photo</DialogOption>
        )}
        <DialogOption onClick={hideModal}>Cancel</DialogOption>
      </DialogContainer>
      <HiddenForm
        ref={formRef}
        method="POST"
        action={uploadUrl}
        encType="multipart/form-data"
      >
        <FileInput
          ref={inputRef}
          type="file"
          name="profilePic"
          onChange={handleFileChange}
        />
      </HiddenForm>
    </FlexWrapper>
  );
};

export default FullScreenModal;
