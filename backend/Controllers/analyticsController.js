const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const getFinancialAnalytics = async (req, res) => {
  try {
    const { month, year, type } = req.query; // 'type' can be 'monthly' or 'yearly'

    let totalIncome = 0;
    let totalExpense = 0;

    if (type === "monthly" && month && year) {
      
      const students = await Student.find({ feesPaid: { $gt: 0 } });
      totalIncome = students.reduce(
        (sum, student) => sum + (student.feesPaid || 0),
        0
      );

      // Get total teacher salaries for the selected month
      const teachers = await Teacher.find();
      totalExpense = teachers.reduce(
        (sum, teacher) => sum + (teacher.salary || 0),
        0
      );
    } else if (type === "yearly" && year) {
      // Yearly: Fees are taken one-time from students
      const students = await Student.find({ feesPaid: { $gt: 0 } });
      totalIncome = students.reduce(
        (sum, student) => sum + (student.feesPaid * 12 || 0),
        0
      );

      // Yearly: Multiply monthly salaries of all teachers by 12
      const teachers = await Teacher.find();
      totalExpense = teachers.reduce(
        (sum, teacher) => sum + (teacher.salary * 12 || 0),
        0
      );
    }

    res.json({
      totalIncome,
      totalExpense,
      netProfit: totalIncome - totalExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};

module.exports = { getFinancialAnalytics };
