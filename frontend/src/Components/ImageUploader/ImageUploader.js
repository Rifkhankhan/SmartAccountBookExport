import React, { useEffect, useRef, useState } from 'react'
import "./ImageUploader.css"

function ImageUploader(props) {

    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()

    const filePickerRef = useRef()

    useEffect(() => {
        if (!file) {
            return
        }


        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])
  const pickHandler = (e) => {
    let pickedFile 

    if (e.target.files && e.target.files.length === 1) {
        pickedFile = e.target.files[0]
        setFile(pickedFile)
  
    }

    props.onInput(pickedFile)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }
  return (
    <div className='form-control1'>
        <input type="file" name="" value="" style={{display:'none'}} accept='.jpg,.png,.jpeg' onChange={pickHandler} ref={filePickerRef} />

        <div className='image-upload'>
            <div className='image-upload__preview'>
            {previewUrl ? <><img src={previewUrl} alt='preview' /></> : <>{props.image && <img src={props.image} alt='preview' />}</> }
            </div>

            {!props.loading && <button type='button' onClick={pickImageHandler} >Pick Image</button>}
            {props.loading && <button type='button' style={{backgroundColor:'red'}} onClick={pickImageHandler} disabled={props.loading}>Pick Image</button>}
        </div>
    </div>


  )
}


export default ImageUploader

