import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import React, { useState } from 'react'
import { useProductsStore } from '../store/product'

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const toast = useToast()
    const bg = useColorModeValue("white", "gray.800")
    const { deleteProduct,updateProduct } = useProductsStore()
    const [updatedProduct, setUpdatedProduct] = useState(product)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid)
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Product deleted', status: 'success', duration: 2000, isClosable: true
            })
        }
    }
    const handleUpdateProduct=async(pid,updatedProduct)=>{
        const {success,message}=await  updateProduct(pid,updatedProduct)
        onClose()
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        } else {
            toast({
                title: 'Product updated', status: 'success', duration: 2000, isClosable: true
            })
        }

    }


    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translate(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen}></IconButton>
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDeleteProduct(product._id)}></IconButton>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Product Name' name="name" value={updatedProduct.name} 
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input placeholder='Price' name="price" type='number' value={updatedProduct.price}
                            onChange={(e)=>setUpdatedProduct({...updatedProduct,price:e.target.value})}
                            />

                            <Input placeholder='Image URL' name="image" value={updatedProduct.image}
                            onChange={(e)=>setUpdatedProduct({...updateProduct,image:e.target.value})}
                            />

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
                        <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard