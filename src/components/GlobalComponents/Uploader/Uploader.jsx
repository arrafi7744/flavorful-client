import { useState } from "react";
import useRequest from "../../../APIServices/useRequest";

const Uploader = (props) => {
  const [multipleFiles, setMultipleFiles] = useState("");
//   const [title, setTitle] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [postRequest, getRequest] = useRequest();

  const multipleFilesUpload = async(data, options)=> {
    try{
      await postRequest('/multipleFiles', data, options);
    }catch(error){
      throw error;
    }
  }

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    // formData.append("title", title);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
    // props.getMultiple();
  };
  return (
    <div className="row mt-3">
      <div className="col-6">
        <div className="row"></div>
      </div>
      <div className="col-6">
        <div className="row">
          {/* <div className="col-6">
            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="enter title for your gallery"
              className="form-control"
            />
          </div> */}
          <div className="col-6">
          <label>Select Multiple Files</label>
            <div className="form-group mt-2">
              <input
                type="file"
                onChange={(e) => MultipleFileChange(e)}
                className="form-control"
                multiple
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <button
              type="button"
              onClick={() => UploadMultipleFiles()}
              className="btn btn-danger"
            >
              Upload
            </button>
          </div>
          {/* <div className="col-2">
            <CircularProgressbar
              value={multipleProgress}
              text={`${multipleProgress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                textColor: "#f88",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Uploader;
