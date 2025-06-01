import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import FacilityToFacilityModel from './facility_to_facility.model';

@Module({
  imports: [TypeOrmModule.forFeature([FacilityToFacilityModel])],
  providers: [],
  exports: [],
})
export default class FacilityToFacilityModule {}
