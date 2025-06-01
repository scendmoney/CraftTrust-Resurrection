import { FC, memo, useMemo, useRef } from 'react';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ISubcompanyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { QRCodeSVG } from 'qrcode.react';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';

import styles from './styles';

const ClientPromoInfo: FC<{ subcompainId: number; subcompain: ISubcompanyModel }> = ({
  subcompainId,
  subcompain
}) => {
  const { isOpen, openModal, closeModal } = useModalState();
  const qrRef = useRef<HTMLDivElement | null>(null);

  const linkUm = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_ENV_SITE_URL}/auth/join/wallet?subcompanyId=${subcompainId}`; // TODO
  }, [subcompainId]);

  // eslint-disable-next-line no-console
  console.log(linkUm);

  const handlePrint = () => {
    const printWindow = window.open('', 'PRINT', 'height=600,width=600');
    if (printWindow && printWindow.document) {
      const style = `
        <style>
          body {
            text-align: center;
            font-family: Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 20px;
          }
          .title {
            font-size: 34px;
            line-height: 40px;
            font-weight: bold;
          }
          .subtitle {
            font-size: 24px;
            line-height: 30px;
          }
        </style>
      `;

      const title = `<div class="title">Take the Ratings and receive a gift</div>`;
      const subtitle = `<div class="subtitle">${subcompain.company?.productSurvey.item.name} – ${subcompain.facilityBuyer?.displayName}</div>`;

      const img = subcompain?.company?.productSurvey?.thumbnail
        ? `<img src="${subcompain?.company?.productSurvey?.thumbnail?.url}" width="100" height="100" style="border-radius: 50%; object-fit: cover" />`
        : '';

      printWindow.document.write('<html><head><title>QR Code</title>');
      printWindow.document.write(style);
      printWindow.document.write('</head><body>');
      printWindow.document.write(img);
      printWindow.document.write(title);
      printWindow.document.write(subtitle);
      printWindow.document.write(qrRef.current?.outerHTML || '');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();

      const timer = setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1250);

      printWindow.onbeforeunload = () => {
        clearTimeout(timer);
      };
    }
  };

  return (
    <>
      <CardActionArea sx={styles.container} onClick={() => openModal()}>
        <Box sx={styles.qr}>
          <QRCodeSVG
            value={linkUm}
            size={64}
            bgColor={'#ffffff'}
            fgColor={'#000000'}
            level={'L'}
            includeMargin={false}
          />
        </Box>
        <Box sx={styles.texts}>
          <Typography variant="subtitle1" fontWeight={500}>
            Participation code
          </Typography>
          <Typography variant="body2" fontWeight={500} color={colors.gray2}>
            Click to enlarge or Print
          </Typography>
        </Box>
      </CardActionArea>
      <DialogUI
        close={closeModal}
        open={isOpen}
        buttonSubmitText="Print"
        buttonSubmit={handlePrint}
        title="QR Code"
      >
        <Box sx={styles.qrDialog}>
          {subcompain?.company?.productSurvey?.thumbnail?.url ? (
            <AvatarUncontrolled
              isGrayBackground
              src={subcompain?.company?.productSurvey?.thumbnail?.url}
              type={128}
            />
          ) : null}

          <Box pb={1} pt={1}>
            <Typography variant="body1" fontWeight={500}>
              {subcompain.company?.productSurvey.item.name}
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography variant="body1">{subcompain.facilityBuyer?.displayName}</Typography>
          </Box>

          <Box ref={qrRef}>
            <QRCodeSVG
              value={linkUm}
              size={240}
              bgColor={'#ffffff'}
              fgColor={'#000000'}
              level={'L'}
              includeMargin={true}
            />
          </Box>
        </Box>
      </DialogUI>
    </>
  );
};

export default memo(ClientPromoInfo);
