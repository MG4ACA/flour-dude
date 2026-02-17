import express from 'express'
import pool from '../config/db.js'

const router = express.Router()

// GET all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message
    })
  }
})

// GET single product by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    res.json(rows[0])
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error.message
    })
  }
})

// POST create new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category_id, image_url } = req.body
    
    // Validation
    if (!name || !description || !price || !category_id || !image_url) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'All fields are required: name, description, price, category_id, image_url'
      })
    }
    
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category_id, image_url]
    )
    
    // Fetch the created product
    const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId])
    
    res.status(201).json(newProduct[0])
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ 
      error: 'Failed to create product',
      message: error.message
    })
  }
})

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, category_id, image_url } = req.body
    const { id } = req.params
    
    // Check if product exists
    const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    // Validation
    if (!name || !description || !price || !category_id || !image_url) {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'All fields are required: name, description, price, category_id, image_url'
      })
    }
    
    await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ? WHERE id = ?',
      [name, description, price, category_id, image_url, id]
    )
    
    // Fetch the updated product
    const [updatedProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    
    res.json(updatedProduct[0])
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ 
      error: 'Failed to update product',
      message: error.message
    })
  }
})

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    // Check if product exists
    const [existing] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    await pool.query('DELETE FROM products WHERE id = ?', [id])
    
    res.json({ 
      success: true,
      message: 'Product deleted successfully',
      deletedProduct: existing[0]
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: error.message
    })
  }
})

export default router
