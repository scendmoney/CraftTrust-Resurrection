import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { Controller, Post, Req } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';

@Controller('webhooks/twilio/chat')
export default class TwilioChatWebhooks {
  constructor(private dataSource: DataSource) {}

  @Post()
  async handleIncomingEvents(@Req() request) {
    if (
      request.body.EventType === 'onMessageAdded' ||
      request.body.EventType === 'onMessageSent'
    ) {
      const { ChannelSid, ClientIdentity } = request?.body;

      const facilityToFacility = await this.dataSource
        .getRepository(FacilityToFacilityModel)
        .findOne({
          where: {
            chatSid: ChannelSid,
          },
          relations: ['facilityCultivator', 'facilityBuyer'],
        });

      if (!facilityToFacility) return;

      const query: DeepPartial<FacilityToFacilityModel> = {
        id: facilityToFacility.id,
      };

      if (facilityToFacility.__facilityBuyer__.id === ClientIdentity) {
        query.isMessageCultivator = false;
        query.dateMessageBuyer = new Date();
        query.dateMessageCultivator = null;
      }

      if (facilityToFacility.__facilityCultivator__.id === ClientIdentity) {
        query.isMessageBuyer = false;
        query.dateMessageBuyer = null;
        query.dateMessageCultivator = new Date();
      }

      await this.dataSource
        .getRepository(FacilityToFacilityModel)
        .create(query)
        .save();
    }
  }
}
