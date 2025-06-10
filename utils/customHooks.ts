import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "./firebase";
export const useHandleFileUpload = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture);
  const [updateImage, setUpdateImage] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFileUpload = async (
    asset: ImagePicker.ImagePickerAsset
  ): Promise<string | null> => {
    try {
      setUpdateImage(true);

      if (!asset.uri) return null;

      const response = await fetch(asset.uri);
      const blob = await response.blob();

      const storage = getStorage(app);
      const fileName = `${Date.now()}-${asset.fileName || "profile.jpg"}`;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const loading =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(loading));
            setUpdateImage(true);
            if (loading === 100) {
              setUpdateImage(false);
            }
          },
          (error) => {
            console.log("Upload error:", error);
            setImageError(true);
            setErrorMessage(error.message);
            reject(null);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              setImageUrl(url);
              resolve(url);
            } catch (err) {
              reject(null);
            }
          }
        );
      });
    } catch (error) {
      console.log("File upload error:", error);
      return null;
    } finally {
      setUpdateImage(false);
    }
  };

  //   useEffect(() => {
  //     handleFileUpload(asset);
  //   }, []);

  return {
    profilePicture,
    imageUrl,
    updateImage,
    setUpdateImage,
    setErrorMessage,
    setImageError,
    setImagePercent,
    errorMessage,
    imageError,
    imagePercent,
    setProfilePicture,
    handleFileUpload,
  };
};
