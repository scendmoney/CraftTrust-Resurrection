import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  AssociateTransactionInput,
  BuyOrderDTO,
  BuyOrderInput,
  HederaOptions,
  SwapTokenToHbarDTO,
  SwapTokenToHbarInput,
  TokenTransferDTO,
  TransferHbarDTO,
  WalletAssociateTokenAndContractInput,
} from './hedera.dto';
import {
  AccountAllowanceApproveTransaction,
  AccountBalance,
  AccountBalanceJson,
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  Client,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  Hbar,
  Mnemonic,
  TokenAssociateTransaction,
  TokenId,
  Transaction,
  TransactionResponse,
  TransferTransaction,
  ContractUpdateTransaction,
  ContractInfoQuery,
  TokenCreateTransaction,
  TokenType,
  TokenMintTransaction,
  TokenSupplyType,
  PrivateKey,
} from '@hashgraph/sdk';
import NodeClient from '@hashgraph/sdk/lib/client/NodeClient';
import axios from 'axios';
import moment from 'moment';
import * as ethers from 'ethers';
import ErrorMsgHederaEnum from './hedera.error';

@Injectable()
export default class HederaService implements OnModuleInit {
  private client: NodeClient;
  private mnemonik: Mnemonic;
  private options: HederaOptions = null;

  constructor(options: HederaOptions) {
    this.options = options;
  }

  async onModuleInit() {
    const options = this.options;
    this.mnemonik = await Mnemonic.fromString(options.mnemonic);
    const operatorId = AccountId.fromString(options.hederaAccountId);

    const operatorKey = options.isED25519
      ? await this.mnemonik.toStandardEd25519PrivateKey(
          options.mnemonic,
          Number(options.hederaPath),
        )
      : await this.mnemonik.toStandardECDSAsecp256k1PrivateKey(
          options.mnemonic,
          Number(options.hederaPath),
        );
    if (options.isTestnet) {
      this.client = Client.forTestnet().setOperator(operatorId, operatorKey);
    } else {
      this.client = Client.forMainnet().setOperator(operatorId, operatorKey);
    }
  }

  getClient() {
    return this.client;
  }

  getAccount(accountId: string) {
    return AccountId.fromString(accountId);
  }

  async getAccountBalance(accountId: string): Promise<AccountBalanceJson> {
    const query = new AccountBalanceQuery().setAccountId(accountId);
    const balance: AccountBalance = await query.execute(this.client);
    return balance.toJSON();
  }

  async getAccountBalanceToken(
    accountId: string,
    token: string,
  ): Promise<number> {
    const balance: AccountBalanceJson = await this.getAccountBalance(accountId);
    const findTokenBalance = balance.tokens.find(
      (item) => item.tokenId === token,
    );
    return findTokenBalance
      ? Number(findTokenBalance.balance) /
          Math.pow(10, findTokenBalance.decimals)
      : 0;
  }

  async getPrivateKeyEd25519(path: number, mnemonic?: string) {
    const privateKey = await this.mnemonik.toStandardEd25519PrivateKey(
      mnemonic ? mnemonic : this.options.mnemonic,
      path,
    );

    return privateKey;
  }

  async getPrivateKeyECDSA(path: number, mnemonic?: string) {
    const privateKey = await this.mnemonik.toStandardECDSAsecp256k1PrivateKey(
      mnemonic ? mnemonic : this.options.mnemonic,
      path,
    );

    return privateKey;
  }

  async tokenAssociateTransaction(
    accountId: string,
    mnemonic: string,
    path: number,
    token: string,
  ) {
    try {
      const privateKey = await this.getPrivateKey(path, mnemonic);

      const associateTx = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([token])
        .freezeWith(this.client)
        .sign(privateKey);
      const associateTxSubmit = await associateTx.execute(this.client);
      await associateTxSubmit.getReceipt(this.client);
    } catch (err) {
      console.log(`Association token error: ${err.message} \n`);
    }
  }

  async contractOrderAssociateTransaction(accountId: string, path: number) {
    try {
      await this.associateTransaction({
        accountId,
        path,
        token: this.options.token,
        contractOrAccountId: this.options.contract,
        quantity: 999999999999999,
      });
    } catch (err) {
      console.log(`Association contract error: ${err.message} \n`);
    }
  }

