import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Failed to fetch categories',
      message: error.message,
    });
  }
});

// GET single category by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      error: 'Failed to fetch category',
      message: error.message,
    });
  }
});

// POST create new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Category name is required',
      });
    }

    const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);

    // Fetch the created category
    const [newCategory] = await pool.query('SELECT * FROM categories WHERE id = ?', [
      result.insertId,
    ]);

    res.status(201).json(newCategory[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      error: 'Failed to create category',
      message: error.message,
    });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const [existing] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category has products
    const [products] = await pool.query(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
      [id],
    );
    if (products[0].count > 0) {
      return res.status(400).json({
        error: 'Cannot delete category',
        message: `This category has ${products[0].count} product(s). Please reassign or delete them first.`,
      });
    }

    await pool.query('DELETE FROM categories WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Category deleted successfully',
      deletedCategory: existing[0],
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      error: 'Failed to delete category',
      message: error.message,
    });
  }
});

export default router;
