import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { FilterGetDTO } from '@common/query/query.dto';

@InputType()
export class ReportSalesPerformanceInput extends FilterGetDTO {
  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date;
}
