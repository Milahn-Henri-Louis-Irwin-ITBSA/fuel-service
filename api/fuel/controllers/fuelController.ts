import {
  BodyParam,
  HeaderParam,
  JsonController,
  Post,
} from 'routing-controllers';
import { Service } from 'typedi';
import { URL_INFO } from '../hotelApiInfo';
import FuelApi from '../service/FuelApiSvc';

@JsonController(URL_INFO.contextPath + '/fuel')
@Service()
export class FuelController {
  @Post('/nearby')
  public async getNearbyHotels(
    @HeaderParam('Authorization') authorization: string,
    @BodyParam('coordinates') coordinates: any,
    @BodyParam('radius') radius: number
  ) {
    try {
      if (!authorization) {
        return Promise.resolve({
          status: 401,
          message: 'Unauthorized',
        });
      }

      if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (typeof radius !== 'number') {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (
        typeof coordinates.latitude !== 'number' ||
        typeof coordinates.longitude !== 'number'
      ) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      if (!radius) {
        return Promise.resolve({
          status: 400,
          message: 'Bad Request',
        });
      }

      const fuel = new FuelApi();
      const data = await fuel.getGasStationsNearby(
        coordinates.latitude,
        coordinates.longitude,
        radius
      );

      return Promise.resolve({
        status: 200,
        hotels: data,
      });
    } catch (error) {
      return Promise.resolve({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
