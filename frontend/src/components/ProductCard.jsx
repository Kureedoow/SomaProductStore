import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Input,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useProductStore } from "../Products";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState({
    Name: product.Name,
    Price: product.Price,
    Image: product.Image,
  });

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });

    if (success) {
      onClose();
    }
  };

  return (
    <>
      <Box
        bg="white"
        rounded="2xl"
        overflow="hidden"
        shadow="md"
        borderWidth="1px"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-8px)",
          shadow: "2xl",
        }}
      >
        <Image
          src={product.Image}
          alt={product.Name}
          w="full"
          h={56}
          objectFit="cover"
        />

        <Box p={5}>
          <Heading
            as="h2"
            size="md"
            mb={2}
            noOfLines={1}
            color="blue.500"
          >
            {product.Name}
          </Heading>

          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="blue.500"
          >
            ${product.Price}
          </Text>
        </Box>

        <HStack px={5} pb={5} justify="flex-end" spacing={3}>
          <Button
            size="md"
            colorScheme="blue"
            variant="outline"
            borderRadius="lg"
            onClick={onOpen}
          >
            <RiEdit2Fill size={18} />
          </Button>

          <Button
            size="md"
            colorScheme="red"
            variant="outline"
            borderRadius="lg"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDeleteSweep size={20} />
          </Button>
        </HStack>
      </Box>
          {/* here is for the modal to update the product */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {/* product name */}
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.Name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    Name: e.target.value,
                  })
                }
              />
              {/* product price */}
              <Input
                placeholder="Price"
                value={updatedProduct.Price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    Price: e.target.value,
                  })
                }
              />
            {/* product updating image */}
              <Input
                placeholder="Image URL"
                value={updatedProduct.Image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    Image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>

            <Button
              colorScheme="blue"
              onClick={handleUpdateProduct}
            >
              Update Product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;