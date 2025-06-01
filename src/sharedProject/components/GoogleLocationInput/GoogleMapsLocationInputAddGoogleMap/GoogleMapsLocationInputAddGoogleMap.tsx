/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { FC, useEffect, useMemo } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { IAddress } from 'sharedProject/types';
import loadScript from 'utils/loadScript';

import styles from './styles';
import { PlaceType, UnknownGoogleType } from './types';

const API_KEY = process.env.NEXT_PUBLIC_ENV_GOOGLE_MAPS_PUBLIC_KEY;

const autocompleteService = { current: null };
const geoCoder = { current: null };
const googleMap = { current: null };

const GoogleMapsLocationInput: FC<{
  onChange: (value: IAddress | null) => void;
  closeAddWindow: () => void;
}> = ({ onChange, closeAddWindow }) => {
  const [temporaryValue, setTemporaryValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const googleMapRef = React.useRef<HTMLDivElement | null>(null);

  const loaded = React.useRef(false);
  const markerRef = React.useRef<UnknownGoogleType | null>(null);

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

      const geoCoderInfo = new (window as UnknownGoogleType).google.maps.Geocoder();

      geoCoder.current = geoCoderInfo;
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

  const stylesUm = useMemo(() => {
    return styles(showMap);
  }, [showMap]);

  return (
    <>
      <Box mb={2} sx={stylesUm.autoCompleteWrapper}>
        <Autocomplete
          id="google-map"
          fullWidth
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          PaperComponent={(props) => <Paper {...props} sx={styles(showMap).paper} elevation={0} />}
          value={temporaryValue}
          noOptionsText="Please type your location"
          onChange={async (_: React.SyntheticEvent, newValue: PlaceType | null) => {
            if (newValue) {
              setOptions([newValue, ...options]);
              setTemporaryValue(newValue);

              if (geoCoder?.current && newValue) {
                const coordinats = await (geoCoder.current as UnknownGoogleType).geocode({
                  placeId: newValue?.place_id
                });
                const lat = coordinats?.results[0]?.geometry?.location.lat();
                const lng = coordinats?.results[0]?.geometry?.location.lng();

                getMap({
                  lat: lat,
                  lng: lng
                });
              }
            } else {
              setTemporaryValue(null);
              setOptions(options);
            }
          }}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
            return;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              placeholder="Location"
              fullWidth
              sx={stylesUm.inputWrapper}
              InputProps={{
                ...params.InputProps,
                style: stylesUm.input
              }}
            />
          )}
          renderOption={(props, option) => {
            const title = option.structured_formatting.main_text;
            const description = option.structured_formatting.secondary_text;

            return (
              <li {...props} className={undefined}>
                <ListItemButton>
                  <ListItemText primary={title} secondary={description} />
                </ListItemButton>
              </li>
            );
          }}
        />
      </Box>

      <Box ref={googleMapRef} style={stylesUm.map} />

      <ButtonUi onClick={handleChangeTemporaryValue}>Confirm</ButtonUi>
    </>
  );

  function handleChangeTemporaryValue() {
    // if (temporaryValue) {
    //   onChange({
    //     googlePlaceId: temporaryValue.place_id,
    //     fullAddress: temporaryValue.description,
    //     address: temporaryValue.structured_formatting.secondary_text
    //   });
    //   closeAddWindow();
    // }
    // onChange({
    //   googlePlaceId: temporaryValue ? temporaryValue.place_id : null,
    //   fullAddress: temporaryValue ? temporaryValue.description : null,
    //   address: temporaryValue ? temporaryValue.structured_formatting.secondary_text : null
    // });
    if (temporaryValue) {
      onChange({
        googlePlaceId: temporaryValue.place_id,
        fullAddress: temporaryValue.description,
        address: temporaryValue.structured_formatting.secondary_text
      });
    } else {
      onChange(null);
    }
    closeAddWindow();
  }

  function getMap(coords: any) {
    const map = new (window as any).google.maps.Map(googleMapRef.current, {
      zoom: 14,
      center: coords,
      disableDefaultUI: true,
      mapTypeControl: true,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true
    });
    googleMap.current = map;
    if (map) {
      markerRef.current = new (window as any).google.maps.Marker({
        position: coords,
        map
      });
      setShowMap(true);
    }
  }
};

export default GoogleMapsLocationInput;
