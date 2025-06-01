import React, { ChangeEvent, FC, useMemo, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {
  Box,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import _ from 'lodash';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import { terpenes } from 'sharedProject/terpenes';
import { ITerpene } from 'sharedProject/types';

import styles from './styles';
import IProps from './types';

const terpenesArray: ITerpene[] = terpenes;

const TerpenesSelector: FC<IProps> = ({ value = [], onChange, onBlur }) => {
  const terpenesArraySortedAndFilteredUm = useMemo(() => {
    const sorted = terpenesArray.sort((a, b) => value.indexOf(a.key) - value.indexOf(b.key));
    const sortedAndFiltered = sorted.filter((item) => value.includes(item.key));
    return sortedAndFiltered;
  }, [value]);

  const [selectedTerpenes, setSelectedTerpenes] = useState<ITerpene[]>(
    terpenesArraySortedAndFilteredUm
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [draggedItem, setDraggedItem] = useState<ITerpene | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [searchInputText, setSearchInputText] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSearchInput('');
    setSearchInputText('');
    setAnchorEl(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelect = (terpene: ITerpene) => {
    setSelectedTerpenes([...selectedTerpenes, terpene]);
    onChange([...selectedTerpenes, terpene].map((item) => item.key));
    handleClose();
    onBlur();
  };

  const handleRemoveTerpene = (terpene: ITerpene) => {
    const filtered = selectedTerpenes.filter((t) => t.key !== terpene.key);
    setSelectedTerpenes(filtered);
    onChange(filtered.map((item) => item.key));
    onBlur();
  };

  const onDragStart = (terpene: ITerpene) => {
    setDraggedItem(terpene);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    setDragOverIndex(index);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    event.preventDefault();
    if (!draggedItem) return;

    const newTerpenes = [...selectedTerpenes];
    const dragIndex = newTerpenes.findIndex((t) => t.key === draggedItem.key);
    newTerpenes.splice(dragIndex, 1);
    newTerpenes.splice(dropIndex, 0, draggedItem);

    setSelectedTerpenes(newTerpenes);

    onChange(newTerpenes.map((item) => item.key));
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const onDragEnd = () => {
    setDragOverIndex(null);
  };

  const debouncedOnValueChange = useRef(
    _.debounce((newValue: string) => {
      setSearchInput(newValue);
    }, 500)
  ).current;

  const onSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchInputText(event.target.value);
    debouncedOnValueChange(event.target.value);
  };

  const availableTerpenes = terpenesArray.filter(
    (terpene) => !selectedTerpenes.some((selected) => selected.key === terpene.key)
  );

  const terpenesUm = useMemo(() => {
    return availableTerpenes
      .filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
      .map((terpene) => (
        <MenuItem key={terpene.key} onClick={() => handleSelect(terpene)}>
          <ListItemIcon>
            <AvatarUncontrolled type={24} src={terpene.img} />
          </ListItemIcon>
          <ListItemText
            sx={{ textWrap: 'wrap' }}
            primary={terpene.name}
            secondary={terpene.shortDescription}
          />
        </MenuItem>
      ));
  }, [availableTerpenes, handleSelect, searchInput]);

  return (
    <Box>
      <InputLabel sx={styles.label}>Terpenees</InputLabel>
      <Box sx={styles.container} mb={1}>
        {selectedTerpenes.map((terpene, index) => (
          <Box
            key={terpene.key}
            draggable
            onDragStart={() => onDragStart(terpene)}
            onDragOver={(event) => onDragOver(event, index)}
            onDrop={(event) => onDrop(event, index)}
            onDragEnd={onDragEnd}
            sx={styles.terpene}
            style={{
              outline: dragOverIndex === index ? '2px solid #18D458' : 'none',
              opacity: dragOverIndex === index ? '1' : '1'
            }}
          >
            <AvatarUncontrolled variant="rounded" type={24} src={terpene.img} />
            <Typography color={colors.gray2} variant="body1">
              {index + 1}
            </Typography>
            <Typography variant="body1" flexGrow={1}>
              {terpene.name}
            </Typography>

            <IconButton size="small" onClick={() => handleRemoveTerpene(terpene)}>
              <CloseIcon sx={styles.icon} fontSize="small" htmlColor={colors.gray3} />
            </IconButton>

            <DragHandleIcon
              sx={styles.icon}
              fontSize="small"
              htmlColor={colors.gray3}
              cursor="grab"
            />
          </Box>
        ))}
      </Box>

      {availableTerpenes.length > 0 && (
        <ButtonUi
          fullWidth
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          var={EButtonType.Gray}
        >
          Add Terpene
        </ButtonUi>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={styles.menu}
      >
        <Box sx={styles.searchInput}>
          <InputText
            value={searchInputText}
            onChange={onSearch}
            placeholder={'Enter Terpene Name'}
            autoFocus
          />
        </Box>
        <Box sx={styles.menuItems}>{terpenesUm}</Box>
      </Menu>
    </Box>
  );
};

export default TerpenesSelector;
