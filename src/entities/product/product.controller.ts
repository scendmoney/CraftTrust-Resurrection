import { FacilityModel } from '@entities/facility/facility.model';
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { MetrcLabtestsService } from 'libs/metrc/src';
import { DataSource } from 'typeorm';
import { ProductModel } from './product.model';
import { Readable } from 'stream';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('ProductController')
export class ProductController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly metrcLabtestsService: MetrcLabtestsService,
  ) {}

  @Get('labtest/:licenseNumber/:productId/:docId')
  async download(
    @Res() res: Response,
    @Param('licenseNumber') licenseNumber: string,
    @Param('productId') productId: string,
    @Param('docId') docId: string,
  ) {
    const [facility, product] = await Promise.all([
      this.dataSource.getRepository(FacilityModel).findOne({
        where: { id: licenseNumber },
        select: ['id', 'metrcApiKey'],
      }),
      this.dataSource.getRepository(ProductModel).findOne({
        where: {
          id: Number(productId),
          facility: {
            id: licenseNumber,
          },
        },

        select: ['id', 'labTestDocuments'],
      }),
    ]);

    if (!facility || !product || !product.labTestDocuments.includes(docId)) {
      throw new NotFoundException();
    }

    const file = await this.metrcLabtestsService.getDocument(
      facility.metrcApiKey,
      facility.id,
      docId,
    );

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Disposition': 'inline',
    };

    const stream = Readable.from(file);
    res.set(headers);

    stream.pipe(res);
    res.end();
  }
}