  async associateTransaction({
    accountId,
    path,
    token,
    contractOrAccountId,
    quantity,
    memo = '',
  }: AssociateTransactionInput) {
    try {
      const privateKey = await this.getPrivateKey(path);
      const allowanceTx = await new AccountAllowanceApproveTransaction()
        .approveTokenAllowance(token, accountId, contractOrAccountId, quantity)
        .setTransactionMemo(memo)
        .freezeWith(this.client)
        .sign(privateKey);
      const transactionTx = await allowanceTx.execute(this.client);
      await transactionTx.getReceipt(this.client);

      return transactionTx.transactionId.toString();
    } catch (err) {
      console.log(`Association contract error: ${err.message} \n`);
      throw new Error(`Association contract error: ${err.message} \n`);
    }
  }

  async createAccountEd25519(hbar: number, path: number, mnemonic: string) {
    const privateKey = await this.getPrivateKeyEd25519(path, mnemonic);
    const response = await new AccountCreateTransaction()
      .setInitialBalance(new Hbar(hbar))
      .setKey(privateKey.publicKey)
      .setMaxAutomaticTokenAssociations(10)
      .execute(this.client);
    const receipt = await response.getReceipt(this.client);
    return receipt.accountId;
  }

  async createAccountECDSA(hbar: number, path: number, mnemonic) {
    const privateKey = await this.getPrivateKeyECDSA(path, mnemonic);
    const response = await new AccountCreateTransaction()
      .setInitialBalance(new Hbar(hbar))
      .setKey(privateKey.publicKey)
      .setMaxAutomaticTokenAssociations(10)
      .execute(this.client);
    const receipt = await response.getReceipt(this.client);

    return receipt.accountId;
  }

  async transferToken({
    accountFrom,
    accountTo,
    token,
    count,
  }: TokenTransferDTO) {
    try {
      const privateKey = await this.getPrivateKey(accountFrom.path);
      const tokenTransferTx = await new TransferTransaction()
        .addTokenTransfer(token, accountFrom.wallet, -count)
        .addTokenTransfer(token, accountTo.wallet, count)
        .freezeWith(this.client)
        .sign(privateKey);
      const tokenTransferSubmit = await tokenTransferTx.execute(this.client);
      await tokenTransferSubmit.getReceipt(this.client);
    } catch (err) {
      console.log(`Transfer Token error: ${err.message} \n`);
    }
  }

  async transferHbar({
    walletFrom,
    walletFromPath,
    walletTo,
    count,
  }: TransferHbarDTO) {
    try {
      const privateKey = await this.getPrivateKey(walletFromPath);

      const tokenTransferTx = await new TransferTransaction()
        .addHbarTransfer(walletFrom, new Hbar(-count))
        .addHbarTransfer(walletTo, new Hbar(count))
        .freezeWith(this.client)
        .sign(privateKey);
      const transactionTx = await tokenTransferTx.execute(this.client);

      let result;
      try {
        result = await transactionTx.getRecord(this.client);
      } catch (error) {
        return {
          error: error.message,
          isSuccess: false,
          transactionBlockchainId: transactionTx.transactionId.toString(),
          feeHbar: 0,
          fee: 0,
          gasUsed: 0,
          gasLimit: 0,
          errorCode: error?.transactionReceipt?.status?._code,
        };
      }

      const usdHbar = await this.getHBarUsd();
      const feeHbar = result.transactionFee?.toTinybars()
        ? result.transactionFee?.toTinybars().toNumber() / 100000000
        : 0;
      const isSuccess = result.receipt?.status?._code === 22;

      return {
        transactionBlockchainId:
          result.transactionId?.toString() ||
          transactionTx.transactionId.toString(),
        feeHbar,
        fee: feeHbar * usdHbar,
        gasUsed: result?.contractFunctionResult?.gasUsed?.toNumber() || 0,
        gasLimit: 0,
        isSuccess,
      };
    } catch (err) {
      console.log(`Transfer Hbar error: ${err.message} \n`);
    }
  }

