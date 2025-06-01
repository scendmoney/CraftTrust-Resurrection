import { Route } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';

const useProjectRouter = () => {
  const router = useRouter();

  async function goTo(url: string | Route, isShallow = false) {
    await router.push(
      {
        pathname: url
      },
      undefined,
      { shallow: isShallow }
    );
  }

  async function goToModal(
    query: string | ParsedUrlQueryInput | null | undefined,
    pathname?: string | null | undefined
  ) {
    // eslint-disable-next-line no-console

    if (pathname) {
      await router.push({
        pathname: pathname,
        query: query
      });
    } else {
      await router.push(
        {
          pathname: router.pathname,
          query: query
        },
        undefined,
        {
          shallow: true
        }
      );
    }
  }

  async function clearQuery() {
    await router.push(
      {
        pathname: router.pathname,
        query: undefined
      },
      undefined,
      {
        shallow: true
      }
    );
  }

  async function clearDynamicQuery(query: string | ParsedUrlQueryInput | null | undefined) {
    await router.push(
      {
        pathname: router.pathname,
        query: query
      },
      undefined,
      {
        shallow: true
      }
    );
  }

  return {
    pathname: router.pathname,
    goTo,
    goToModal,
    clearQuery,
    clearDynamicQuery,
    query: router.query,
    id: nextRouterQueryCheckText(router.query.id),
    modalId: nextRouterQueryCheckText(router.query.modalId),
    router: router
  };
};

export default useProjectRouter;
