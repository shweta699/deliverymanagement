const Issue = require('../models/Issue');
const Revenue = require('../models/Revenue');
const Component = require('../models/Component');

// Function to add test revenue data for testing purposes
const addTestRevenueData = async () => {
  try {
    const testData = [
      { amount: 1500, date: new Date('2024-11-01') },
      { amount: 2000, date: new Date('2024-11-01') },
      { amount: 5000, date: new Date('2024-11-15') },
      { amount: 3000, date: new Date('2024-11-15') },
      { amount: 8000, date: new Date('2024-11-20') },
      { amount: 7000, date: new Date('2024-11-20') },
      
    ];

    await Revenue.insertMany(testData);
    console.log('Test revenue data added successfully');
  } catch (err) {
    console.error('Error adding test revenue data:', err);
  }
};

// Call this function to add test data to the database if required
// addTestRevenueData();

exports.addIssue = async (req, res) => {
    try {
      console.log("Request body:", req.body); // Log request body
  
      const { componentId, repair, vehicleId, description } = req.body;
  
      if (!componentId || typeof repair === 'undefined' || !vehicleId || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const component = await Component.findById(componentId);
      if (!component) {
        return res.status(404).json({ error: 'Component not found' });
      }
  
      const cost = repair ? component.repairPrice : component.purchasePrice;
      const issue = new Issue({ componentId, vehicleId, description, repair, cost });
  
      await issue.save();
      await Revenue.create({ amount: cost, date: new Date() });
  
      res.status(201).json({ message: 'Issue added successfully', issue });
    } catch (err) {
      console.error('Error in addIssue:', err); // Log error
      res.status(500).json({ error: err.message });
    }
  };
  

  // Add revenue data
  exports.addRevenue = async (req, res) => {
    try {
      const { amount, date } = req.body;
  
      // Validate incoming data
      if (!amount || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Create new revenue entry
      const newRevenue = new Revenue({ amount, date });
  
      await newRevenue.save();
      
      res.status(201).json({ message: 'Revenue added successfully', newRevenue });
    } catch (err) {
      console.error('Error in addRevenue:', err);
      res.status(500).json({ error: err.message });
    }
  };
  
exports.getRevenue = async (req, res) => {
  try {
    // Fetch daily revenue
    const dailyRevenue = await Revenue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Fetch monthly revenue
    const monthlyRevenue = await Revenue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
    ]);

    // Fetch yearly revenue
    const yearlyRevenue = await Revenue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y', date: '$date' } },
          total: { $sum: '$amount' },
        },
      },
    ]);

    res.status(200).json({
      daily: dailyRevenue,
      monthly: monthlyRevenue,
      yearly: yearlyRevenue,
    });
  } catch (err) {
    console.error('Error in getRevenue:', err);
    res.status(500).json({ error: err.message });
  }
};
