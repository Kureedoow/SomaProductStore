import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../Products";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    Name: "",
    Price: "",
    Image: "",
  });

  const cardBg = useColorModeValue("white", "gray.800");
 const toast =  useToast()
  //here is for creating product
  const {  createProduct} = useProductStore()
  const handleSubmit = async(e) => {
    e.preventDefault();
 const {success, message} = await createProduct(newProduct)
    // console.log('success',success);
    // console.log('message',message);
    if(!success){
      toast({
        title: 'Error',
          description: message,
          status: 'error',
          duration: 9000,
          isClosable: true,
      })
    }else{
      toast({
        title: 'success',
          description: message,
          status: 'success',
          duration: 9000,
          isClosable: true,
      })
    }
    setNewProduct({Name:"",Price:"",Image:""})
  };

  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8}>
        <Box textAlign="center">
          <Heading
            size="2xl"
            bgGradient="linear(to-r, blue.400, cyan.400)"
            bgClip="text"
            fontWeight="extrabold"
          >
            Add New Product
          </Heading>

          <Text mt={2} color="gray.500">
            Create and manage products for your store.
          </Text>
        </Box>

        <Box
          as="form"
          onSubmit={handleSubmit}
          w="full"
          bg={cardBg}
          p={8}
          rounded="2xl"
          shadow="xl"
          borderWidth="1px"
        >
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Enter product name"
                size="lg"
                value={newProduct.Name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Name: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input
                type="number"
                placeholder="Enter product price"
                size="lg"
                value={newProduct.Price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Price: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Product Image URL</FormLabel>
              <Input
                placeholder="https://example.com/image.jpg"
                size="lg"
                value={newProduct.Image}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    Image: e.target.value,
                  })
                }
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              mt={2}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;