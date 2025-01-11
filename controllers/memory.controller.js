import Memory from "../models/memory.model.js";

export const getAllUserMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.params.id });

    if (!memories) {
      return res.status(404).json({ message: "User has no memories" });
    }
    res.status(200).json(memories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserMemoryById = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    res.status(200).json(memory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUserMemory = async (req, res) => {
  const memory = req.body;
  try {
    const newMemory = new Memory(memory);
    await newMemory.save();
    res.status(201).json({ message: "A memory was created", newMemory });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUserMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    res.status(200).json({
      message: "Memory updated successfully",
      memory: memory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserMemory = async (req, res) => {
  try {
    const memory = await Memory.findByIdAndDelete(req.params.id);
    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }
    res.status(200).json({ message: "Memory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
