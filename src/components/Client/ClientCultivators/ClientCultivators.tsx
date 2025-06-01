import { FC, useMemo, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Avatar, CardActionArea, Fade, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IFacilitiesDto, IFacilityModel, IQueryCultivatorsArgs } from 'graphql/_server';
import CULTIVATORS from 'graphql/queries/cultivators';
import _ from 'lodash';
import Routes from 'routes';
import { useWindowSizeDebounced } from 'sharedArchitech/hooks/useWindowSizeDebounced';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const ClientCompanies: FC = () => {
  const [cultivators, setCultivators] = useState<IFacilityModel[]>([]);
  const { w: screenWidth } = useWindowSizeDebounced();
  const [areButtonsDisabled, setAreButtonsDisabled] = useState({ prev: true, next: false });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { goTo } = useProjectRouter();

  const { loading } = useQuery<{ cultivators: IFacilitiesDto }, IQueryCultivatorsArgs>(
    CULTIVATORS,
    {
      variables: {
        payload: {}
      },
      onCompleted: (data) => {
        const items = data?.cultivators.items || [];
        setCultivators(items);
      }
    }
  );

  const handlePrevClick = () => {
    const container = containerRef.current;
    if (container) {
      const card = container.firstChild;
      if (card instanceof HTMLElement) {
        container.scrollLeft -= card.offsetWidth;
      }
    }
  };

  const handleNextClick = () => {
    const container = containerRef.current;
    if (container) {
      const card = container.firstChild;
      if (card instanceof HTMLElement) {
        container.scrollLeft += card.offsetWidth;
      }
    }
  };

  const debouncedOnValueChange = useRef(
    _.debounce(() => {
      const container = containerRef.current;
      setAreButtonsDisabled({
        prev: container?.scrollLeft === 0,
        next: container?.scrollLeft
          ? container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
          : false
      });
    }, 500)
  ).current;

  const showArrowUm = useMemo(() => {
    if (cultivators.length * 300 > screenWidth - 60) {
      return true;
    } else {
      return false;
    }
  }, [cultivators.length, screenWidth]);

  if (loading) return <Loader />;

  return (
    <Fade in timeout={1200}>
      <Box sx={styles.container}>
        <Box sx={styles.containerArrow}>
          <Typography variant="subtitle1" fontWeight={500}>
            Cultivators
          </Typography>
          {showArrowUm && (
            <Box sx={styles.arrows}>
              <IconButton onClick={handlePrevClick} disabled={areButtonsDisabled.prev}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              <IconButton onClick={handleNextClick} disabled={areButtonsDisabled.next}>
                <ArrowForwardOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <Box ref={containerRef} sx={styles.cardsContainer} onScroll={debouncedOnValueChange}>
            {cultivators.map((item) => (
              <Box key={item.displayName}>
                <CardActionArea
                  sx={styles.cardWrapper}
                  onClick={() => goTo(`${Routes.CLIENT_STOREFRONT}/${item.id}`)}
                >
                  <Box sx={styles.nameWrapper}>
                    <Box sx={styles.license}>
                      <Avatar
                        alt={item.name}
                        src={item.asset?.url || undefined}
                        sx={styles.avatar}
                      />

                      <Typography variant="subtitle1" fontWeight={500}>
                        {item.displayName}
                      </Typography>
                    </Box>
                    {/* {item?.license.isLicenseActive && (
                      <Tooltip
                        title={
                          <Typography variant="caption" textAlign={'center'}>
                            {`License is active until ${formatDateTimeDateFns(
                              item?.license?.licenseEndDate
                            )}`}
                          </Typography>
                        }
                        placement={'bottom'}
                      >
                        <Box>
                          <CompletedIcon fill={colors.green} />
                        </Box>
                      </Tooltip>
                    )} */}
                  </Box>
                </CardActionArea>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default ClientCompanies;
