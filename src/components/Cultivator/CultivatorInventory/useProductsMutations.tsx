import { useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { IMutationUpdateProductArgs, IUserModel, ProductStatusEnum } from 'graphql/_server';
import UPDATE_PRODUCT from 'graphql/mutations/updateProduct';
import projectConstants from 'projectConstants';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

const useProductsMutations = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const client = useApolloClient();
  const [updateProduct] = useMutation<{ updateProduct: IUserModel }, IMutationUpdateProductArgs>(
    UPDATE_PRODUCT
  );

  async function handleUpdateProduct(data: IMutationUpdateProductArgs) {
    try {
      setIsLoading(true);

      const response = await updateProduct({
        variables: data
      });

      if (!response) {
        throw new Error(projectConstants.messages.error);
      }
      toast('Product updated');

      await client.refetchQueries({
        include: ['productsCultivator']
      });

      return response.data?.updateProduct;
    } catch (err) {
      toast.error(getErrorMessage(err), {});
    } finally {
      setIsLoading(false);
    }
  }

  function handleListItem() {
    handleUpdateProduct({
      payload: {
        id: id,
        status: ProductStatusEnum.Listed
      }
    });
  }

  function handleUnlistItem() {
    handleUpdateProduct({
      payload: {
        id: id,
        status: ProductStatusEnum.Unlisted
      }
    });
  }

  function handleNewItem() {
    handleUpdateProduct({
      payload: {
        id: id,
        status: ProductStatusEnum.New
      }
    });
  }

  function handleArchiveItem() {
    handleUpdateProduct({
      payload: {
        id: id,
        status: ProductStatusEnum.Archived
      }
    });
  }

  return {
    isLoading,
    updateProduct: handleUpdateProduct,
    listItem: handleListItem,
    archiveItem: handleArchiveItem,
    unlistItem: handleUnlistItem,
    newItem: handleNewItem
  };
};

export default useProductsMutations;
