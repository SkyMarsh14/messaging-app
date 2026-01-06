import styled from "styled-components";
import { useRef, useEffect, useContext } from "react";
import UserContext from "../helper/UserContext";
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
const FullScreenModal = ({ setShowModal }) => {
  const { user } = useContext(UserContext);
  const bgRef = useRef(null);
  const dialogRef = useRef(null);
  function hideModal() {
    setShowModal(false);
  }
  function handleClickOutside(e) {
    if (!dialogRef.current.contains(e.target)) {
      hideModal();
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
        <DialogOption $color="#485AEF">Upload Photo</DialogOption>
        {user?.profileFileId && (
          <DialogOption $color="#ED4956">Remove Current Photo</DialogOption>
        )}
        <DialogOption>Cancel</DialogOption>
      </DialogContainer>
    </FlexWrapper>
  );
};

export default FullScreenModal;
