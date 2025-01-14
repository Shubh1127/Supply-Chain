import { useState } from "react";
import { motion } from 'framer-motion';
import { useFarmer } from '../../Context/FarmerContext';

const AddProduct = () => {
  const { addProduct } = useFarmer();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    productImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage') {
      setProduct({ ...product, productImage: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct(product);
    setProduct({
      name: '',
      description: '',
      quantity: '',
      price: '',
      productImage: null,
    });
  };

  return (
    <div style={styles.container}>
      <motion.form 
        onSubmit={handleSubmit} 
        style={styles.form}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          style={styles.inputGroup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label style={styles.label}>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            style={styles.input}
            required
          />
        </motion.div>
        <motion.div 
          style={styles.inputGroup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            style={styles.input}
          />
        </motion.div>
        <motion.div 
          style={styles.inputGroup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label style={styles.label}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            style={styles.input}
            required
          />
        </motion.div>
        <motion.div 
          style={styles.inputGroup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label style={styles.label}>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            style={styles.input}
            required
          />
        </motion.div>
        <motion.div 
          style={styles.inputGroup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <label style={styles.label}>Product Image</label>
          <input
            type="file"
            name="productImage"
            onChange={handleChange}
            accept="image/*"
            style={styles.input}
            required
          />
        </motion.div>
        <motion.button
          type="submit"
          style={styles.button}
        >
          Add Product
        </motion.button>
      </motion.form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '78vh',
    widthMax: '80vw',
    backgroundColor: '#F0F0F0',
  },
  form: {
    heightMax: '70vh',
    width: '90%',
    maxWidth: '600px',
    padding: '20px',
    margin:"20px",
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AddProduct;