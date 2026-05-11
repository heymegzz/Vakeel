import logger from '../../shared/utils/logger';

/**
 * Upload service — handles file storage and processing
 * Will be expanded in Phase 2 with PDF parsing logic
 */
export const processUpload = async (
  _userId: string,
  _fileName: string
): Promise<{ message: string }> => {
  logger.info('Upload processing will be implemented in Phase 2');
  return { message: 'Upload received — PDF parsing coming in Phase 2' };
};
