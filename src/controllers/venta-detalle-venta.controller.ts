import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Venta,
  DetalleVenta,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaDetalleVentaController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Array of Venta has many DetalleVenta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleVenta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DetalleVenta>,
  ): Promise<DetalleVenta[]> {
    return this.ventaRepository.detalleVentas(id).find(filter);
  }

  @post('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleVenta)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Venta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleVenta, {
            title: 'NewDetalleVentaInVenta',
            exclude: ['id'],
            optional: ['ventaId']
          }),
        },
      },
    }) detalleVenta: Omit<DetalleVenta, 'id'>,
  ): Promise<DetalleVenta> {
    return this.ventaRepository.detalleVentas(id).create(detalleVenta);
  }

  @del('/ventas/{id}/detalle-ventas', {
    responses: {
      '200': {
        description: 'Venta.DetalleVenta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DetalleVenta)) where?: Where<DetalleVenta>,
  ): Promise<Count> {
    return this.ventaRepository.detalleVentas(id).delete(where);
  }
}
