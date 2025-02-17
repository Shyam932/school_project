const { validationResult } = require('express-validator');
const Class = require('../models/Class');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

// Get all classes with pagination
const getAllClasses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skipIndex = (page - 1) * limit;

  const { filterByName, sortBy } = req.query;
  const filter = filterByName ? { name: { $regex: filterByName, $options: 'i' } } : {};
  const sortOptions = sortBy ? { [sortBy]: 1 } : {};

  try {
    const classes = await Class.find(filter)
      .populate('teacher')
      .populate('students')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortOptions);

    const totalCount = await Class.countDocuments(filter);

    res.json({
      classes,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get class by ID
const getClassById = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id).populate('teacher').populate('students');
    if (!cls) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new class with form validation
const createClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const cls = new Class(req.body);
  try {
    const savedClass = await cls.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get details of a class including students and teacher
const getClassDetails = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Fetch teacher assigned to this class
    const teacher = await Teacher.findOne({ assignedClass: cls._id });

    // Fetch students enrolled in this class
    const students = await Student.find({ enrolledClass: cls._id });

    res.json({ 
      class: cls, 
      teacher: teacher || null, 
      students 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllClasses, getClassById, createClass, updateClass, deleteClass,  getClassDetails };