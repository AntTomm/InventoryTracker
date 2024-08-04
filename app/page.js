'use client'
import Image from 'next/image'
import { useState, useEffect} from 'react'
import { collection, deleteDoc, getDocs, query, setDoc, doc, getDoc, quantity } from 'firebase/firestore'
import { firestore } from './firebase.js'
import { Box, Modal, TextField, Typography, Stack, Button,  } from '@mui/material'
import { alignProperty } from '@mui/material/styles/cssUtils'


export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

const updateInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'))
  const docs = await getDocs(snapshot)
  const inventoryList = []
  docs.forEach((doc) => {
    inventoryList.push({
    name: doc.id,
    ...doc.data(),
  })
})
setInventory(inventoryList)
}

const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()){
    const {quantity} = docSnap.data()
    await setDoc(docRef, {quantity: quantity+1})
}
else{
  await setDoc(docRef, {quantity: 1})
}
await updateInventory()
}

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()){
    const {quantity} = docSnap.data()
    if (quantity === 1){
      await deleteDoc(docRef)
    }
    else{
      await setDoc(docRef, {quantity: quantity-1})
    }
  }
  await updateInventory()
}

useEffect(() => {
  updateInventory()
}, [])

const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

  return (
    <Box width = "100vw" 
    height = "100vh" 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    sx={{backgroundColor: '#FFFFFF'}}
    gap={2}
    >
      <Modal
        open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left = "50%"
            width = {400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Typography variant = "h6">Add Item</Typography>
            <Stack width ="100%" direction ="row" spacing={2}></Stack>
            <TextField
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e)=> {
              setItemName(e.target.value)
            }}
            />
            <Button
            variant="outlined" 
            onClick={()=> {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}
            >Add</Button>
          </Box>
      </Modal>
      <Button variant = "container" onClick={()=>{
        handleOpen()
      }}>
        Add New Item
      </Button>
      <Box border ='1px solid #333'>
        <Box
        width = "800px"
        height ="100px"
        bgcolor="#ADD8E6" alignItems="center" justifyContent="center" display="flex">
          <Typography variant = 'h2' color = '#333'>
            Inventory Items
          </Typography>
        </Box>
      <Stack width ="800px" height = "300px" spacing={2} overflow="auto">
        {
          inventory.map(({name, quantity})=> (
            <Box
            key={name}
            width="100%"
            minHeight="150px" 
            display="flex"
            alignItems="center" 
            justifyContent="space-between"
            bgColor="#f0f0f0"
            padding={5}
            >
              <Typography 
              variant = 'h3' 
              color = '#333' 
              textAlign="center"
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Stack direction = "row" spacing={2}>
              <Button variant = "contained" onClick={()=>{
                addItem(name)
              }}
              >
                Add
                </Button>
              <Typography
              variant = 'h3' 
              color = '#333' 
              textAlign="center">
              {quantity}
              </Typography>
              <Button variant = "contained" onClick={()=>{
                removeItem(name)
              }}
              >
                Remove
                </Button>
                </Stack>
            </Box>
          ))}
      </Stack>
      </Box>
    </Box>
  )
}