  async buyOrder(data: BuyOrderInput): Promise<BuyOrderDTO> {
    const options = this.options;
    const gasLimit = 1000000;
    const accountBuyer = this.getAccount(data.accountBuyer.wallet);
    const accountCultivator = this.getAccount(data.accountCultivator.wallet);

    const tokenInfo = await this.getTokenInfo(options.token);

    if (!tokenInfo) {
      throw new Error(ErrorMsgHederaEnum.TokenInfoWrong);
    }

    const transaction: Transaction = new ContractExecuteTransaction()
      .setContractId(options.contract)
      .setGas(gasLimit)
      .setFunction(
        'buyOrder',
        new ContractFunctionParameters()
          .addBytesArray([Buffer.from(data.ipfs), Buffer.from(data.ipfs)])
          .addAddress(TokenId.fromString(options.token).toSolidityAddress())
          .addAddress(accountBuyer.toSolidityAddress())
          .addAddress(accountCultivator.toSolidityAddress())
          .addAddress(accountCultivator.toSolidityAddress())
          .addInt64(Math.round(data.amount * Math.pow(10, tokenInfo.decimals)))
          .addInt64(Math.round(data.fee * Math.pow(10, tokenInfo.decimals))),
      )
      .freezeWith(this.client);

    const transactionTx: TransactionResponse = await transaction.execute(
      this.client,
    );
    let result;
    try {
      result = await transactionTx.getRecord(this.client);
    } catch (error) {
      return {
        error: error.message,
        isSuccess: false,
        transactionBlockchainId: transactionTx.transactionId.toString(),
        feeHbar: 0,
        fee: 0,
        gasUsed: 0,
        gasLimit,
        errorCode: error?.transactionReceipt?.status?._code,
      };
    }
    const usdHbar = await this.getHBarUsd();
    const feeHbar = result.transactionFee?.toTinybars()
      ? result.transactionFee?.toTinybars().toNumber() / 100000000
      : 0;
    const isSuccess = result.receipt?.status?._code === 22;

    return {
      transactionBlockchainId:
        result.transactionId?.toString() ||
        transactionTx.transactionId.toString(),
      feeHbar,
      fee: feeHbar * usdHbar,
      gasUsed: result?.contractFunctionResult?.gasUsed?.toNumber() || 0,
      gasLimit,
      isSuccess,
    };
  }

  async getContractExpiresAt(contractId: string): Promise<Date> {
    const query = new ContractInfoQuery().setContractId(contractId);
    const info = await query.execute(this.client);
    return info.expirationTime.toDate();
  }

  async contractExpiresAtUpdate(contractId: string): Promise<boolean> {
    const privateKey = await this.getPrivateKey(this.options.hederaPath);

    const transaction = await new ContractUpdateTransaction()
      .setContractId(contractId)
      .setExpirationTime(moment().add(90, 'days').toDate())
      .setAutoRenewAccountId(this.options.hederaAccountId)
      .setMaxTransactionFee(new Hbar(1))
      .freezeWith(this.client)
      .sign(privateKey);

    const transactionSubmit = await transaction.execute(this.client);
    await transactionSubmit.getReceipt(this.client);
    return true;
  }

