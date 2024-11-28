const Component = require('../models/Component');

exports.addComponent = async (req, res) => {
  try {
    const component = new Component(req.body);
    await component.save();
    res.status(201).json(component);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComponents = async (req, res) => {
  try {
    const components = await Component.find();
    res.status(200).json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
