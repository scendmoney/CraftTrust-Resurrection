import { FacilityModel } from '@entities/facility/facility.model';
import { Injectable } from '@nestjs/common';
import { MetrcLabtestsService, MetrcPackagesService } from 'libs/metrc/src';
import moment from 'moment';
import { DataSource, DeepPartial } from 'typeorm';
import timers from 'node:timers/promises';
import {
  LabTestingEnum,
  PackageTypeEnum,
  ProductStatusEnum,
  UnitsOfMeasureAbbreviationEnum,
  UnitsOfMeasureNameEnum,
  UnitsOfMeasureQuantityTypeEnum,
} from './product.enum';
import { MetrcPackage } from 'libs/metrc/src/api/api.dto';
import { ProductModel } from './product.model';
import floor from 'lodash/floor';
import random from 'lodash/random';
import { CONFIG } from '@config/index';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly metrcPackagesService: MetrcPackagesService,
    private readonly metrcLabtestsService: MetrcLabtestsService,
  ) {}

  async syncProducts(facility: FacilityModel) {
    if (!facility.metrcApiKey) return;

    let numberOfDays = 60;
    const startTimeFrom = moment().subtract(numberOfDays, 'days');
    const days = new Set<string>();
    const startDay = moment().utc().startOf('day');

    if (!facility.productsSyncDate) {
      days.add(startDay.toISOString());
      Array.from({ length: numberOfDays }).forEach(() => {
        days.add(startDay.subtract(1, 'days').toISOString());
      });
    } else {
      const productsSyncDate = moment(facility.productsSyncDate).utc();
      days.add(startDay.toISOString());
      const diffInDays = startDay.diff(productsSyncDate, 'days');
      Array.from({ length: diffInDays + 1 }).forEach(() => {
        days.add(startDay.subtract(1, 'days').toISOString());
      });
    }

    for await (const dateSync of Array.from(days)) {
      let isHasMoreItems = true;
      let pageNumber = 1;
      while (isHasMoreItems) {
        let packages: any = [];

        packages = await this.metrcPackagesService.getPackagesByStatus(
          facility.metrcApiKey,
          'active',
          facility.id,
          String(pageNumber),
          '20',
          dateSync,
        );
        if (packages.data?.length) {
          await this._mappingProducts(facility, packages.data);
        }
        if (packages.totalPages <= packages.page) {
          isHasMoreItems = false;
        }
        // api metrc overload (429 error)
        await timers.setTimeout(1000);
        pageNumber++;
      }
      numberOfDays--;
      startTimeFrom.add(1, 'day');
    }

    await this.dataSource.getRepository(FacilityModel).update(facility.id, {
      productsSyncDate: moment().utc().toISOString(),
    });
  }

  static _mappingProduct(
    facilityId: string,
    packageItem: MetrcPackage,
    parentId?: number,
  ): DeepPartial<ProductModel> {
    const data: DeepPartial<ProductModel> = {
      ...packageItem,
      quantity: this._convertToPounds(
        packageItem.quantity,
        UnitsOfMeasureAbbreviationEnum[packageItem.unitOfMeasureAbbreviation] ||
          null,
      ),
      quantityMetrc: floor(Number(packageItem.quantity), 2),
      parent: parentId ? { id: parentId } : null,
      packageType: PackageTypeEnum[packageItem.packageType] || null,
      labTestingState: LabTestingEnum[packageItem.labTestingState] || null,
      initialLabTestingState:
        LabTestingEnum[packageItem.labTestingState] || null,
      unitOfMeasureName:
        UnitsOfMeasureNameEnum[packageItem.unitOfMeasureName] || null,
      unitOfMeasureAbbreviation:
        UnitsOfMeasureAbbreviationEnum[packageItem.unitOfMeasureAbbreviation] ||
        null,
      facility: {
        id: facilityId,
      },
      totalTHC: 0,
      totalCBD: 0,
      syncDate: moment().utc().startOf('day').toISOString(),
      item: {
        ...packageItem.item,
        defaultLabTestingState:
          LabTestingEnum[packageItem.item.defaultLabTestingState] || null,
        quantityType:
          UnitsOfMeasureQuantityTypeEnum[packageItem.item.quantityType] || null,
        unitOfMeasureName:
          UnitsOfMeasureNameEnum[packageItem.item.unitOfMeasureName] || null,
        unitCbdContentUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitCbdContentUnitOfMeasureName
          ] || null,
        unitThcContentUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitThcContentUnitOfMeasureName
          ] || null,
        unitVolumeUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitVolumeUnitOfMeasureName
          ] || null,
        unitCbdContentDoseUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitCbdContentDoseUnitOfMeasureName
          ] || null,
        unitThcContentDoseUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitThcContentDoseUnitOfMeasureName
          ] || null,
        unitWeightUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitWeightUnitOfMeasureName
          ] || null,
        unitQuantityUnitOfMeasureName:
          UnitsOfMeasureNameEnum[
            packageItem.item.unitQuantityUnitOfMeasureName
          ] || null,
      },
    };

    if (data.quantity === 0) {
      data.status = ProductStatusEnum.unlisted;
    }
    return data;
  }

  async _mappingProducts(facility: FacilityModel, packages: MetrcPackage[]) {
    for await (const packageItem of packages) {
      let parentId = null;
      if (packageItem.sourcePackageLabels) {
        const parent = await this.dataSource
          .getTreeRepository(ProductModel)
          .findOne({
            where: { label: packageItem.sourcePackageLabels },
            select: ['id'],
          });
        parentId = parent?.id;
      }

      const productData = ProductService._mappingProduct(
        facility.id,
        packageItem,
        parentId,
      );

      if (packageItem.labTestingState === LabTestingEnum.TestPassed) {
        const testLabs = await this.metrcLabtestsService.getLabTestResults(
          facility.metrcApiKey,
          facility.id,
          String(packageItem.id),
        );

        const documents = new Set<string>();
        testLabs?.Data.forEach((labTest) => {
          if (labTest.LabTestResultDocumentFileId) {
            documents.add(String(labTest.LabTestResultDocumentFileId));
          }
          if (
            labTest.TestTypeName === 'Total THC (mg/g)' &&
            Number(labTest.TestResultLevel) > 0
          ) {
            productData.totalTHC = Number(
              (Number(labTest.TestResultLevel) / 10).toFixed(2),
            );
          }
          if (
            labTest.TestTypeName === 'Total CBD (mg/g; cannot fail)' &&
            Number(labTest.TestResultLevel) > 0
          ) {
            productData.totalCBD = floor(
              Number(labTest.TestResultLevel) / 10,
              2,
            );
          }
        });

        productData.labTestDocuments = Array.from(documents);

        if (
          productData.totalTHC === 0 &&
          productData.totalCBD === 0 &&
          CONFIG.platform.ENV !== 'prod'
        ) {
          productData.totalTHC = floor(random(1, 9000) / 100, 2);
          productData.totalCBD = floor(random(1, 9000) / 100, 2);
        }

        if (productData.totalTHC > productData.totalCBD) {
          productData.totalCBD = 0;
        } else if (productData.totalTHC < productData.totalCBD) {
          productData.totalTHC = 0;
        }
      }
      await this.dataSource
        .getTreeRepository(ProductModel)
        .create(productData)
        .save();
    }
  }

  static _convertToPounds(
    quantity: number,
    unitOfMeasureAbbreviation: UnitsOfMeasureAbbreviationEnum,
  ) {
    if (quantity < 0) return 0;
    switch (unitOfMeasureAbbreviation) {
      case UnitsOfMeasureAbbreviationEnum.ea: {
        return floor(quantity, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.oz: {
        return floor(quantity * 0.0625, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.lb: {
        return floor(quantity, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.g: {
        return floor(quantity / 453.59237, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.mg: {
        return floor(quantity / 453592.37, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.kg: {
        return floor((1000 * quantity) / 453.59237, 2);
      }
      case UnitsOfMeasureAbbreviationEnum.t: {
        return floor((1000 * 1000 * quantity) / 453.59237, 2);
      }
      default:
        return 0;
    }
  }
}
