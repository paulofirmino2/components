import { FC, useEffect, useState } from 'react';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import * as Styled from './Toast.styled';
import { ToastProps } from './Toast.types';

const icon = {
  success: (
    <Styled.Icon>
      <img alt="ícone sucesso" src="/toast-img-success.svg" />
    </Styled.Icon>
  ),
  error: (
    <Styled.Icon>
      <img alt="ícone erro" src="/toast-img-error.svg" />
    </Styled.Icon>
  ),
  warning: (
    <Styled.Icon>
      <img alt="ícone com ponto de exclamação" src="/toast-img-warning.svg" />
    </Styled.Icon>
  ),
};

const ToasterComponent: FC<ToastProps> = ({
  variant,
  position = 'bottom-center',
  duration = 3000,
  id,
}) => {
  const { pathname } = useLocation();
  const [previousId, setPreviousId] = useState<string | null>(null);

  useEffect(() => {
    toast.remove();
  }, [pathname]);

  useEffect(() => {
    if (previousId) {
      toast.remove(previousId);
    }
    if (id) {
      setPreviousId(id);
    }
  }, [id]);

  const handleClose = () => {
    toast.remove();
  };

  return (
    <Styled.ToasterWrapper>
      <Toaster
        position={position}
        toastOptions={{
          className: '',
          duration,
          style: {
            width: '100%',
            color: '#ffffff',
            boxShadow: 'none',
            backgroundColor: '#3D4045',
            padding: 24,
            fontSize: 16,
            fontStyle: 'normal',
            border: 'none',
            fontWeight: 400,
            textAlign: 'left',
            marginRight: 0,
            borderRadius: 12,
          },
        }}
      >
        {t => (
          <ToastBar toast={t}>
            {({ message }) => (
              <Styled.ToastWrapper>
                {icon[variant]}
                <Styled.MessageWrapper>{message}</Styled.MessageWrapper>
                <Styled.CloseButton onClick={handleClose}>
                  <img alt="ícone com letra X" src="/close-icon.svg" />
                </Styled.CloseButton>
              </Styled.ToastWrapper>
            )}
          </ToastBar>
        )}
      </Toaster>
    </Styled.ToasterWrapper>
  );
};
export default ToasterComponent;
