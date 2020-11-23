import React, {useCallback , useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {FiUpload} from 'react-icons/fi';

import './styles.css';

interface Props {
  label: string;
  onFileUploaded: (file:File) => void;
}

const Dropzone:React.FC<Props> = ({label,onFileUploaded}) => {



  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone-block">
    <label htmlFor={label}>{label}</label>
    <div className="dropzone"{...getRootProps()}>

      <input {...getInputProps()} accept="image/*" />

      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point thumbnail"/>
          : (
            <p>
              <FiUpload/>
              Avatar
            </p>
          )
      }
    </div>
    </div>
  )
}

export default Dropzone;
