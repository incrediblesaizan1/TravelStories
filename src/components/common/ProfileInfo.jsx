import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import AddDb from "../../pages/Home/AddDb"
import Modal from "react-modal";
Modal.setAppElement("#root");

const ProfileInfo = ({ userInfo }) => {
  const navigate = useNavigate();
  const[openDpModal, setOpenDpModal] = useState({
    isShown: false,
    data: null,
  })

  return (
    <div className="flex items-center gap-3">
      <div
      onClick={()=>setOpenDpModal({isShown: true})}
      className="w-16 h-16 flex cursor-pointer items-center justify-center rounded-full text-3xl text-slate-950 font-normal bg-[rgb(53,53,53)] "
       >
        {userInfo ? (
          userInfo.dp ? (
            <img
              src={userInfo.dp}
              className=" overflow-hidden w-full h-full rounded-full object-cover"
              alt="Profile"
            />
          ) : (
            userInfo.fullname[0]
          )
        ) : (
          ""
        )}
      </div>
      <div>
        <p className="text-lg text-start text-zinc-400 relative top-1 font-medium">
          {userInfo.fullname.split(" ")[0].slice(0,13) || ""}
        </p>
        <button
          className="text-sm cursor-pointer hover:text-red-500 text-slate-300 underline"
          onClick={async () => {
            await axiosInstance.get("/logout");
            window.close();
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </div>


      <Modal
            isOpen={openDpModal.isShown}
            onRequestClose={() =>
              setOpenDpModal({ isShown: false, data: null })
            }
            style={{
              overlay: { backgroundColor: "rgba(0,0,0,0.6)", zIndex: 50 },
            }}
            className="modal-box custom-scrollbar2 bg-[rgb(37,37,37)] outline-none "
          >
            <AddDb
              onClose={() => {
                setOpenDpModal({
                  isShown: false,
                });
              }}
              userInfo={userInfo}
            />
          </Modal>


    </div>
  );
};

export default ProfileInfo;
