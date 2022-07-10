import axios from "axios";

/**
   * Function to upload a file to S3
   *
   * @param file { File } - simple file
   * @param name { string } - name for file (by default file.name)
   *
   * @return Promise<string> - S3 url
   */
const transferFile = (file: File, name?: string) => new Promise<string>((resolve, reject) => {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("name", name || file.name);
    formData.append("type", file.type);
    axios.post<{ url: string }>(
      "/api/s3/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then(result => resolve(result.data.url))
    .catch(err => reject(err));
});

export default transferFile;
