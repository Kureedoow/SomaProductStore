import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../Products";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";


const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products:", products);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack gap={8}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
          mt={100}
        >
          Current Products 🚀
        </Text>

        {products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product}/>
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color="blue.700"
          >
            No products available right now!{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;