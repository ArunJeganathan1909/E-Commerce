import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!files.length) {
        setImageUploadError("Please select at least one image");
        return;
      }

      const storage = getStorage(app);

      const uploadTasks = files.map((file) => {
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        return uploadBytesResumable(storageRef, file);
      });

      Promise.all(
        uploadTasks.map((uploadTask, index) => {
          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageUploadProgress((prevProgress) => {
                  const newProgress = [...prevProgress];
                  newProgress[index] = progress.toFixed(0);
                  return newProgress;
                });
              },
              (error) => {
                setImageUploadError("Image upload failed");
                setImageUploadProgress([]);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );
                  setImageUploadProgress([]);
                  setImageUploadError(null);
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    images: [...(prevFormData.images || []), downloadURL],
                  }));
                  resolve();
                } catch (error) {
                  setImageUploadError("Image upload failed");
                  setImageUploadProgress([]);
                  reject(error);
                }
              }
            );
          });
        })
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress([]);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/server/product/createProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/product/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Add New Product
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="home-Applicans">Home Applicans</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="travel">Travel</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-2">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            multiple
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress.length > 0}
          >
            {imageUploadProgress.length > 0 ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={Math.min(...imageUploadProgress)}
                  text={`${Math.min(...imageUploadProgress)}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <div className="flex flex-wrap gap-4">
          {formData.images &&
            formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Add description...."
          className="h-72 mb-12"
          required
          onChange={(value) => setFormData({ ...formData, description: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AddNewProduct;
