import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@ArgsType()
export class PaginationDto {
  @ApiPropertyOptional({ description: 'Offset', type: 'number' })
  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @Field(() => Int, { description: 'Offset' })
  offset = 0;

  @ApiPropertyOptional({ description: 'Limit', type: 'number' })
  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @IsPositive()
  @Field(() => Int, { description: 'Limit' })
  limit = 15;
}
