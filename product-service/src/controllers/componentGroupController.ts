import { Request, Response } from 'express';
import {
  saveComponentGroup,
  getComponentGroupId,
  getComponentGroups,
  updateComponentGroupID,
  deleteComponentGroups,
  searchComponentGroup,
} from '../repositories/ComponentGroup.repository';
import {
  ErrorMessageCodes,
  HttpResponseMessages,
  HttpStatusCodes,
  logger,
  sendResponse,
} from 'shared-constants';
import { IComponentGroup } from '../interfaces/Component.interface';

/**
 * @desc Create Component Group
 * @route POST /api/component/create-component
 */
export const createComponentGroup = async (req: Request, res: Response) => {
  try {
    const { componentName } = req.body;
    const newComponentGroup = await saveComponentGroup(componentName);
    logger.info('New Component Group Created');
    sendResponse({
      statusCode: HttpStatusCodes.CREATED,
      res,
      message: HttpResponseMessages.CREATED,
      data: newComponentGroup,
    });
  } catch (error) {
    logger.error('Error creating component group,', error);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
/**
 * @desc Fetch all Component Group
 * @route GET /api/component/
 */
export const getAllComponentGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await getComponentGroups();
    logger.info('Component Groups Fetched Successfully');
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: groups,
    });
  } catch (error) {
    logger.error('Error fetching component groups');
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
/**
 * @desc Fetch Component Group by ID
 * @route GET /api/component/:id
 */
export const getComponentGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const group = await getComponentGroupId(id);
    if (!group) {
      logger.info('Component group not found');
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: 'Component Group not found with ID',
      });
      return;
    }
    logger.info('Component group found with ID');
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: group,
    });
  } catch (error) {
    logger.error('Error fetching component group with ID', error);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
/**
 * @desc Update Component Group by ID
 * @route PUT /api/component/update-component/:id
 */
export const updateComponentGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<IComponentGroup> = req.body;

    const updatedGroup = await updateComponentGroupID(id, updateData);

    if (!updatedGroup) {
      logger.info('Component group not found');
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NO_CONTENT,
        data: 'Component Group not found with ID',
      });
      return;
    }

    logger.info('Component group updated successfully');
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: updatedGroup,
    });
  } catch (error) {
    logger.error('Error updating component group');
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
/**
 * @desc Delete Component Group by ID
 * @route POST /api/component/delete-component/:id
 */
export const deleteComponentGroup = async (req: Request, res: Response) => {
  const ids: string[] = req.body.ids;

  // Early return for invalid IDs
  if (!ids || ids.length === 0) {
    logger.error('No IDs provided');
    sendResponse({
      statusCode: HttpStatusCodes.BAD_REQUEST,
      res,
      message: HttpResponseMessages.BAD_REQUEST,
      data: 'Please provide at least one ID to delete',
    });
    return;
  }

  try {
    const deletedGroup = await deleteComponentGroups(ids);

    // Early return if no components were deleted
    if (deletedGroup.modifiedCount === 0) {
      logger.error('Categories not found or already deleted');
      sendResponse({
        statusCode: HttpStatusCodes.NOT_FOUND,
        res,
        message: HttpResponseMessages.NOT_FOUND,
        data: 'Categories not found or already deleted with the provided IDs',
      });
      return;
    }

    // Success response
    logger.info(
      `${deletedGroup.modifiedCount} Components deleted successfully`
    );
    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: `Component group, ${deletedGroup.modifiedCount} Deleted Successfully`,
    });
  } catch (error) {
    // Handle errors
    logger.error('Error deleting component group', error);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
/**
 * @desc Search Component Group by name
 * @route GET /api/component/search
 */
export const searchComponentGroups = async (req: Request, res: Response) => {
  try {
    const componentName = (req.query.key as string) || ''; // Extract from query params
    if (!componentName || typeof componentName !== 'string') {
      logger.error('Invalid component name provided.');
      sendResponse({
        statusCode: HttpStatusCodes.BAD_REQUEST,
        res,
        message: HttpResponseMessages.BAD_REQUEST,
        data: 'Component name must be a string and provided in query parameters.',
      });
      return;
    }

    const groups = await searchComponentGroup(componentName);
    logger.info('Component groups fetch successfully');
    if (groups.length === 0) {
      logger.info('No component groups found matching the provided name.');
      sendResponse({
        statusCode: HttpStatusCodes.OK,
        res,
        message: HttpResponseMessages.SUCCESS,
        data: 'No component groups found.',
      });
      return;
    }

    sendResponse({
      statusCode: HttpStatusCodes.OK,
      res,
      message: HttpResponseMessages.SUCCESS,
      data: groups,
    });
  } catch (error) {
    logger.error(`Error while searching component group by name => ${error}`);
    sendResponse({
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      res,
      message: ErrorMessageCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
    return;
  }
};