  async getCountHbarByTokenV1(
    token: string,
    token2: string,
    amount: number,
  ): Promise<number> {
    const abi = [
      'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
    ];

    //Load the ABI
    const abiInterfaces = new ethers.Interface(abi);

    const tokenIn = '0x' + TokenId.fromString(token).toSolidityAddress();
    const tokenOut = '0x' + TokenId.fromString(token2).toSolidityAddress();
    const route = [tokenIn, tokenOut];

    const params = [amount, route];
    const encodedData = abiInterfaces.encodeFunctionData(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      abiInterfaces.getFunction('getAmountsOut')!,
      params,
    );

    const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/contracts/call`;
    const data = {
      block: 'latest',
      data: encodedData,
      to: this.getAccount(this.options.swapContract).toSolidityAddress(),
    };

    const response = await axios.post(url, data, {
      headers: { 'content-type': 'application/json' },
    });
    const amounts = abiInterfaces.decodeFunctionResult(
      'getAmountsOut',
      response.data.result,
    )[0];

    const finalOutputAmount = amounts[amounts.length - 1];
    return Number(finalOutputAmount);
  }

  async swapTokenToHbar(
    data: SwapTokenToHbarInput,
  ): Promise<SwapTokenToHbarDTO> {
    const gasLimit = 1000000;
    const tokenIn = '0x' + TokenId.fromString(data.tokenIn).toSolidityAddress();
    const tokenOut =
      '0x' + TokenId.fromString(data.tokenOut).toSolidityAddress();

    const privateKey = await this.getPrivateKey(this.options.hederaPath);

    const tokenBalance = await this.getAccountBalanceToken(
      data.wallet,
      data.tokenIn,
    );

    if (tokenBalance - data.totalBlocked < data.amount) {
      throw new Error(ErrorMsgHederaEnum.NotEnoughTokens);
    }

    const [tokenAllowanceQuantity, tokenInfo] = await Promise.all([
      this.getTokenAllowance(
        data.wallet,
        data.tokenIn,
        this.options.swapContract,
      ),
      this.getTokenInfo(data.tokenIn),
    ]);

    if (!tokenInfo) {
      throw new Error(ErrorMsgHederaEnum.TokenInfoWrong);
    }

    const amountUint256 = data.amount * Math.pow(10, tokenInfo.decimals);

    if (tokenAllowanceQuantity < amountUint256) {
      await this.associateTransaction({
        accountId: data.wallet,
        path: data.index,
        token: data.tokenIn,
        contractOrAccountId: this.options.swapContract,
        quantity: amountUint256,
      });
    }

    const amountOutMin = await this.getCountHbarByTokenV1(
      data.tokenIn,
      data.tokenOut,
      amountUint256,
    );

    const params = new ContractFunctionParameters();
    params.addUint256(amountUint256); //uint amountIn USDC
    params.addUint256(amountOutMin); //uint amountOutMin Hbar
    params.addAddressArray([tokenIn, tokenOut]); //address[] calldata path
    params.addAddress(privateKey.publicKey.toEvmAddress()); //address to
    params.addUint256(moment().add(1, 'h').valueOf()); //uint deadline

    const response = await new ContractExecuteTransaction()
      .setContractId(this.options.swapContract)
      .setGas(gasLimit)
      .setFunction('swapExactTokensForETH', params)
      .freezeWith(this.client)
      .execute(this.client);

    let record;
    try {
      record = await response.getRecord(this.client);
    } catch (error) {
      return {
        error: error.message,
        isSuccess: false,
        transactionBlockchainId: response.transactionId.toString(),
        feeHbar: 0,
        fee: 0,
        gasUsed: 0,
        gasLimit,
        errorCode: error?.transactionReceipt?.status?._code,
        amountOut: amountOutMin,
      };
    }

    const usdHbar = await this.getHBarUsd();
    const feeHbar = record.transactionFee?.toTinybars()
      ? record.transactionFee?.toTinybars().toNumber() / 100000000
      : 0;
    const isSuccess = record.receipt?.status?._code === 22;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = record.contractFunctionResult!;
    const values = result.getResult(['uint[]']);
    const amounts = values[0];
    const finalOutputAmount = amounts[amounts.length - 1];

    return {
      transactionBlockchainId:
        record.transactionId?.toString() || response.transactionId.toString(),
      amountOut: finalOutputAmount.toString(),
      feeHbar,
      fee: feeHbar * usdHbar,
      gasUsed: result?.contractFunctionResult?.gasUsed?.toNumber() || 0,
      gasLimit,
      isSuccess,
    };
  }

  async createNFT(name: string, symbol: string): Promise<string> {
    const privateKey = await this.getPrivateKey(this.options.hederaPath);

    const nftCreate = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setTokenType(TokenType.NonFungibleUnique)
      .setDecimals(0)
      .setInitialSupply(0)
      .setSupplyType(TokenSupplyType.Finite)
      .setMaxSupply(10000000000000)
      .setSupplyKey(privateKey)
      .setTreasuryAccountId(this.options.hederaAccountId)
      .freezeWith(this.client);

    const nftCreateTxSign = await nftCreate.sign(privateKey);
    const nftCreateSubmit = await nftCreateTxSign.execute(this.client);
    const nftCreateRx = await nftCreateSubmit.getReceipt(this.client);
    const tokenId = nftCreateRx.tokenId;
    return tokenId.toString();
  }

  async mintNFT(tokenId: string, ipfs: string): Promise<number> {
    const privateKey = await this.getPrivateKey(this.options.hederaPath);

    const maxTransactionFee = new Hbar(1);
    const CIDs = [Buffer.from(ipfs)];
    const mintTx = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata(CIDs)
      .setMaxTransactionFee(maxTransactionFee)
      .freezeWith(this.client);

    const mintTxSign = await mintTx.sign(privateKey);
    const mintTxSubmit = await mintTxSign.execute(this.client);
    const mintRx = await mintTxSubmit.getReceipt(this.client);

    return mintRx.serials[0].low;
  }

  async transferNFT(tokenId: string, serialNumber: number, account: string) {
    const privateKey = await this.getPrivateKey(this.options.hederaPath);

    const tokenTransferTx = await new TransferTransaction()
      .addNftTransfer(
        tokenId,
        serialNumber,
        this.options.hederaAccountId,
        account,
      )
      .freezeWith(this.client)
      .sign(privateKey);

    const tokenTransferSubmit = await tokenTransferTx.execute(this.client);
    const record = await tokenTransferSubmit.getRecord(this.client);

    const usdHbar = await this.getHBarUsd();
    const feeHbar = record.transactionFee?.toTinybars()
      ? record.transactionFee?.toTinybars().toNumber() / 100000000
      : 0;

    return {
      transactionBlockchainId:
        record.transactionId?.toString() ||
        tokenTransferSubmit.transactionId.toString(),
      feeHbar,
      fee: feeHbar * usdHbar,
      gasUsed: record?.contractFunctionResult?.gasUsed?.toNumber() || 0,
    };
  }

  async getTokenAllowance(
    wallet: string,
    tokenId: string,
    spender: string,
  ): Promise<number> {
    const response = await axios.get(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/${wallet}/allowances/tokens?limit=100`,
    );
    const allowance = response?.data?.allowances?.find(
      (item) => item.spender === spender && item.token_id === tokenId,
    );

