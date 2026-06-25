import { useNavigate } from 'react-router-dom';

export const useHandleModalClose = () => {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate(-1);
  };

  return handleModalClose;
};
