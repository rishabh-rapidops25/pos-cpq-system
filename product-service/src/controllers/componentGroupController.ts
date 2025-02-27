import { Request, Response } from "express";
import {
  saveComponentGroup,
  getComponentGroupId,
  getComponentGroups,
  updateComponentGroupID,
  deleteComponentGroups,
  searchComponentGroup,
} from "../repositories/ComponentGroup.repository";
import {
  ErrorMessageCodes,
  HttpResponseMessages,
  HttpStatusCodes,
  logger,
  sendResponse,
} from "shared-constants";

export const createComponentGroup = async (req: Request, res: Response) => {
  try {
    const { componentName } = req.body;
    const newComponentGroup = await saveComponentGroup(componentName);
    logger.info("New Component Group Created");
    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: newComponentGroup,
    });
  } catch (error) {
    logger.error("Error creating component group,", error);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

export const getAllComponentGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await getComponentGroups();
    logger.info("Component Groups Fetched Successfully");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: groups,
    });
    res.status(200).json(groups);
  } catch (error) {
    logger.error("Error fetching component groups");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

export const getComponentGroupById = async (req: Request, res: Response) => {
  try {
    console.log(req.params, ">>>>>>>>>>>>");
    logger.info(`Fetching component group with ID: ${req.params.id}`);
    const { id } = req.params;
    const group = await getComponentGroupId(id);
    if (!group) {
      logger.info("Component group not found");
      return sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: "Component Group not found with ID",
      });
    }
    logger.info("Component group found with ID");
    return sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: group,
    });
  } catch (error) {
    logger.error("Error fetching component group with ID", error);
    return sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error,
    });
  }
};

export const updateComponentGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { componentName } = req.body;
    const updatedGroup = await updateComponentGroupID(id, componentName);
    if (!updatedGroup) {
      logger.info("Component group not found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: "Component Group not found with ID",
      });
      return;
    }
    logger.info("Component group updated with ID");
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: updatedGroup,
    });
    return;
  } catch (error) {
    logger.error("Error updating component group");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

export const deleteComponentGroup = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    if (!ids || ids.length === 0) {
      logger.error("No IDs provided");
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: HttpResponseMessages.BAD_REQUEST,
        data: "Please provide at least one ID to delete",
      });
      return;
    }
    const deletedGroup = await deleteComponentGroups(ids);
    if (deletedGroup.modifiedCount === 0) {
      logger.error("Categories not found or already deleted");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
        data: "Categories not found or already deleted with the provided IDs",
      });
      return;
    }
    if (!deletedGroup) {
      logger.info("Component group not found");
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: "Component Group not found with ID",
      });
      return;
    }
    logger.info(
      `${deletedGroup.modifiedCount} Components deleted successfully`
    );
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: `${deletedGroup.modifiedCount} Component group Deleted Successfully`,
    });
    return;
  } catch (error) {
    logger.error("Error deleting component group");
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};

export const searchComponentGroups = async (req: Request, res: Response) => {
  try {
    const { componentName } = req.body;
    const groups = await searchComponentGroup(componentName);
    res.status(200).json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching component groups", error });
  }
};
