import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from '../dto';
import { Type, applyDecorators } from '@nestjs/common';

export class ResponseWithPagination<T> extends PaginationDto {
  @ApiProperty({
    description: 'Number of entities per page',
    type: 'number',
  })
  limit: number;

  @ApiProperty({
    description: 'Number of lines skipped',
    type: 'number',
  })
  offset: number;

  @ApiProperty({
    description: 'Total number of entities in database',
    type: 'number',
  })
  total!: number;

  @ApiProperty({
    description: 'List of entities',
    default: [],
    isArray: true,
    items: {},
  })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ResponseWithPagination),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseWithPagination) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
