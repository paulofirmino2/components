/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Webcam from 'react-webcam';

import { Avatar, Button, Dialog, InputFile, Typography } from '@/components';
import { SpacingBottomType } from '@/types/SpacingBottom';
import { convertFiletoBase64, dataURLtoFile } from '@/utils/functions';

import { ImageFile } from '../types';

import * as Styled from './ImageTools.styled';

const photoImg = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H5.93C6.25918 7.00005 6.58329 6.91884 6.87357 6.76359C7.16384 6.60834 7.4113 6.38383 7.594 6.11L8.406 4.89C8.5887 4.61617 8.83616 4.39166 9.12643 4.23641C9.41671 4.08116 9.74082 3.99995 10.07 4H13.93C14.2592 3.99995 14.5833 4.08116 14.8736 4.23641C15.1638 4.39166 15.4113 4.61617 15.594 4.89L16.406 6.11C16.5887 6.38383 16.8362 6.60834 17.1264 6.76359C17.4167 6.91884 17.7408 7.00005 18.07 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V9Z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 13C15 13.7956 14.6839 14.5587 14.1213 15.1213C13.5587 15.6839 12.7956 16 12 16C11.2044 16 10.4413 15.6839 9.87868 15.1213C9.31607 14.5587 9 13.7956 9 13C9 12.2044 9.31607 11.4413 9.87868 10.8787C10.4413 10.3161 11.2044 10 12 10C12.7956 10 13.5587 10.3161 14.1213 10.8787C14.6839 11.4413 15 12.2044 15 13V13Z"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  errorMessage: string;
  onChangeFile: (imageFile: ImageFile | null) => void;
  image: string;
  showCamButton?: boolean;
  spacing?: SpacingBottomType;
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

export const ImageTools: FC<Props> = ({
  errorMessage,
  onChangeFile,
  image,
  spacing,
  showCamButton = true,
}) => {
  const webcamRef = useRef<Webcam>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [camBlock, setCamBlock] = useState(false);

  useEffect(() => {
    if (openDialog) {
      const permissionName = 'camera' as PermissionName;
      navigator.permissions.query({ name: permissionName }).then(result => {
        setCamBlock(result.state === 'denied');
      });
    }
  }, [openDialog]);

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, 'image.jpeg');
      onChangeFile({ srcEncoded: imageSrc, file });
      setOpenDialog(false);
    }
  }, [webcamRef]);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      onChangeFile(null);
      return;
    }
    const file = input.files[0];
    if (file.size > 800000) {
      const resizeWidth = 600;
      const item = file;
      const reader: any = new FileReader();

      reader.readAsDataURL(item);
      reader.name = item.name;
      reader.size = item.size;
      reader.onload = (event: any) => {
        const img: any = new Image();
        img.src = event.target.result;
        img.name = event.target.name;
        img.size = event.target.size;
        img.onload = (el: any) => {
          const elem = document.createElement('canvas');

          const scaleFactor = resizeWidth / el.target.width;
          elem.width = resizeWidth;
          elem.height = el.target.height * scaleFactor;

          const ctx: any = elem.getContext('2d');
          ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

          const srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

          const finalFile = dataURLtoFile(srcEncoded, event.target.name);
          onChangeFile({ srcEncoded, file: finalFile });
        };
      };
    } else {
      const fileBase64 = (await convertFiletoBase64(file)) as string;
      onChangeFile({ srcEncoded: fileBase64, file });
    }
  };

  return (
    <Styled.EmployeeImageUploadWrapper spacing={spacing}>
      <InputFile
        accept="image/png, image/gif, image/jpeg"
        onChangeFile={handleChangeFile}
        errorMessage={errorMessage}
      >
        Adicionar foto
      </InputFile>
      {showCamButton && (
        <Button
          type="button"
          id="capture"
          fullWidth
          onClick={() => setOpenDialog(true)}
        >
          {photoImg}
          Capturar foto
        </Button>
      )}
      {image && (
        <Styled.AvatarWrapper>
          <Avatar src={image} sizevariant="lg" />
        </Styled.AvatarWrapper>
      )}

      <Dialog
        title="Capturar imagem"
        open={openDialog}
        setOpen={setOpenDialog}
        maxWidth={700}
      >
        <Styled.CaptureWrapper>
          {!camBlock && (
            <>
              <Webcam
                audio={false}
                height="auto"
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={videoConstraints}
              />
              <Button type="button" onClick={handleCapture} fullWidth>
                {photoImg}
                Capturar foto
              </Button>
            </>
          )}

          {camBlock && (
            <Typography variant="subTitle" spacing="md">
              Verificamos que a permissão de acesso ao seu dispositivo de câmera
              foi negado para este navegador.
              <br />
              <br />
              Por favor libere o uso da câmera no seu navegador e atualize a
              página.
            </Typography>
          )}
        </Styled.CaptureWrapper>
      </Dialog>
    </Styled.EmployeeImageUploadWrapper>
  );
};
