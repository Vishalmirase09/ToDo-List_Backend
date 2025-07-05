const express = require('express');
const { body } = require('express-validator');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const productValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Product name must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isIn(['electronics', 'clothing', 'books', 'home', 'sports', 'other']).withMessage('Please select a valid category')
];

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.use(protect);
router.get('/my/products', getMyProducts);
router.post('/', productValidation, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;