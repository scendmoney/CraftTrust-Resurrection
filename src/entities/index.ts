import '../enums';

import HealthCheckModule from '../common/health_check';
import { UserModule } from './user';
import { FacilityModule } from './facility';
import { ProductModule } from './product';
import { AssetModule } from './asset';
import { ItemModule } from './item';
import { InviteModule } from './invite';
import FacilityToFacilityModule from './facility_to_facility';
import { CartItemModule } from './cart_item';
import { CartModule } from './cart';
import { TwilioChatModule } from './twilio_chat';
import NotificationModule from './notification';
import { OrderModule } from './order';
import OrderProductModule from './order_product';
import { RequestModule } from './request';
import TransactionBlockchainModule from './transaction_blockchain';
import { CompanyModule } from './company';
import { SubcompanyModule } from './subcompany';
import { SurveyModule } from './survey';
import TransactionModule from './transaction';
import { ReportModule } from './report';
import HederaCronModule from './hedera';
import { CustomerIoDataModule } from './customerio';
import NFTModule from './nft';
import ConfigurationModule from './configuration';
import AuthModule from './auth';
import CodeModule from './code';

export default [
  AssetModule,
  AuthModule,
  CartItemModule,
  CartModule,
  CodeModule,
  CompanyModule,
  ConfigurationModule,
  CustomerIoDataModule,
  FacilityModule,
  FacilityToFacilityModule,
  HealthCheckModule,
  HederaCronModule,
  InviteModule,
  ItemModule,
  NFTModule,
  NotificationModule,
  OrderModule,
  OrderProductModule,
  ProductModule,
  ReportModule,
  RequestModule,
  SubcompanyModule,
  SurveyModule,
  TransactionBlockchainModule,
  TransactionModule,
  TwilioChatModule,
  UserModule,
];
