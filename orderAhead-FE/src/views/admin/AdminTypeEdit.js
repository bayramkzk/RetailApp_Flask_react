import React, { useEffect, useState } from 'react';
import OsLoading from '../../components/order-system/OsLoading';
import { osServices } from '../../controllers/_services/ordersystem.service';
import {Table, TableBody, TableHead, TableRow, TableCell, Button, TextField } from '@mui/material'
import { useLocation } from 'react-router-dom';
import QueryString from 'query-string'

const AdminTypeEdit = () => {
  const [type, setType] = useState(false)
  const {search} = useLocation()
  const params = QueryString.parse(search)
  const [isLoading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(false)
  const [selectedFile, setSelectedFile] = useState(false)
  const [priceFrom, setPriceFrom] = useState(0)
  const [priceTo, setPriceTo] = useState(0)
  const [saveText, setSaveText] = useState('Save')

  useEffect(() => {
    setLoading(true)
    osServices.osLoadType(params).then(response => {
      setType(response.data)
      setSelectedImage(response.data.thumbnail)
      setPriceFrom(response.data.price_range.from)
      setPriceTo(response.data.price_range.to)
      setLoading(false)
    })
  }, [])



  const handleSaveClicked = () => {
    const formData = new FormData()
    formData.append('typeName', type.name)
    if (selectedFile) {
      formData.append('typeThumbnail', selectedFile, selectedFile.name)
    }
    formData.append('price_from', priceFrom)
    formData.append('price_to', priceTo)

    setSaveText('Updating...')
    osServices.osUpdateType(formData).then(response => setSaveText('Save'))
  }

  const onImageChanged = (e) => {
    console.log(e.target.files)
    let file = e.target.files[0]
    setSelectedImage(URL.createObjectURL(file))
    setSelectedFile(file)

  }

  const handlePriceForm = (e) => {
    setPriceFrom(e.target.value)
  }

  const handlePriceTo = (e) => {
    setPriceTo(e.target.value)
  }


  return (
    <div>
      <h1>Product Type Edit <strong>{type.name}</strong></h1>
      <Table>
        <TableBody>
          {isLoading && <OsLoading />}
          {!isLoading && type && <>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell><img src={selectedImage} width="200" /></TableCell>
              <TableCell>
                <input type="file" onChange={onImageChanged} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price From</TableCell>
              <TableCell colSpan="2"><TextField variant="outlined" onChange={handlePriceForm} value={priceFrom}></TextField></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price To</TableCell>
              <TableCell colSpan="2"><TextField variant="outlined" onChange={handlePriceTo} value={priceTo}></TextField></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell colSpan="2"><Button onClick={handleSaveClicked} variant="contained">{saveText}</Button></TableCell>
            </TableRow>
          </>}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTypeEdit;