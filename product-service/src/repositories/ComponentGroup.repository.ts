import { logger } from "shared-constants";
import ComponentGroup from "../models/ComponentGroup";
import { IComponentGroup } from "../interfaces/Component.interface";

// Function to save a new component group
export const saveComponentGroup = async (componentName: string) => {
  try {
    const newComponentGroup = new ComponentGroup({ componentName });
    return await newComponentGroup.save();
  } catch (error) {
    logger.error(`Error while saving component groups => ${error}`);
    throw new Error("Error while saving component group details in DB");
  }
};

// Function to get all component groups
export const getComponentGroups = async () => {
  try {
    return await ComponentGroup.find({ isDeleted: 0 });
  } catch (error) {
    logger.error(`Error while fetching component groups => ${error}`);
    throw new Error("Error fetching component groups from DB");
  }
};

// Function to get a component group by ID
export const getComponentGroupId = async (id: string) => {
  try {
    return await ComponentGroup.findById({ _id: id, isDeleted: 0 });
  } catch (error) {
    logger.error(`Error while fetching component group by ID => ${error}`);
    throw new Error("Error fetching component group from DB");
  }
};

// Function to update a component group
export const updateComponentGroupID = async (
  id: string,
  updateData: Partial<IComponentGroup>
) => {
  try {
    return await ComponentGroup.findOneAndUpdate(
      { _id: id, isDeleted: 0 },
      updateData,
      { new: true }
    );
  } catch (error) {
    logger.error(`Error while updating component group by ID => ${error}`);
    throw new Error("Error updating component group in DB");
  }
};

// Function to delete a component group
export const deleteComponentGroups = async (ids: string[]) => {
  try {
    const result = await ComponentGroup.updateMany(
      { _id: { $in: ids }, isDeleted: { $ne: 1 } }, // Ensure that categories are not already deleted
      { $set: { isDeleted: 1 } }, // Set isDeleted to 1
      { new: true } // Returns the updated categories
    );
    return result;
  } catch (error) {
    logger.error(`Error while deleting component group by IDs => ${error}`);
    throw new Error("Error deleting component group from DB");
  }
};

// Function to search component groups by name
export const searchComponentGroup = async (componentName: string) => {
  try {
    if (!componentName || typeof componentName !== "string") {
      throw new Error("Invalid component name provided.");
    }
    return await ComponentGroup.find({
      componentName: { $regex: new RegExp(componentName, "i") },
      isDeleted: 0,
    });
  } catch (error) {
    logger.error(`Error while searching component group by name => ${error}`);
    throw new Error("Error searching component groups in DB");
  }
};