    return allowance?.amount_granted || 0;
  }

  async getHBarUsd(): Promise<number> {
    const response = await axios.get(
      'https://min-api.cryptocompare.com/data/price?fsym=HBAR&tsyms=USD',
    );
    return response?.data?.USD || 0;
  }

  async getTokenInfo(token: string) {
    const response = await axios.get(
      `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${token}`,
    );
    return response?.data;
  }

  async getPrivateKey(path: number, mnemonic?: string): Promise<PrivateKey> {
    return this.options.isED25519
      ? this.getPrivateKeyEd25519(path, mnemonic)
      : this.getPrivateKeyECDSA(path, mnemonic);
  }

  //checking wallet for token and association contract
  async walletAssociateTokenAndContract({
    account: { path, wallet },
    quantity,
  }: WalletAssociateTokenAndContractInput) {
    const [tokenAllowanceQuantity, tokenInfo] = await Promise.all([
      this.getTokenAllowance(wallet, this.options.token, this.options.contract),
      this.getTokenInfo(this.options.token),
    ]);

    if (!tokenInfo) {
      throw new Error(ErrorMsgHederaEnum.TokenInfoWrong);
    }

    const amountUint256 = quantity * Math.pow(10, tokenInfo.decimals);

    if (tokenAllowanceQuantity < amountUint256) {
      console.log('!!!!!');
      await this.tokenAssociateTransaction(
        wallet,
        this.options.mnemonic,
        path,
        this.options.token,
      );

      await this.contractOrderAssociateTransaction(wallet, path);
    }
  }

  async createSignatureParams(paramsString: string, path: number) {
    const privateKey = await this.getPrivateKey(path);
    const signatureFull = privateKey.sign(Buffer.from(paramsString));
    const signature = Array.from(signatureFull);
    return signature;
  }

  stringToUint8Array(str: string) {
    const arr = [] as number[];
    for (let i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
    }
    const tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
  }
}
