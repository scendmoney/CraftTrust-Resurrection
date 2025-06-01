import { FC, useState } from 'react';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { IAddress } from 'sharedProject/types';

import InputText from '../inputs/InputText/InputText';

import GoogleMapsLocationInputAddGoogleMap from './GoogleMapsLocationInputAddGoogleMap/GoogleMapsLocationInputAddGoogleMap';

const GoogleLocationInput: FC<{
  value?: IAddress | null;
  onChange: (value: IAddress | null) => void;
}> = ({ value, onChange }) => {
  const [isAddWindowOpen, setIsAddWindowOpen] = useState<boolean>(false);

  return (
    <>
      <InputText
        readOnly
        titleText="Location"
        placeholder="No location"
        value={value?.fullAddress ? value.fullAddress : ''}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={openAddWindowHandler}>
              {value?.fullAddress ? (
                <EditLocationAltOutlinedIcon />
              ) : (
                <AddLocationAltOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <Dialog fullWidth onClose={closeAddWindowHandler} open={isAddWindowOpen}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <GoogleMapsLocationInputAddGoogleMap
            onChange={onChange}
            closeAddWindow={closeAddWindowHandler}
          />
        </DialogContent>
      </Dialog>
    </>
  );

  function openAddWindowHandler() {
    setIsAddWindowOpen(true);
  }

  function closeAddWindowHandler() {
    setIsAddWindowOpen(false);
  }
};

export default GoogleLocationInput;
