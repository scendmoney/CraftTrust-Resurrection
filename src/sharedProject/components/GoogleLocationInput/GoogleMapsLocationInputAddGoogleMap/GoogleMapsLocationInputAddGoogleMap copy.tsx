import * as React from 'react';
import { FC, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import { IAddressData } from 'graphql/_server';

import styles from './styles';
import { PlaceType, UnknownGoogleType } from './types';

const API_KEY =
  process.env.NEXT_PUBLIC_ENV_GOOGLE_MAPS_PUBLIC_KEY || 'AIzaSyB7bN_9KLZmJq-3mFJHKh1d1IGkVA9sX68';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);

  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const GoogleMapsLocationInput: FC<{
  // value: TypeGoogleMapsInput | null;
  // onChange: (value: TypeGoogleMapsInput | null) => void;
  // onBlur: () => void;
  // error: boolean;
  // helperText: string;
  value?: IAddressData | null;
  onChange: (value: IAddressData | null) => void;
}> = ({ value, onChange }) => {
  const [temporaryValue, setTemporaryValue] = React.useState<PlaceType | null>({
    description: '',
    structured_formatting: {
      main_text: value?.fullAddress || '',
      secondary_text: value?.city || ''
    },
    place_id: value?.googlePlaceId || ''
  });

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [showMap, setShowMap] = React.useState<boolean>(false);

  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=Function.prototype`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetchUm = React.useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as UnknownGoogleType).getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as UnknownGoogleType).google) {
      autocompleteService.current = new (
        window as UnknownGoogleType
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(temporaryValue ? [temporaryValue] : []);
      setShowMap(false);
      return undefined;
    }

    fetchUm({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (temporaryValue) {
          newOptions = [temporaryValue];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [temporaryValue, inputValue, fetchUm]);

  return (
    <>
      <Autocomplete
        id="google-map"
        fullWidth
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        // onBlur={onBlur}
        includeInputInList
        filterSelectedOptions
        PaperComponent={(props) => <Paper {...props} sx={styles(showMap).paper} elevation={0} />}
        // value={temporaryValue}
        value={temporaryValue}
        noOptionsText="Please type your location"
        onChange={async (_: React.SyntheticEvent, newValue: PlaceType | null) => {
          if (newValue) {
            setOptions([newValue, ...options]);
            setTemporaryValue(newValue);
            onChange({
              googlePlaceId: newValue.place_id,
              fullAddress: newValue.structured_formatting.main_text
            });
          } else {
            setTemporaryValue(null);
            onChange(null);
            // onChange(null);

            setOptions(options);
          }
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          // <InputBase sx={styles(showMap).input} type="text" autoComplete="off" {...params} />
          <TextField
            {...params}
            required
            // variant="standard"
            // label="Choose location"
            fullWidth
            sx={styles(showMap).inputWrapper}
            InputProps={{
              ...params.InputProps,
              style: styles(showMap).input
              // style: { borderBottom: '1px solid rgba(0, 0, 0, 0.42)' }
            }}
            placeholder=""
          />
        )}
        renderOption={(props, option) => {
          const title = option.structured_formatting.main_text;
          const description = option.structured_formatting.secondary_text;

          return (
            <li {...props}>
              <ListItemButton>
                {/* <ListItemIcon>
                <AddLocationIcon />
              </ListItemIcon> */}
                <ListItemText primary={title} secondary={description} />
              </ListItemButton>
            </li>
          );
        }}
      />
    </>
  );

  // async function getTimezoneGoogle(lat: string, lng: string) {
  //   try {
  //     const response = await fetch(`/api/timezone?lat=${lat}&lng=${lng}`);
  //     if (response.ok) {
  //       const timezoneData = await response.json();
  //       return timezoneData.timeZoneId;
  //     } else {
  //       throw new Error('Failed to fetch timezone data');
  //     }
  //   } catch (err) {
  //     toast.error(getErrorMessage(err));
  //   }
  // }
};

export default GoogleMapsLocationInput;
